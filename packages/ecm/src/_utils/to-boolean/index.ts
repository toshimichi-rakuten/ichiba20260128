/** "false" (string) is a truthy value because it's a string that is not empty.
 * This is annoying when working with data-attributes since the values can only be string.
 *
 * e.g. data-open="false" and data-open="0" gets parsed as true with Boolean()
 * */
export function toBoolean(any: any): boolean {
  if (any === 'false') {
    return false
  }

  if (any === '0') {
    return false
  }

  return !!any
}
