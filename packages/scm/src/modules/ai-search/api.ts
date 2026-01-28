const REQUEST_TIMEOUT = 408
const GATEWAY_TIMEOUT = 504

// DOCS
// https://confluence.rakuten-it.com/confluence/display/searchope/API+docs

// previous DUI implementation
// https://git.rakuten-it.com/projects/DUI/repos/dynamic-ui/pull-requests/22382/diff#app%2Fpages-library%2Fpages%2Fai-gift%2Fapi%2Fai-gift-api.ts

// STG API:
// https://gateway-api.r-local.net/ai-shopping-stg/default/gift/initialize

export type SuggestResponseData = {
  suggestedQueries: string[]
}

export type SuggestResponse = {
  status: string
  data: SuggestResponseData
}

export type GiftItem = {
  image: string
  text: string
  price: string
  rating: number
  reviewCount: number | string
  originalItemUrl: string
  hasPriceRange: boolean
  giftLabels?: string[]
  shipping?: {
    price: string
  }
}

export type SearchFilters = {
  priceRange?: {
    min?: number
    max?: number
  }
  ageGroup?: string
  categories?: string[]
  gender?: string
  relationship?: string
}

export type SearchParams = {
  query?: string
  filters?: SearchFilters
}

export type SearchResponse = {
  status: string
  data: {
    headline: string
    items: GiftItem[]
  }
}

export type ErrorResponse = {
  errorType: 'timeout' | 'system'
}

function isTimeoutError(e: unknown): boolean {
  if (typeof e === 'string' && e.toLowerCase().includes('timeout')) {
    return true
  }
  if ((e as Error).message?.toLowerCase().includes('timeout')) {
    return true
  }
  if (e instanceof DOMException && e.name === 'AbortError') {
    return true
  }
  return false
}

export async function fetchSuggest(
  endpoint: string,
  searchParameters: Record<string, string | boolean>
): Promise<SuggestResponse | ErrorResponse> {
  const fetchURL = new URL(endpoint)
  for (const [key, value] of Object.entries(searchParameters)) {
    fetchURL.searchParams.set(key, String(value))
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

  try {
    const rawResponse = await fetch(fetchURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-cache',
      signal: controller.signal,
    })

    if (!rawResponse.ok) {
      if (rawResponse.status === GATEWAY_TIMEOUT || rawResponse.status === REQUEST_TIMEOUT) {
        return {
          errorType: 'timeout',
        }
      }
      return {
        errorType: 'system',
      }
    }

    const response = await rawResponse.json()
    return response as SuggestResponse
  } catch (e) {
    if (isTimeoutError(e)) {
      return {
        errorType: 'timeout',
      }
    }
    return {
      errorType: 'system',
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function fetchSearch(
  endpoint: string,
  queryParameters: Record<string, string | boolean>,
  params: SearchParams
): Promise<SearchResponse | ErrorResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const body: SearchParams = {
      ...queryParameters,
    }

    if (params.query) {
      body.query = params.query
    }

    if (params.filters) {
      body.filters = params.filters
    }

    const rawResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-cache',
      signal: controller.signal,
      body: JSON.stringify(body),
    })

    if (!rawResponse.ok) {
      if (rawResponse.status === GATEWAY_TIMEOUT || rawResponse.status === REQUEST_TIMEOUT) {
        return {
          errorType: 'timeout',
        }
      }
      return {
        errorType: 'system',
      }
    }

    const response = await rawResponse.json()
    return response as SearchResponse
  } catch (e) {
    if (isTimeoutError(e)) {
      return {
        errorType: 'timeout',
      }
    }
    return {
      errorType: 'system',
    }
  } finally {
    clearTimeout(timeoutId)
  }
}
