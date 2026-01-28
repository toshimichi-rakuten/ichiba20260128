import { ROOT_PATH, snapshot } from '../../../../../e2e/helper'

snapshot({
  name: 'RewardHeader SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-rewardheader--default&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'RewardHeader MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-rewardheader--default&viewMode=story`,
  device: 'lg',
})
