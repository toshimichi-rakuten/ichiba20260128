// https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Home

export function sendRATCustomEvent(ratId: string, eventType: string) {
  const dispatcher = getRatDispatcher()

  const pData = {
    compid: [ratId],
    pgl: getDeviceName(),
    ssc: 'event',
    assc: 'event',
  }

  // Copied from giftsearch
  // These uses the ID/settings of event pages.
  dispatcher({
    acc: 1,
    aid: 43,
    eventType,
    ckp: getCookie('Rz'),
    cks: getCookie('Rp'),
    pData: pData,
    options: ['url', 'ua'],
  })
}

function getRatDispatcher() {
  const addCustomEvent = window?.RAT?.addCustomEvent

  if (!addCustomEvent) {
    console.log('window.RAT.addCustomEvent not found. RAT event will not be sent.')
    return () => {}
  }

  return addCustomEvent
}

function getCookie(type = 'Rz') {
  if (document.cookie !== '') {
    let cookies = new Array()
    let tmp = document.cookie.split('; ')
    for (let i = 0; i < tmp.length; i++) {
      let data = tmp[i].split('=')
      // @ts-ignore
      cookies[data[0]] = decodeURIComponent(data[1])
    }

    // @ts-ignore
    return !!cookies && cookies[type]
  }

  return null
}

function getDeviceName() {
  const userAgent = navigator.userAgent

  if (/iPhone|iPod|Android.*Mobile/.test(userAgent)) {
    return 'sp'
  }

  return 'pc'
}
