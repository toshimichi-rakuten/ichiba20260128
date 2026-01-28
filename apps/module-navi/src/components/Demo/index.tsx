import { Tabs } from '@mantine/core'
import Html from 'src/components/Html'
import Code from 'src/components/Code'

type Breakpoint = 'sp' | 'md' | 'lg'

type DemoProps = {
  content: string
  breakpoints: Breakpoint[]
  scm: boolean
}

function Demo({ content, breakpoints, scm = false }: DemoProps) {
  const tabs = breakpoints.map((b) => {
    return (
      <Tabs.Tab
        key={b}
        value={b.toLowerCase()}
      >
        {b.toUpperCase()}
      </Tabs.Tab>
    )
  })

  const panels = breakpoints.map((b) => {
    return (
      <Tabs.Panel
        key={b}
        value={b.toLowerCase()}
      >
        <Html
          scm={scm}
          content={content}
          device={b.toLowerCase()}
        />
      </Tabs.Panel>
    )
  })

  return (
    <Tabs
      keepMounted={false}
      defaultValue='sp'
      styles={{ panel: { paddingTop: '16px' } }}
    >
      <Tabs.List>
        {tabs}
        <Tabs.Tab value='code'>コード</Tabs.Tab>
      </Tabs.List>

      {panels}

      <Tabs.Panel value='code'>
        <Code content={content} />
      </Tabs.Panel>
    </Tabs>
  )
}

export default Demo
