// @ts-nocheck
/** Migrated from the old ECM. */

/**
 * Generate anchor element which has window.location like object (hostname, origin, etc) from URL string.
 * This should be replaced with new URL() when IE 11 is removed from support browsers.
 * @param {String} urlString - URL String.
 * @returns {HTMLAnchorElement} - Anchor element.
 */
export function generateLocationFromURL(urlString) {
  const a = document.createElement('a')
  a.href = urlString
  return a
}

/**
 * Generate object from location.seach parameter string.
 * @param {String} locationSearch - location.search format string (?key=value&key2=value2).
 * @returns {Object} - Object {key:value, key2:value}.
 */
export function generateObjectFromSearchParameter(locationSearch) {
  let array = []
  const object = {}
  if (locationSearch === '') {
    return object
  }
  array = locationSearch.replace(/^\?/, '').split(/&|=/)
  for (let i = 0; i < array.length; i += 1) {
    if (i % 2 === 0) {
      object[array[i]] = ''
    } else {
      object[array[i - 1]] = array[i]
    }
  }
  return object
}
/**
 * Generate location.search format string from object.
 * @param {Object} object - Object {key:value, key2:value}.
 * @returns {String} - location.search format string (?key=value&key2=value2).
 */
export function generateSearchParameterFromObject(object) {
  let searchParameter = ''
  Object.keys(object).forEach((key) => {
    if ({}.hasOwnProperty.call(object, key)) {
      searchParameter += `${key}=${object[key]}&`
    }
  })
  if (searchParameter !== '') {
    searchParameter = `?${searchParameter}`
  }
  return searchParameter.replace(/&$/, '')
}

/**
 * Add parameter to URL string. If given URL already contains existing parameter, then overwrite it with new value.
 * @param {String} url - URL string.
 * @param {String} parameter - Parameter which you want to add or overwrite.
 * @param {String} value - Value to be added with parameter.
 */
export function addParameter(url, parameter, value) {
  if (!url) {
    return url
  }
  const location = generateLocationFromURL(url)
  const locationSearchObject = generateObjectFromSearchParameter(location.search)
  locationSearchObject[parameter] = value
  const newSearchParameter = generateSearchParameterFromObject(locationSearchObject)
  location.search = newSearchParameter
  return location.href
}

/**
 * Generate "domain_directory_directory..." string from location
 * @param {Location or HTMLAnchorElement} location - location or anchor element have full URL href string.
 * @returns {String} - "domain_directory_directory..." format string.
 */
export function generatePageNameFromLocation(location) {
  if (/localhost/.test(location.hostname)) {
    return 'localhost_directory'
  }
  const subDomain = location.hostname.split('.')[0]
  const pathName = location.pathname
    .replace(/(?=\w+\.\w{3,4}$).+/, '')
    .replace(/\//g, '_')
    .replace(/_$/, '')
  return `${subDomain}${pathName}`
}

/**
 * Get value from attribute in array of attribute names.
 * Returns a value when one of the attribute name has been matched and has a value.
 * Return null when no attributes are given in the link.
 * @param {HTMLAnchorElement} link - Link element to get value from attribute.
 * @param {Array} attributeArray - Array of attribute names in String.
 * @returns {String} - Value taken from attribute
 */
export function getValueFromAttribute(link, attributeArray) {
  let value = null
  for (let i = 0; i < attributeArray.length; i += 1) {
    value = link.getAttribute(attributeArray[i])
    if (value) {
      return value
    }
  }
  return value
}

/**
 * Add new parameter and values with separator.
 * @param {HTMLAnchorElement} link - Link element to be added new parameter.
 * @param {String} separator - Separator to separate parameter values.
 * @param {String} paramName - Parameter name to add.
 * @param {Array} linkNameAttributes - Array of attribute name to get value.
 * @param {Array} values - Array which contains values.
 * @param {Boolean} doCount - Add link count or not.
 * @param {Number} count - Added count number if doCount is true.
 */
export function addParameterToLink(link, separator, paramName, linkNameAttributes, values, doCount, count) {
  const newValues = values.slice()
  const attributeValue = getValueFromAttribute(link, linkNameAttributes)
  if (attributeValue) {
    newValues.push(attributeValue)
  } else if (doCount && typeof count !== 'undefined') {
    newValues.push(count)
  }
  const value = newValues.join(separator)
  const newHref = addParameter(link.attributes.href.value, paramName, value)
  link.setAttribute('href', newHref)
}
