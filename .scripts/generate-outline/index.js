import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { emptyDirSync } from 'fs-extra'
import { join } from 'path'
import zl from 'zip-lib'

function main() {
  const pcTemplate = readFileSync('.scripts/generate-outline/template_pc_index.html').toString()
  const pcLeftTemplate = readFileSync('.scripts/generate-outline/template_pc_index_left.html').toString()
  const spTemplate = readFileSync('.scripts/generate-outline/template_sp_index.html').toString()
  const moduleNaviDate = readFileSync('apps/module-navi/.env').toString().split("\n")[0].split("=")[1].trim()

  const output = join('apps/module-navi/public/_assets/outline/')

  emptyDirSync(output)

  if (!existsSync(join(output, 'pc'))) {
    mkdirSync(join(output, 'pc'))
  }

  if (!existsSync(join(output, 'sp'))) {
    mkdirSync(join(output, 'sp'))
  }

  const pc = pcTemplate
    .replaceAll(
      '%%ECM_HEAD_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_head.html`
    )
    .replaceAll(
      '%%ECM_UTILS_HEAD_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_utils_head.html`
    )
    .replaceAll(
      '%%ECM_BODY_PC_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_body_pc.html`
    )
    .replaceAll(
      '%%ECM_JQUERY_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_jquery.html`
    )

  const pcPath = join(output, 'pc', `${moduleNaviDate}_pc_index.html`)

  writeFileSync(pcPath, pc)

  const pcLeft = pcLeftTemplate
    .replaceAll(
      '%%ECM_HEAD_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_head.html`
    )
    .replaceAll(
      '%%ECM_UTILS_HEAD_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_utils_head.html`
    )
    .replaceAll(
      '%%ECM_BODY_PC_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_body_pc.html`
    )
    .replaceAll(
      '%%ECM_JQUERY_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_jquery.html`
    )

  const pcLeftPath = join(output, 'pc', `${moduleNaviDate}_pc_index_left.html`)

  writeFileSync(pcLeftPath, pcLeft)

  const sp = spTemplate
    .replaceAll(
      '%%ECM_HEAD_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_head.html`
    )
    .replaceAll(
      '%%ECM_UTILS_HEAD_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_utils_head.html`
    )
    .replaceAll(
      '%%ECM_BODY_SP_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_body_sp.html`
    )
    .replaceAll(
      '%%ECM_JQUERY_INCLUDE_PATH%%',
      `/com/js/c/ecm/group_inc/★★groupName★★/★★groupName★★_★★groupNumber★★_ecm_jquery.html`
    )

  const spPath = join(output, 'sp', `${moduleNaviDate}_sp_index.html`)
  writeFileSync(spPath, sp)

  const zip = new zl.Zip()

  zip.addFolder(join(output, 'pc'))
  zip.addFolder(join(output, 'sp'))

  zip.archive(join(output, `${moduleNaviDate}_outline.zip`))
}

main()
