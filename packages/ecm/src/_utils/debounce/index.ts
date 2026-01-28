export function debounce(callback: Function, timeout = 300) {
  let timeoutId: number | undefined = undefined

  return (...args: any) => {
    window.clearTimeout(timeoutId)

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, timeout)
  }
}
