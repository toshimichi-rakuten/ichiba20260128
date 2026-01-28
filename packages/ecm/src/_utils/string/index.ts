export function mergeClassNames(...strings: (string | undefined | null)[]): string {
  return strings.filter(Boolean).join(' ')
}
