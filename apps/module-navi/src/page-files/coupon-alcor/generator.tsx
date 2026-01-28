import styles from './index.module.scss'
import { ConfigProps, generateIntegration, generateStatic } from 'ecm/src/modules/alcor-coupon/generator'
import Code from 'src/components/Code'
import Html from 'src/components/Html'
import { useState, useEffect } from 'react'
import { Radio, Tabs, Title, Select, Flex } from '@mantine/core'

const SESSION_STORAGE_KEY = 'ecm-coupon-alcor-generator-config-0609'

type GeneratorForm = {
  sp: ConfigProps
  pc: ConfigProps
}

const DEFAULT_CONFIG: GeneratorForm = {
  sp: {
    type: 'coupon',
    viewMore: false,
    viewMoreVisible: 4,
    viewMoreVisibleMd: 4,
    spColumn: 2,
    pcColumn: 4,
  },
  pc: {
    type: 'coupon',
    viewMore: false,
    viewMoreVisible: 4,
    viewMoreVisibleMd: 4,
    spColumn: 2,
    pcColumn: 4,
  },
}

type Filter = {
  key: string
  label: string
}

const typeFilters: Filter[] = [
  { key: 'coupon', label: 'クーポンのみ' },
  { key: 'couponWithItem', label: 'クーポンと商品' },
  { key: 'item', label: '商品のみ' },
]

const viewMoreFilters: Filter[] = [
  { key: 'true', label: '設置する' },
  { key: 'false', label: '設置しない' },
]

const viewMoreVisibleSP: number[] = [2, 4, 6, 8, 10]
const viewMoreVisiblePC: number[] = [3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 20]

export function CouponAlcorGenerator() {
  let initialConfig: GeneratorForm = DEFAULT_CONFIG
  const storageValue = global?.window ? window.sessionStorage.getItem(SESSION_STORAGE_KEY) : null

  if (storageValue) {
    try {
      initialConfig = JSON.parse(storageValue)
    } catch (e) {
      console.error('Failed to parse session storage value.', e)
    }
  }

  const [formValues, setFormValues] = useState<GeneratorForm>(initialConfig)
  const [activeTab, setActiveTab] = useState<string | null>('sp')

  useEffect(() => {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(formValues))
  }, [formValues])

  return (
    <div>
      <Flex py={16}>
        <Title
          order={3}
          size={16}
          id='表示形式'
          className={styles['title-type']}
        >
          表示形式
        </Title>
        {typeFilters.map((c) => {
          return (
            <Radio
              key={c.key}
              name='type'
              label={c.label}
              defaultChecked={formValues.sp.type === c.key}
              onChange={() => {
                setFormValues({
                  sp: {
                    ...formValues.sp,
                    type: c.key as 'coupon' | 'couponWithItem' | 'item',
                  },
                  pc: {
                    ...formValues.pc,
                    type: c.key as 'coupon' | 'couponWithItem' | 'item',
                  },
                })
              }}
              color='blue'
              mr={36}
            />
          )
        })}
      </Flex>

      {formValues.sp.type !== 'coupon' && (
        <>
          <Flex
            py={16}
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}
          >
            <Title
              order={3}
              size={16}
              className={styles['title-device']}
            >
              SP
            </Title>
            <Title
              order={4}
              size={16}
              id='カラム数（クーポン対象商品）'
              className={styles['sub-title']}
            >
              カラム数（クーポン対象商品）
            </Title>
            {[...Array(2)].map((i, index) => {
              const columnNumber = index + 1
              return (
                <Radio
                  key={index}
                  name='sp.column'
                  label={columnNumber.toString()}
                  defaultChecked={formValues.sp.spColumn === columnNumber}
                  onChange={() => {
                    setActiveTab('sp')
                    setFormValues({
                      sp: {
                        ...formValues.sp,
                        spColumn: columnNumber,
                      },
                      pc: {
                        ...formValues.pc,
                        spColumn: columnNumber,
                      },
                    })
                  }}
                  color='blue'
                  mr={36}
                />
              )
            })}
          </Flex>
          <Flex
            py={16}
            ml={64}
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}
          >
            <Title
              order={4}
              size={16}
              id='もっと見る'
              className={styles['sub-title']}
            >
              もっと見る
            </Title>
            {viewMoreFilters.map((c) => {
              return (
                <Radio
                  key={c.key}
                  name='sp.viewMore'
                  label={c.label}
                  defaultChecked={formValues.sp.viewMore === (c.key === 'true')}
                  onChange={() => {
                    setActiveTab('sp')
                    setFormValues({
                      ...formValues,
                      sp: {
                        ...formValues.sp,
                        viewMore: c.key === 'true',
                      },
                    })
                  }}
                  color='blue'
                  mr={36}
                />
              )
            })}
          </Flex>
          {formValues.sp.viewMore && (
            <Flex
              py={16}
              ml={64}
              style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}
            >
              <Title
                order={4}
                size={16}
                id='もっと見るを表示させる商品数（1クーポンあたり）'
                className={styles['sub-title']}
              >
                もっと見るを表示させる商品数
                <br />
                （1クーポンあたり）
              </Title>
              <Select
                data={viewMoreVisibleSP.map((i) => i.toString() + '商品ごと')}
                value={(formValues.sp.viewMoreVisible ?? 4).toString() + '商品ごと'}
                defaultValue={(formValues.sp.viewMoreVisible ?? 4).toString()}
                onChange={(val) => {
                  const num = Number(val?.replace('商品ごと', ''))
                  setActiveTab('sp')
                  setFormValues({
                    ...formValues,
                    sp: {
                      ...formValues.sp,
                      viewMoreVisible: num,
                    },
                    pc: {
                      ...formValues.pc,
                      viewMoreVisible: num,
                    },
                  })
                }}
                classNames={{
                  dropdown: styles['select'],
                  input: styles['select-input'],
                }}
              />
            </Flex>
          )}
          <Flex
            py={16}
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}
          >
            <Title
              order={3}
              size={16}
              className={styles['title-device']}
            >
              PC
            </Title>
            <Title
              order={4}
              size={16}
              id='カラム数（クーポン対象商品）'
              className={styles['sub-title']}
            >
              カラム数（クーポン対象商品）
            </Title>
            {[...Array(3)].map((i, index) => {
              const columnNumber = index + 3
              return (
                <Radio
                  key={index}
                  name='pc.column'
                  label={columnNumber.toString()}
                  defaultChecked={formValues.pc.pcColumn === columnNumber}
                  onChange={() => {
                    setActiveTab('lg')
                    setFormValues({
                      sp: {
                        ...formValues.sp,
                        pcColumn: columnNumber,
                      },
                      pc: {
                        ...formValues.pc,
                        pcColumn: columnNumber,
                      },
                    })
                  }}
                  color='blue'
                  mr={36}
                />
              )
            })}
          </Flex>
          <Flex
            py={16}
            ml={64}
            style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}
          >
            <Title
              order={4}
              size={16}
              id='もっと見る'
              className={styles['sub-title']}
            >
              もっと見る
            </Title>
            {viewMoreFilters.map((c) => {
              return (
                <Radio
                  key={c.key}
                  name='pc.viewMore'
                  label={c.label}
                  defaultChecked={formValues.pc.viewMore === (c.key === 'true')}
                  onChange={() => {
                    setActiveTab('lg')
                    setFormValues({
                      ...formValues,
                      pc: {
                        ...formValues.pc,
                        viewMore: c.key === 'true',
                      },
                    })
                  }}
                  color='blue'
                  mr={36}
                />
              )
            })}
          </Flex>
          {formValues.pc.viewMore && (
            <Flex
              py={16}
              ml={64}
              style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}
            >
              <Title
                order={4}
                size={16}
                id='もっと見るを表示させる商品数（1クーポンあたり）'
                className={styles['sub-title']}
              >
                もっと見るを表示させる商品数
                <br />
                （1クーポンあたり）
              </Title>
              <Select
                data={viewMoreVisiblePC.map((i) => i.toString() + '商品ごと')}
                value={(formValues.pc.viewMoreVisibleMd ?? 4).toString() + '商品ごと'}
                defaultValue={(formValues.pc.viewMoreVisibleMd ?? 4).toString()}
                onChange={(val) => {
                  const num = Number(val?.replace('商品ごと', ''))
                  setActiveTab('lg')
                  setFormValues({
                    ...formValues,
                    sp: {
                      ...formValues.sp,
                      viewMoreVisibleMd: num,
                    },
                    pc: {
                      ...formValues.pc,
                      viewMoreVisibleMd: num,
                    },
                  })
                }}
                classNames={{
                  dropdown: styles['select'],
                  input: styles['select-input'],
                }}
              />
            </Flex>
          )}
        </>
      )}

      <div style={{ marginTop: '32px' }}>
        <Tabs
          keepMounted={false}
          value={activeTab}
          defaultValue={activeTab}
          mt={48}
          styles={{ panel: { paddingTop: '16px' } }}
        >
          <Tabs.List>
            <Tabs.Tab
              value='sp'
              onClick={() => setActiveTab('sp')}
            >
              SP
            </Tabs.Tab>
            <Tabs.Tab
              value='lg'
              onClick={() => setActiveTab('lg')}
            >
              PC
            </Tabs.Tab>
            {formValues.sp.viewMore !== formValues.pc.viewMore && (
              <>
                <Tabs.Tab
                  value='spCode'
                  onClick={() => setActiveTab('spCode')}
                >
                  SPコード
                </Tabs.Tab>
                <Tabs.Tab
                  value='pcCode'
                  onClick={() => setActiveTab('pcCode')}
                >
                  PCコード
                </Tabs.Tab>
              </>
            )}
            {formValues.sp.viewMore === formValues.pc.viewMore && (
              <Tabs.Tab
                value='code'
                onClick={() => setActiveTab('code')}
              >
                コード
              </Tabs.Tab>
            )}
          </Tabs.List>
          <Tabs.Panel value='sp'>
            <Html
              adHighlight={true}
              content={generateStatic(formValues.sp)}
            />
          </Tabs.Panel>
          <Tabs.Panel value='lg'>
            <Html
              adHighlight={true}
              device='lg'
              content={generateStatic(formValues.pc)}
            />
          </Tabs.Panel>
          {formValues.sp.viewMore !== formValues.pc.viewMore && (
            <>
              <Tabs.Panel value='spCode'>
                <Code content={generateIntegration(formValues.sp)} />
              </Tabs.Panel>
              <Tabs.Panel value='pcCode'>
                <Code content={generateIntegration(formValues.pc)} />
              </Tabs.Panel>
            </>
          )}
          {formValues.sp.viewMore === formValues.pc.viewMore && (
            <Tabs.Panel value='code'>
              <Code content={generateIntegration(formValues.sp)} />
            </Tabs.Panel>
          )}
        </Tabs>
      </div>
    </div>
  )
}
