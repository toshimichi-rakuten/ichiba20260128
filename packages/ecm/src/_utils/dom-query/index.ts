/**
 * Query selectors that doesn't suck.
 * - Easy casting with generics.
 * - Maps empty result to empty array.
 */

export function query<T = Element>(root: Document | Element) {
  return {
    getElements: (selector: string | null) => getElements<T>(root, selector),
    getElementsByClassName: (selector: string | null) => getElementsByClassName<T>(root, selector),
    getElementsByAttribute: (selector: Object | string | null) => getElementsByAttribute<T>(root, selector),
    getElementsByTagName: (selector: string | null) => getElementsByTagName<T>(root, selector),
  }
}

function getElements<T = Element>(root: Document | Element, selector: string | null): T[] {
  if (!selector) {
    return []
  }

  return Array.from(root.querySelectorAll(selector) as unknown as T[])
}

function getElementsByClassName<T = Element>(root: Document | Element, className: string | null): T[] {
  if (!className) {
    return []
  }

  return Array.from(root.getElementsByClassName(className) as unknown as T[])
}

function getElementsByAttribute<T = Element>(root: Document | Element, selector: Object | string | null): T[] {
  if (!selector) {
    return []
  }

  if (typeof selector === 'string') {
    return Array.from(root.querySelectorAll(`[${selector}]`) as unknown as T[])
  }

  const [key, value] = Object.entries(selector)[0]
  return Array.from(root.querySelectorAll(`[${key}="${value}"]`) as unknown as T[])
}

function getElementsByTagName<T = Element>(root: Document | Element, tag: string | null): T[] {
  if (!tag) {
    return []
  }

  return Array.from(root.getElementsByTagName(tag) as unknown as T[])
}
