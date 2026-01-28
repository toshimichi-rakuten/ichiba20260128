export function parseObject<T>(content: string | null, err: string = 'Cannot parse JSON with invalid format.'): T {
  if (!content) {
    return {} as T
  }

  try {
    return JSON.parse(content)
  } catch {
    throw new Error(`${err} "${content}"`)
  }
}

export function parseArray<T>(
  content: string | null,
  err: string = 'Cannot parse JSON array with invalid format.'
): T[] {
  if (!content) {
    return []
  }

  try {
    return JSON.parse(content)
  } catch {
    throw new Error(`${err} "${content}"`)
  }
}
