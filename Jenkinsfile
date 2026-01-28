// https://www.jvt.me/posts/2020/02/23/jenkins-multibranch-skip-branch-index/
if (currentBuild.getBuildCauses().toString().contains('BranchIndexingCause')) {
  print 'INFO: Build skipped due to trigger being Branch Indexing'
  currentBuild.result = 'ABORTED' // optional, gives a better hint to the user that it's been skipped, rather than the default which shows it's successful
  return
}

pipeline {
  agent {
    label 'jenkins-slave'
  }
  // Set immutable variables here,
  environment {
    K8S_CLUSTER_ID = 'jpe1-caas1-dev1'
    K8S_NAMESPACE = "${env.JOB_NAME.split('/')[3]}"
    HARBOR_REGISTRY = 'https://registry-jpe1.r-local.net'

    MAIN_BRANCH = 'master'

    DEPLOYMENT_DOMAIN = "${K8S_CLUSTER_ID}.caas.jpe1a.r-local.net"
    DEPLOYMENT_PORT = 80
    DEPLOYMENT_URL = GIT_BRANCH
      .replaceAll('origin/', '')
      .replaceAll('/', '-')
      .replaceAll(/[^-._a-zA-Z0-9]/, '')
      .toLowerCase()
      .take(42) // k8s deployment url has a limit of 53.

    CANNON_ECM_STORYBOOK_URL = 'ecm-sb'
    CANNON_SCM_STORYBOOK_URL = 'scm-sb'
    CANNON_MODULE_NAVI_URL = 'module-navi'
    CANNON_DOCUMENTS_URL = 'documents'
    CANNON_STATIC_URL = 'static'
  }

  stages {
    stage('bundle') {
      agent {
        docker {
          image 'registry-jpe1.r-local.net/cwd-sidekick/builder:202509291111'
        }
      }
      stages {
        stage('prepare') {
          steps {
              script {
                notifyBitbucket()

                env.TIMESTAMP = sh(
                  returnStdout: true,
                  script: 'date +%s'
                ).trim()

                env.DOCKER_IMAGE_TAG = "${TIMESTAMP}-${GIT_COMMIT}"

                env.ECM_STORYBOOK_IMAGE = "${CANNON_ECM_STORYBOOK_URL}:${DOCKER_IMAGE_TAG}"
                env.SCM_STORYBOOK_IMAGE = "${CANNON_SCM_STORYBOOK_URL}:${DOCKER_IMAGE_TAG}"
                env.MODULE_NAVI_IMAGE = "${CANNON_MODULE_NAVI_URL}:${DOCKER_IMAGE_TAG}"
                env.DOCUMENTS_IMAGE = "${CANNON_DOCUMENTS_URL}:${DOCKER_IMAGE_TAG}"
                env.STATIC_IMAGE = "${CANNON_STATIC_URL}:${DOCKER_IMAGE_TAG}"

                env.LINT_STATUS = 'OK'
                env.LINT_ERROR = ''

                env.UNIT_TEST_STATUS = 'OK'
                env.UNIT_TEST_ERROR = ''

                env.BUILD_STATUS = 'OK'
                env.BUILD_ERROR = ''

                env.SB_BUILD_STATUS = 'OK'
                env.SB_BUILD_ERROR = ''

                sh 'printenv'
                sh 'node -v'
                sh 'pnpm install'
                sh 'pnpm -v'

                sh 'pnpm ci:set-docs-env'
              }
          }
        }

        stage('check') {
          parallel {
            stage('lint') {
              steps {
                script {
                  try {
                    sh 'pnpm lint'
                  } catch (err) {
                    env.LINT_STATUS = 'FAILED'
                    env.LINT_ERROR = err.getMessage()
                    // currentBuild.result = 'FAILURE'
                  }
                }
              }
            }

            stage('unit test') {
              steps {
                script {
                  try {
                    sh 'pnpm test'
                  } catch (err) {
                    env.UNIT_TEST_STATUS = 'FAILED'
                    env.UNIT_TEST_ERROR = err.getMessage()
                    // currentBuild.result = 'FAILURE'
                  }
                }
              }
            }
          }
        }

        stage('build') {
            when {
              expression {
                env.UNIT_TEST_STATUS == 'OK' && env.LINT_STATUS == 'OK'
              }
            }
            steps {
                script {
                  try {
                      // Turbo is not properly invalidating ModuleNavi repo cache.
                      // Temporary fix is to force build.
                      sh 'pnpm build --force'
                  } catch (err) {
                    env.BUILD_STATUS = 'FAILED'
                    env.BUILD_ERROR = err.getMessage()
                    currentBuild.result = 'FAILURE'
                  }
                  
                  try {
                      sh 'pnpm build:sb'
                  } catch (err) {
                    env.SB_BUILD_STATUS = 'FAILED'
                    env.SB_BUILD_ERROR = err.getMessage()
                    currentBuild.result = 'FAILURE'
                  }

                  stash includes: 'apps/module-navi/out/**/*', name: 'module-navi-bundle'
                  stash includes: 'apps/documents/out/**/*', name: 'documents-bundle'
                  stash includes: 'packages/ecm/storybook-static/**/*', name: 'ecm-storybook-bundle'
                  stash includes: 'packages/scm/storybook-static/**/*', name: 'scm-storybook-bundle'
                  stash includes: 'packages/fet/storybook-static/**/*', name: 'fet-storybook-bundle'
                  stash includes: 'packages/rakuten-sans/storybook-static/**/*', name: 'rakuten-sans-storybook-bundle'
                }
            }
        }
      }
    }

    // cicd is cooked
    // stage('deploy') {
    //   when {
    //     expression {
    //       env.DEPLOYMENT_URL == env.MAIN_BRANCH &&
    //       env.LINT_STATUS == 'OK' &&
    //       env.UNIT_TEST_STATUS == 'OK' &&
    //       env.BUILD_STATUS == 'OK' &&
    //       env.SB_BUILD_STATUS == 'OK'
    //     }
    //   }
    //   parallel {
    //     stage('ecm storybook') {
    //       agent any
    //       steps {
    //         script {
    //           unstash 'ecm-storybook-bundle'
    //           sh 'cp ./packages/ecm/.storybook/Dockerfile Dockerfile'
    //           cpd.withDockerRegistry(env.K8S_CLUSTER_ID, env.K8S_NAMESPACE) {
    //             def img = docker.build("${env.K8S_NAMESPACE}/${env.ECM_STORYBOOK_IMAGE}")
    //             img.push()
    //           }
    //
    //           sh "sed -i 's/IMAGE_TAG/${env.DOCKER_IMAGE_TAG}/g' ./packages/ecm/.storybook/deployment.yaml"
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./packages/ecm/.storybook/deployment.yaml"
    //           cpd.kubectl('apply -f ./packages/ecm/.storybook/deployment.yaml')
    //
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./packages/ecm/.storybook/service.yaml"
    //           cpd.kubectl('apply -f ./packages/ecm/.storybook/service.yaml')
    //         }
    //       }
    //     }
    //
    //     stage('scm storybook') {
    //       agent any
    //       steps {
    //         script {
    //           unstash 'scm-storybook-bundle'
    //           sh 'cp ./packages/scm/.storybook/Dockerfile Dockerfile'
    //           cpd.withDockerRegistry(env.K8S_CLUSTER_ID, env.K8S_NAMESPACE) {
    //             def img = docker.build("${env.K8S_NAMESPACE}/${env.SCM_STORYBOOK_IMAGE}")
    //             img.push()
    //           }
    //
    //           sh "sed -i 's/IMAGE_TAG/${env.DOCKER_IMAGE_TAG}/g' ./packages/scm/.storybook/deployment.yaml"
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./packages/scm/.storybook/deployment.yaml"
    //           cpd.kubectl('apply -f ./packages/scm/.storybook/deployment.yaml')
    //
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./packages/scm/.storybook/service.yaml"
    //           cpd.kubectl('apply -f ./packages/scm/.storybook/service.yaml')
    //         }
    //       }
    //     }
    //
    //     stage('fet storybook') {
    //       agent any
    //       steps {
    //         script {
    //           unstash 'fet-storybook-bundle'
    //           sh 'cp ./packages/fet/.storybook/Dockerfile Dockerfile'
    //           cpd.withDockerRegistry(env.K8S_CLUSTER_ID, env.K8S_NAMESPACE) {
    //             def img = docker.build("${env.K8S_NAMESPACE}/${env.SCM_STORYBOOK_IMAGE}")
    //             img.push()
    //           }
    //
    //           sh "sed -i 's/IMAGE_TAG/${env.DOCKER_IMAGE_TAG}/g' ./packages/fet/.storybook/deployment.yaml"
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./packages/fet/.storybook/deployment.yaml"
    //           cpd.kubectl('apply -f ./packages/fet/.storybook/deployment.yaml')
    //
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./packages/fet/.storybook/service.yaml"
    //           cpd.kubectl('apply -f ./packages/fet/.storybook/service.yaml')
    //         }
    //       }
    //     }
    //
    //     stage('rakuten-sans storybook') {
    //       agent any
    //       steps {
    //         script {
    //           unstash 'rakuten-sans-storybook-bundle'
    //           sh 'cp ./packages/rakuten-sans/.storybook/Dockerfile Dockerfile'
    //           cpd.withDockerRegistry(env.K8S_CLUSTER_ID, env.K8S_NAMESPACE) {
    //             def img = docker.build("${env.K8S_NAMESPACE}/${env.SCM_STORYBOOK_IMAGE}")
    //             img.push()
    //           }
    //
    //           sh "sed -i 's/IMAGE_TAG/${env.DOCKER_IMAGE_TAG}/g' ./packages/rakuten-sans/.storybook/deployment.yaml"
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./packages/rakuten-sans/.storybook/deployment.yaml"
    //           cpd.kubectl('apply -f ./packages/rakuten-sans/.storybook/deployment.yaml')
    //
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./packages/rakuten-sans/.storybook/service.yaml"
    //           cpd.kubectl('apply -f ./packages/rakuten-sans/.storybook/service.yaml')
    //         }
    //       }
    //     }
    //
    //     stage('module navi') {
    //       agent any
    //       steps {
    //         script {
    //           unstash 'module-navi-bundle'
    //           sh 'cp ./apps/module-navi/Dockerfile Dockerfile'
    //           cpd.withDockerRegistry(env.K8S_CLUSTER_ID, env.K8S_NAMESPACE) {
    //             def img = docker.build("${env.K8S_NAMESPACE}/${env.MODULE_NAVI_IMAGE}")
    //             img.push()
    //           }
    //
    //           sh "sed -i 's/IMAGE_TAG/${env.DOCKER_IMAGE_TAG}/g' ./apps/module-navi/deployment.yaml"
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./apps/module-navi/deployment.yaml"
    //           cpd.kubectl('apply -f ./apps/module-navi/deployment.yaml')
    //
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./apps/module-navi/service.yaml"
    //           cpd.kubectl('apply -f ./apps/module-navi/service.yaml')
    //         }
    //       }
    //     }
    //
    //     stage('documents') {
    //       agent any
    //       steps {
    //         script {
    //           unstash 'documents-bundle'
    //           sh 'cp ./apps/documents/Dockerfile Dockerfile'
    //           cpd.withDockerRegistry(env.K8S_CLUSTER_ID, env.K8S_NAMESPACE) {
    //             def img = docker.build("${env.K8S_NAMESPACE}/${env.DOCUMENTS_IMAGE}")
    //             img.push()
    //           }
    //
    //           sh "sed -i 's/IMAGE_TAG/${env.DOCKER_IMAGE_TAG}/g' ./apps/documents/deployment.yaml"
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./apps/documents/deployment.yaml"
    //           cpd.kubectl('apply -f ./apps/documents/deployment.yaml')
    //
    //           sh "sed -i 's/GIT_BRANCH_NAME/${env.DEPLOYMENT_URL}/g' ./apps/documents/service.yaml"
    //           cpd.kubectl('apply -f ./apps/documents/service.yaml')
    //         }
    //       }
    //     }
    //   }
    // }

    stage('update pr') {
      when {
        expression {
          env.DEPLOYMENT_URL != env.MAIN_BRANCH
        }
      }
      agent any
      steps {
        script {
          withCredentials([
            string(credentialsId: 'bitbucket_api', variable: 'BITBUCKET_API_KEY')
          ]) {
            sh """
              LINT_STATUS=\"${env.LINT_STATUS}\" \\
              LINT_ERROR=\"${env.LINT_ERROR}\" \\
              UNIT_TEST_STATUS=\"${env.UNIT_TEST_STATUS}\" \\
              UNIT_TEST_ERROR=\"${env.UNIT_TEST_ERROR}\" \\
              BUILD_STATUS=\"${env.BUILD_STATUS}\" \\
              BUILD_ERROR=\"${env.BUILD_ERROR}\" \\
              SB_BUILD_STATUS=\"${env.SB_BUILD_STATUS}\" \\
              SB_BUILD_ERROR=\"${env.SB_BUILD_ERROR}\" \\
              ./.junkins/update-pr.sh ${BITBUCKET_API_KEY}
            """
          }
        }
      }
    }
  }

  post {
    always {
      script {
        if (
          env.LINT_STATUS != 'OK' ||
          env.UNIT_TEST_STATUS != 'OK' ||
          env.BUILD_STATUS != 'OK' ||
          env.SB_BUILD_STATUS != 'OK'
        ) {
          currentBuild.result = 'FAILURE'
        }
      }

      notifyBitbucket()
    }
  }
}
