const customViewports = {
  sp320: {
    name: 'SP 320px',
    styles: {
      width: '320px',
      height: '812px',
    },
  },
  sp375: {
    name: 'SP 375px',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  sp414: {
    name: 'SP 414px',
    styles: {
      width: '414px',
      height: '896px',
    },
  },
  pc768: {
    name: 'PC 768px',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  pc1024: {
    name: 'PC 1024px',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  pc1366: {
    name: 'PC 1366px',
    styles: {
      width: '1366px',
      height: '768px',
    },
  },
  pc1920: {
    name: 'PC 1920px',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
}

export const parameters = {
  viewport: { viewports: customViewports },
}

const preview = {
  decorators: [
    (story) => {
      return story()
    },
  ],
}

export default preview
