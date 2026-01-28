const config = {
  staticDirs: ['../../../.rcms/com/js/c/ecm/assets', { from: '../../../apps/module-navi/public/_assets', to: '/_assets' }],
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        controls: false,
        docs: false,
        actions: false,
      },
    },
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  core: {
    disableTelemetry: true,
  },
}

export default config
