#!/usr/bin/env zx

import prompts from 'prompts'
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'fs'

const PROJECTS = [
  {
    name: 'documents',
    dockerfilePath: './apps/documents/Dockerfile',
    servicePath: './apps/documents/service.yaml',
    deploymentPath: './apps/documents/deployment.yaml',
    buildFilter: 'documents'
  },
  {
    name: 'module-navi',
    dockerfilePath: './apps/module-navi/Dockerfile',
    servicePath: './apps/module-navi/service.yaml',
    deploymentPath: './apps/module-navi/deployment.yaml',
    buildFilter: 'module-navi'
  },
  {
    name: 'ecm-sb',
    dockerfilePath: './packages/ecm/.storybook/Dockerfile',
    servicePath: './packages/ecm/.storybook/service.yaml',
    deploymentPath: './packages/ecm/.storybook/deployment.yaml',
    buildFilter: 'ecm'
  },
  {
    name: 'fet-sb',
    dockerfilePath: './packages/fet/.storybook/Dockerfile',
    servicePath: './packages/fet/.storybook/service.yaml',
    deploymentPath: './packages/fet/.storybook/deployment.yaml',
    buildFilter: 'fet'
  },
  {
    name: 'scm-sb',
    dockerfilePath: './packages/scm/.storybook/Dockerfile',
    servicePath: './packages/scm/.storybook/service.yaml',
    deploymentPath: './packages/scm/.storybook/deployment.yaml',
    buildFilter: 'scm'
  },
  {
    name: 'rakuten-sans-sb',
    dockerfilePath: './packages/rakuten-sans/.storybook/Dockerfile',
    servicePath: './packages/rakuten-sans/.storybook/service.yaml',
    deploymentPath: './packages/rakuten-sans/.storybook/deployment.yaml',
    buildFilter: 'rakuten-sans'
  }
]

function generateTimestamp() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${year}${month}${day}${hours}${minutes}`
}

async function deployProject(project, deploymentName, timestamp) {
  const imageTag = `registry-jpe1.r-local.net/cwd-sidekick/${project.name}:${deploymentName}-${timestamp}`

  if (!existsSync(project.servicePath)) {
    console.error(`Service template not found: ${project.servicePath}`)
    process.exit(1)
  }

  if (!existsSync(project.deploymentPath)) {
    console.error(`Deployment template not found: ${project.deploymentPath}`)
    process.exit(1)
  }

  if (!existsSync(project.dockerfilePath)) {
    console.error(`Dockerfile not found: ${project.dockerfilePath}`)
    process.exit(1)
  }

  console.log(`Deploying: ${imageTag}`)

  console.log('Building container..')
  await $`podman build --platform linux/amd64 -f ${project.dockerfilePath} -t ${imageTag} .`

  console.log('Pushing container to registry..')
  await $`podman push ${imageTag}`

  let serviceYaml = readFileSync(project.servicePath, 'utf-8')
  serviceYaml = serviceYaml.replace(/GIT_BRANCH_NAME/g, deploymentName)

  let deploymentYaml = readFileSync(project.deploymentPath, 'utf-8')
  deploymentYaml = deploymentYaml.replace(/GIT_BRANCH_NAME/g, deploymentName)
  deploymentYaml = deploymentYaml.replace(/IMAGE_TAG/g, `${deploymentName}-${timestamp}`)

  const tempServicePath = `.tmp-service-${project.name}.yaml`
  const tempDeploymentPath = `.tmp-deployment-${project.name}.yaml`

  writeFileSync(tempServicePath, serviceYaml)
  writeFileSync(tempDeploymentPath, deploymentYaml)

  console.log('Applying kubectl configurations..')
  await $`kubectl apply -f ${tempServicePath}`
  await $`kubectl apply -f ${tempDeploymentPath}`

  console.log('Cleaning up temporary files..')
  unlinkSync(tempServicePath)
  unlinkSync(tempDeploymentPath)

  console.log(`Deployment completed successfully for ${project.name}!`)
}

async function main() {
  const deployAll = process.argv.includes('--all')

  const questions = []

  if (!deployAll) {
    questions.push({
      type: 'select',
      name: 'projectIndex',
      message: 'Select project to deploy',
      choices: PROJECTS.map((p, i) => ({ title: p.name, value: i }))
    })
  }

  questions.push({
    type: 'text',
    name: 'deploymentName',
    message: 'Enter deployment name',
    initial: 'wip'
  })

  questions.push({
    type: 'confirm',
    name: 'buildConfirmed',
    message: 'Have you built the project? ModuleNavi needs to be built with `pnpm ci:set-docs-env` for CaaS',
    initial: false
  })

  const responses = await prompts(questions)

  if (!deployAll && responses.projectIndex === undefined) {
    console.error('Project selection is required')
    process.exit(1)
  }

  if (!responses.deploymentName) {
    console.error('Deployment name is required')
    process.exit(1)
  }

  if (!responses.buildConfirmed) {
    console.error('Please build the project first before deploying')
    process.exit(1)
  }

  const { deploymentName } = responses
  const timestamp = generateTimestamp()

  if (deployAll) {
    const deployments = PROJECTS.map(async (project) => {
      console.log(`\nDeploying ${project.name}`)
      await deployProject(project, deploymentName, timestamp)
      return project.name
    })

    await Promise.all(deployments)
  } else {
    const project = PROJECTS[responses.projectIndex]
    console.log(`\nDeploying ${project.name}`)
    await deployProject(project, deploymentName, timestamp)
  }

  console.log('Done!')
}

main()
