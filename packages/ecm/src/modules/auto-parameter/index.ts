// @ts-nocheck
/** Migrated from the old ECM. */
import { generatePageNameFromLocation, addParameterToLink } from './url-util'

export const ECM_MODULE_NAME = 'ecm-auto-parameter'

export class AutoParameter {
  constructor(root, _ecm) {
    const pageName = generatePageNameFromLocation(window.location)
    this.links = []
    this.rootElement = root
    this.targetDomain = this.rootElement.dataset.targetDomain || ''
    this.targetDomainArray = this.targetDomain.replace(/\s/g, '').split(',')
    this.targetDomainArray = this.targetDomainArray.filter((item) => item !== '')
    this.paramName = this.rootElement.dataset.paramName || 'l-id'
    this.linkNameAttribute = this.rootElement.dataset.linkNameAttribute || 'data-link-name,sc_linkName'
    this.linkNameAttributeArray = this.linkNameAttribute.replace(/\s/g, '').split(',')
    this.separator = this.rootElement.dataset.separator || '_'
    this.pageName = this.rootElement.dataset.pageName || pageName
    this.areaName = this.rootElement.dataset.areaName || ''
    this.values = this.areaName ? [this.pageName, this.areaName] : [this.pageName]
    this.count = this.rootElement.dataset.count !== 'false'
    this.dynamic = this.rootElement.dataset.dynamic === 'true'

    this.initialize()
  }

  initialize() {
    if (this.dynamic) {
      this.addListenerOnRoot()
    } else {
      this.getLinks()
      if (this.links.length === 0) {
        return
      }
      this.filterLinks()
      this.addListenerOnLinks()
    }
  }

  addListenerOnRoot() {
    function findLinkElement(event) {
      let { target } = event
      do {
        if (target.nodeName.toLowerCase() === 'a' && this.isTargetLink(target)) {
          addParameterToLink(target, this.separator, this.paramName, this.linkNameAttributeArray, this.values)
          return
        }
        target = target.parentNode
      } while (target.parentNode && target !== this.rootElement)
    }
    this.rootElement.addEventListener('mousedown', findLinkElement.bind(this))
    this.rootElement.addEventListener('touchstart', findLinkElement.bind(this))
    this.rootElement.addEventListener('click', findLinkElement.bind(this))
  }

  getLinks() {
    this.links = this.rootElement.getElementsByTagName('a')
  }

  filterLinks() {
    this.links = [].filter.call(this.links, (link) => this.isTargetLink(link))
  }

  addListenerOnLinks() {
    ;[].forEach.call(this.links, (link, index) => {
      // Use 'mousedown' and 'touchstart' instead of 'click' in order to not other scripts prevent click event,
      // and ensure to work user's middle-click or 'Open in new Tab' behavior.
      link.addEventListener(
        'mousedown',
        addParameterToLink.bind(
          this,
          link,
          this.separator,
          this.paramName,
          this.linkNameAttributeArray,
          this.values,
          this.count,
          index + 1
        ),
        {
          once: true,
        }
      )
      link.addEventListener(
        'touchstart',
        addParameterToLink.bind(
          this,
          link,
          this.separator,
          this.paramName,
          this.linkNameAttributeArray,
          this.values,
          this.count,
          index + 1
        ),
        {
          once: true,
        }
      )
      link.addEventListener(
        'touchstart',
        addParameterToLink.bind(
          this,
          link,
          this.separator,
          this.paramName,
          this.linkNameAttributeArray,
          this.values,
          this.count,
          index + 1
        ),
        {
          once: true,
        }
      )
    })
  }

  isTargetLink(link) {
    // Exclude elements without href attribute.
    if (!link.attributes.href) {
      return false
    }
    // Exluce elements in-page link which starts from #.
    if (/^#/.test(link.attributes.href.value)) {
      return false
    }
    // Filter domain(s) if specified.
    if (this.targetDomainArray.length > 0) {
      let matched = false
      this.targetDomainArray.forEach((domain) => {
        if (link.hostname.indexOf(domain) > -1) {
          matched = true
        }
      })
      return matched
    }
    return true
  }
}
