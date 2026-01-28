import { snapshot, ROOT_PATH } from '../../../../../e2e/helper'

snapshot({
  name: 'Coupon SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-coupon--default&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Coupon Two SP',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-coupon--two&viewMode=story`,
  device: 'sp',
})

snapshot({
  name: 'Coupon Three MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-coupon--three&viewMode=story`,
  device: 'lg',
})

snapshot({
  name: 'Coupon Four MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-coupon--four&viewMode=story`,
  device: 'lg',
})

snapshot({
  name: 'Coupon Five MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-coupon--five&viewMode=story`,
  device: 'lg',
})

snapshot({
  name: 'Coupon Center One MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-coupon--center-one&viewMode=story`,
  device: 'lg',
})

snapshot({
  name: 'Coupon Center Two MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-coupon--center-two&viewMode=story`,
  device: 'lg',
})

snapshot({
  name: 'Coupon Center Three MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-coupon--center-three&viewMode=story`,
  device: 'lg',
})

snapshot({
  name: 'After MD',
  url: `${ROOT_PATH}/iframe.html?args=&id=modules-coupon--after&viewMode=story`,
  device: 'lg',
})
