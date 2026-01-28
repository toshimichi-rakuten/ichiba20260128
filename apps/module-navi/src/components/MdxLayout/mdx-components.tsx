import Link from 'next/link'
import { ReactNode } from 'react'

/* eslint-disable react/jsx-props-no-spreading */

export function stringToValidHtmlId(string: string | ReactNode): { id: string; display: string } {
  if (typeof string !== 'string') {
    return { id: '', display: '' }
  }

  const id = string
    .replace(/ /g, '-')
    .replaceAll('・', '-')
    .replace(/[^A-Za-z0-9０１２３４５６７８９\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf-]/g, '')
    .toLowerCase()

  // Removes "[<any character>]" in the text.
  // This is used to add a unique character to an element to prevent duplicate ID.
  // e.g.
  // #### Foo [1] -> id="foo-1", while displaying it as "foo"
  // #### Foo [2] -> id="foo-2", while displaying it as "foo"

  const display = string.replace(/\[.*?\]/g, '')

  return {
    id,
    display,
  }
}

export function H1(props: { children: ReactNode }) {
  const { id, display } = stringToValidHtmlId(props.children)

  return (
    <h1
      style={{ fontSize: '28px', marginBottom: '28px' }}
      id={id}
      {...props}
    >
      {display}
    </h1>
  )
}

export function H2(props: { children: ReactNode }) {
  const { id, display } = stringToValidHtmlId(props.children)

  return (
    <h2
      style={{
        fontSize: '24px',
        marginBottom: '24px',
        marginTop: '40px',
        paddingLeft: '12px',
        borderLeft: '3px solid #0078B5',
      }}
      id={id}
      {...props}
    >
      {display}
    </h2>
  )
}

export function H3(props: { children: ReactNode }) {
  const { id, display } = stringToValidHtmlId(props.children)

  return (
    <h3
      style={{
        fontSize: '20px',
        marginBottom: '20px',
        marginTop: '40px',
      }}
      id={id}
      {...props}
    >
      {display}
    </h3>
  )
}

export function H4(props: { children: ReactNode }) {
  const { id, display } = stringToValidHtmlId(props.children)

  return (
    <h4
      style={{
        fontSize: '20px',
        marginBottom: '20px',
        marginTop: '40px',
      }}
      id={id}
      {...props}
    >
      {display}
    </h4>
  )
}

export function H5(props: { children: ReactNode }) {
  const { id, display } = stringToValidHtmlId(props.children)

  return (
    <h5
      style={{
        fontSize: '20px',
        marginBottom: '20px',
        marginTop: '40px',
      }}
      id={id}
      {...props}
    >
      {display}
    </h5>
  )
}

export function H6(props: { children: ReactNode }) {
  const { id, display } = stringToValidHtmlId(props.children)

  return (
    <h6
      style={{
        fontSize: '20px',
        marginBottom: '20px',
        marginTop: '40px',
      }}
      id={id}
      {...props}
    >
      {display}
    </h6>
  )
}

export function Code(props: { children: ReactNode }) {
  return (
    <code
      style={{
        paddingLeft: '2px',
        paddingRight: '2px',
        backgroundColor: 'rgba(0, 120, 181, 0.08)',
        fontFamily: 'JetBrains Mono',
      }}
      {...props}
    />
  )
}

export function Anchor(props: { children: ReactNode; href?: string }) {
  let target = props.href?.match(/^https/) ? '_blank' : ''

  if (!props.href) {
    throw new Error(`[Mdx] href is undefined. ${JSON.stringify(props)}`)
  }

  return (
    <Link
      style={{ color: '#0078B5', textDecoration: 'underline' }}
      target={target}
      {...props}
      href={props.href}
    />
  )
}

export function Blockquote(props: { children: ReactNode }) {
  return (
    <blockquote
      style={{
        border: '1px solid rgba(0, 0, 0, 25%)',
        margin: 0,
        padding: '8px 24px',
        borderLeftWidth: '4px',
      }}
      {...props}
    />
  )
}

const MdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  code: Code,
  a: Anchor,
  blockquote: Blockquote,
}

export default MdxComponents
