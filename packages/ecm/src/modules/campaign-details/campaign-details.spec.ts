import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'CampaignDetails MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-campaigndetails--default&viewMode=story`,
  device: 'md',
})

snapshot({
  name: 'CampaignDetails MD [EntryShop]',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-campaigndetails--entry-shop&viewMode=story`,
  device: 'md',
})

snapshot({
  name: 'CampaignDetails MD [MemberRank]',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-campaigndetails--member-rank&viewMode=story`,
  device: 'md',
})

snapshot({
  name: 'CampaignDetails MD [Coupon]',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-campaigndetails--coupon&viewMode=story`,
  device: 'md',
})

snapshot({
  name: 'CampaignDetails MD [Prize]',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-campaigndetails--prize&viewMode=story`,
  device: 'md',
})

snapshot({
  name: 'CampaignDetails SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-campaigndetails--default&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'CampaignDetails SP [EntryShop]',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-campaigndetails--entry-shop&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'CampaignDetails SP [MemberRank]',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-campaigndetails--member-rank&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'CampaignDetails SP [Coupon]',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-campaigndetails--coupon&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'CampaignDetails SP [Prize]',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-campaigndetails--prize&viewMode=story`,
  device: 'sp',
})
