import { readFileSync, writeFileSync } from 'fs'

function generateCacheVersion() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')

  return `${year}${month}${day}${hour}${minute}`
}

function main() {
	const file = '.scripts/generate-outline-include/index.js'

	try {
		let content = readFileSync(file, 'utf-8')

		const regex = /const CACHE_VERSION = (\d+)/

		if (regex.test(content)) {
			content = content.replace(regex, `const CACHE_VERSION = ${generateCacheVersion()}`)
		} else {
			throw new Error('regex failed', regex)
		}

		writeFileSync(file, content, 'utf-8')
	} catch (error) {
		console.error(`Failed to update ${file}:`, error)
		process.exit(1)
	}
}

main()
