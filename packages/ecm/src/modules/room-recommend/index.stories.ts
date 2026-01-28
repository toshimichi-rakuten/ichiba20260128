import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'
import dummyData from './room.json'

const mocked = defaultHtml.replace(
  `<template data-room-recommend-output>`,
  `
    <template data-room-recommend-data-mock>
      ${JSON.stringify(dummyData)}
    </template>
    <template data-room-recommend-output>
  `
)

const Story: Meta = {
  title: 'Modules/RoomRecommend',
  decorators: [
    (story) => {
      useEffect(() => {
        new ECM()
      })

      return story()
    },
  ],
}

export default Story

export const Default = () => mocked
