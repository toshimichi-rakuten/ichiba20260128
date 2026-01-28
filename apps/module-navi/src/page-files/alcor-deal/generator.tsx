import { ConfigProps, generateStatic, generateIntegration } from 'ecm/src/modules/alcor-deal/generator'
import Html from 'src/components/Html'
import Code from 'src/components/Code'
import { useState, ChangeEvent, useEffect } from 'react'
import { Grid, Radio, Tabs, Tooltip, Collapse } from '@mantine/core'
import { ChevronDownIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { useDisclosure } from '@mantine/hooks'
import Note from 'src/components/Note'

const SESSION_STORAGE_KEY = 'ecm-alcor-deal-generator-config-0312'

type AlcorMock = {
  stock: 'true' | 'false'
  pointRate: 'true' | 'false'
}

type GeneratorForm = {
  config: ConfigProps
  mock: AlcorMock
}

const DEFAULT_CONFIG: GeneratorForm = {
  config: {
    endDate: 'true',
    badge: 'obi_red',
    spColumn: '1',
    pcColumn: '2',
    review: 'none',
    shopLink: 'false',
    hideEmptyPointback: 'false',
  },
  mock: {
    stock: 'true',
    pointRate: 'true',
  },
}

export function AlcorDealGenerator() {
  let initialConfig: GeneratorForm = DEFAULT_CONFIG

  const storageValue = global?.window ? window.sessionStorage.getItem(SESSION_STORAGE_KEY) : null

  if (storageValue) {
    try {
      initialConfig = JSON.parse(storageValue)
    } catch (e) {
      console.error('Failed to parse session storage value.', e)
    }
  }

  const [activeTab, setActiveTab] = useState<string | null>('sp')

  const [formValues, setFormValues] = useState<GeneratorForm>(initialConfig)

  const [opened, { toggle }] = useDisclosure(false)

  useEffect(() => {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(formValues))
  }, [formValues])

  const html = generateStatic(formValues.config, {
    'stock-flg': formValues.mock.stock === 'true' ? '20' : '0',
    'deal-point-rate-base': formValues.mock.pointRate === 'true' ? '20' : '',
  })

  const code = generateIntegration(formValues.config)

  const onFormChange = (event: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = event.target
    const [category, propertyName] = name.split('.')

    setFormValues({
      ...formValues,
      [category]: {
        ...formValues[category],
        [propertyName]: value,
      },
    })

    if (propertyName === 'spColumn') {
      setActiveTab('sp')
    }

    if (propertyName === 'pcColumn') {
      setActiveTab('lg')
    }
  }

  return (
    <>
      <div>
        <form onChange={onFormChange}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>バッジ</div>
          <Grid gutter='md'>
            <Grid.Col span={2}>
              <Radio
                name='config.badge'
                value='red'
                label='バッジ（赤）'
                defaultChecked={formValues.config.badge === 'red'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.badge'
                value='black'
                label='バッジ（黒）'
                defaultChecked={formValues.config.badge === 'black'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.badge'
                value='obi_red'
                label='帯（赤）'
                defaultChecked={formValues.config.badge === 'obi_red'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.badge'
                value='obi_black'
                label='帯（黒）'
                defaultChecked={formValues.config.badge === 'obi_black'}
                color='blue'
              />
            </Grid.Col>
          </Grid>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '32px' }}>ポイントバック終了日</div>
          <Grid gutter='md'>
            <Grid.Col span={2}>
              <Radio
                name='config.endDate'
                value='true'
                label='あり'
                defaultChecked={formValues.config.endDate === 'true'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.endDate'
                value='false'
                label='なし'
                defaultChecked={formValues.config.endDate === 'false'}
                color='blue'
              />
            </Grid.Col>
          </Grid>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '32px' }}>レビュー</div>
          <Grid gutter='md'>
            <Grid.Col span={2}>
              <Radio
                name='config.review'
                value='avg'
                label='平均'
                defaultChecked={formValues.config.review === 'avg'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.review'
                value='num'
                label='件数'
                defaultChecked={formValues.config.review === 'num'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.review'
                value='none'
                label='なし'
                defaultChecked={formValues.config.review === 'none'}
                color='blue'
              />
            </Grid.Col>
          </Grid>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '32px' }}>SPカラム数</div>
          <Grid gutter='md'>
            <Grid.Col span={2}>
              <Radio
                name='config.spColumn'
                value='1'
                label='1'
                defaultChecked={formValues.config.spColumn === '1'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.spColumn'
                value='2'
                label='2'
                defaultChecked={formValues.config.spColumn === '2'}
                color='blue'
              />
            </Grid.Col>
          </Grid>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '32px' }}>PCカラム数</div>
          <Grid gutter='md'>
            <Grid.Col span={2}>
              <Radio
                name='config.pcColumn'
                value='2'
                label='2'
                defaultChecked={formValues.config.pcColumn === '2'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.pcColumn'
                value='3'
                label='3'
                defaultChecked={formValues.config.pcColumn === '3'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.pcColumn'
                value='4'
                label='4'
                defaultChecked={formValues.config.pcColumn === '4'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.pcColumn'
                value='5'
                label='5'
                defaultChecked={formValues.config.pcColumn === '5'}
                color='blue'
              />
            </Grid.Col>
          </Grid>

          <div style={{ marginTop: '48px' }}>
            <hr style={{ marginBottom: '24px', color: '#fafafa' }} />
            <Note type='warn'>
              ポイントバックを謳う企画やコンテンツに掲載する場合は、「バッジ表示有無：表示」 「ショップリンク：なし」
              を選択してください
            </Note>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', marginTop: '32px' }}>
            <div style={{ fontWeight: 'bold' }}>商品にポイントバックがない場合のバッジ表示有無</div>
            <Tooltip label='当ページで確認したい場合、ポイントバックをモックしてください'>
              <QuestionMarkCircledIcon style={{ cursor: 'pointer', marginLeft: '4px' }} />
            </Tooltip>
          </div>
          <Grid gutter='md'>
            <Grid.Col span={2}>
              <Radio
                name='config.hideEmptyPointback'
                value='false'
                label='表示'
                defaultChecked={formValues.config.hideEmptyPointback === 'false'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Radio
                name='config.hideEmptyPointback'
                value='true'
                label='非表示（非推奨）'
                defaultChecked={formValues.config.hideEmptyPointback === 'true'}
                color='blue'
              />
            </Grid.Col>
          </Grid>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '32px' }}>ショップリンク</div>
          <Grid gutter='md'>
            <Grid.Col span={2}>
              <Radio
                name='config.shopLink'
                value='false'
                label='なし'
                defaultChecked={formValues.config.shopLink === 'false'}
                color='blue'
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Radio
                  name='config.shopLink'
                  value='true'
                  label='あり（非推奨）'
                  defaultChecked={formValues.config.shopLink === 'true'}
                  color='blue'
                />
                <Tooltip label='遷移先は、スーパーDEAL対象のアイテムページではないため、ポイントバックを謳う企画やコンテンツに掲載する場合は選択NG'>
                  <QuestionMarkCircledIcon style={{ cursor: 'pointer' }} />
                </Tooltip>
              </div>
            </Grid.Col>
          </Grid>
          <div style={{ marginTop: '32px' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #d1d1d1',
                borderRadius: '4px',
                padding: '12px 16px',
                color: '#333',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              type='button'
              onClick={toggle}
            >
              <span>商品の状況をモック</span>
              <ChevronDownIcon
                style={{ cursor: 'pointer', marginLeft: '4px', transform: opened ? 'rotate(180deg)' : '' }}
              />
            </button>

            <Collapse in={opened}>
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}></div>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>在庫</div>
              <Grid gutter='md'>
                <Grid.Col span={2}>
                  <Radio
                    name='mock.stock'
                    value='true'
                    label='あり'
                    defaultChecked={formValues.mock.stock === 'true'}
                    color='blue'
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <Radio
                    name='mock.stock'
                    value='false'
                    label='なし'
                    defaultChecked={formValues.mock.stock === 'false'}
                    color='blue'
                  />
                </Grid.Col>
              </Grid>
              <div style={{ fontWeight: 'bold', marginBottom: '8px', marginTop: '32px' }}>ポイントバック</div>
              <Grid gutter='md'>
                <Grid.Col span={2}>
                  <Radio
                    name='mock.pointRate'
                    value='true'
                    label='あり'
                    defaultChecked={formValues.mock.pointRate === 'true'}
                    color='blue'
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <Radio
                    name='mock.pointRate'
                    value='false'
                    label='なし'
                    defaultChecked={formValues.mock.pointRate === 'false'}
                    color='blue'
                  />
                </Grid.Col>
              </Grid>

              <div style={{ fontSize: '12px', color: '#666', marginTop: '32px' }}>
                ※モックは出力されるコードに影響ありません
              </div>
            </Collapse>
          </div>
        </form>
      </div>

      <div style={{ marginTop: '32px' }}>
        <Tabs
          value={activeTab}
          keepMounted={false}
          styles={{ panel: { paddingTop: '32px' } }}
        >
          <Tabs.List>
            <Tabs.Tab
              onClick={() => setActiveTab('sp')}
              value='sp'
            >
              SP
            </Tabs.Tab>
            <Tabs.Tab
              onClick={() => setActiveTab('lg')}
              value='lg'
            >
              PC
            </Tabs.Tab>
            <Tabs.Tab
              onClick={() => setActiveTab('code')}
              value='code'
            >
              コード
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='sp'>
            <Html
              device='sp'
              content={html}
            />
          </Tabs.Panel>

          <Tabs.Panel value='lg'>
            <Html
              device='lg'
              content={html}
            />
          </Tabs.Panel>

          <Tabs.Panel value='code'>
            <Code content={code} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  )
}
