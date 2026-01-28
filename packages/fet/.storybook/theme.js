import { create } from '@storybook/theming/create'

// https://storybook.js.org/docs/configurations/theming/

export const theme = create({
  base: 'light',

  colorPrimary: 'hotpink',
  colorSecondary: 'hotpink',

  appBg: '#F8F8F8',
  appBorderColor: '#EDEDED',
  appBorderRadius: 6,

  barTextColor: '#999999',
  barSelectedColor: 'hotpink',
  barBg: '#F2F2F2',

  inputBg: 'white',
  inputBorder: 'rgba(0,0,0,.1)',
  inputTextColor: '#333333',
  inputBorderRadius: 4,

  // brandImage: '',
  // brandUrl: 'https://www.rakuten.co.jp/',
})
