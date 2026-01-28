export function getCookie(): Object {
  if (!document.cookie) {
    return {}
  }

  const cookieObject = document.cookie.split('; ').reduce((prev, current) => {
    const [key, value] = current.split('=')

    return {
      ...prev,
      [key]: decodeURIComponent(value),
    }
  }, {})

  return cookieObject
}
