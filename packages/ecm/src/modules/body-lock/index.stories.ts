import { Meta, Story } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import defaultHtml from './default.html?raw'
import eventsHtml from './events.html?raw'
import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const meta: Meta = {
  title: 'Modules/BodyLock',
  decorators: [
    (story) => {
      useEffect(() => {
        new ECM()
      })

      return story()
    },
  ],
  args: {
    padding: true,
    boxSizing: 'box',
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const Template: Story = ({ padding, boxSizing }) => {
  useEffect(() => {
    document.body.style.boxSizing = boxSizing

    if (padding) {
      document.body.style.padding = '16px'
    }
  }, [boxSizing, padding])

  return defaultHtml
}

export const PaddingBorderBoxHtml = Template.bind({})
PaddingBorderBoxHtml.args = {
  padding: true,
  boxSizing: 'border-box',
}

export const PaddingContentBoxHtml = Template.bind({})
PaddingContentBoxHtml.args = {
  padding: true,
  boxSizing: 'content-box',
}

export const NoPaddingHtml = Template.bind({})
NoPaddingHtml.args = {
  padding: false,
}

export const Events = () => eventsHtml
