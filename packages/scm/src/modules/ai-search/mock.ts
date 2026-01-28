import type { SuggestResponse, SearchResponse, ErrorResponse } from './api'
import type { FetchSuggestFunction, FetchSearchFunction } from '.'

export const MOCK_SEARCH_DATA_DELAY = 2000
export const MOCK_SUGGEST_DATA_DELAY = 500

export const mockSuggestData: SuggestResponse = {
  status: 'success',
  data: {
    suggestedQueries: [
      'お歳暮にぴったりの紅茶セットを見つける',
      'お歳暮のための手作りジャムを見つける',
      'お歳暮用の特別な体験ギフトを探す',
      '人気のあるお歳暮ギフトセットを探す',
      'お歳暮に贈るべきおしゃれな食器を探す',
    ],
  },
}

export const mockSuggestErrorData: ErrorResponse = {
  errorType: 'system',
}

export const mockSearchData: SearchResponse = {
  status: 'success',
  data: {
    headline: 'レビュー高評価アイテム',
    items: [
      {
        image: 'https://placehold.co/300',
        text: '高級ギフトセット【送料無料】特選詰め合わせ',
        price: '15,533円',
        rating: 4.67,
        reviewCount: 461,
        originalItemUrl: 'https://item.rakuten.co.jp/shop1/item1',
        hasPriceRange: true,
        giftLabels: ['ラッピング可能', 'メッセージカード対応', 'hoge', 'hoge'],
        shipping: {
          price: '0',
        },
      },
      {
        image: 'https://placehold.co/300',
        text: 'プレミアム商品詰め合わせ【限定版】お歳暮対応',
        price: '9,443円',
        rating: 4.65,
        reviewCount: 983,
        originalItemUrl: 'https://item.rakuten.co.jp/shop2/item2',
        hasPriceRange: false,
        giftLabels: ['ラッピング可能'],
        shipping: {
          price: '1000',
        },
      },
      {
        image: 'https://placehold.co/300',
        text: '職人手作り伝統工芸品【桐箱入り】記念品最適',
        price: '13,920円',
        rating: 4.15,
        reviewCount: 18,
        originalItemUrl: 'https://item.rakuten.co.jp/shop3/item3',
        hasPriceRange: true,
        shipping: {
          price: '0',
        },
      },
      {
        image: 'https://placehold.co/300',
        text: '厳選素材使用【産地直送】グルメギフトセット',
        price: '22,802円',
        rating: 4.41,
        reviewCount: 69,
        originalItemUrl: 'https://item.rakuten.co.jp/shop4/item4',
        hasPriceRange: true,
        giftLabels: ['ラッピング可能', 'メッセージカード対応', 'hoge'],
        shipping: {
          price: '0',
        },
      },
      {
        image: 'https://placehold.co/300',
        text: '厳選素材使用【産地直送】グルメギフトセット',
        price: '22,802円',
        rating: 4.41,
        reviewCount: 69,
        originalItemUrl: 'https://item.rakuten.co.jp/shop4/item4',
        hasPriceRange: true,
        giftLabels: ['ラッピング可能', 'メッセージカード対応', 'hoge'],
        shipping: {
          price: '0',
        },
      },
      {
        image: 'https://placehold.co/300',
        text: '職人手作り伝統工芸品【桐箱入り】記念品最適',
        price: '13,920円',
        rating: 4.15,
        reviewCount: 18,
        originalItemUrl: 'https://item.rakuten.co.jp/shop3/item3',
        giftLabels: [],
        hasPriceRange: false,
        shipping: {
          price: '0',
        },
      },
    ],
  },
}

export const mockSearchNoResultData: SearchResponse = {
  status: 'success',
  data: {
    headline: 'レビュー高評価アイテム',
    items: [],
  },
}

export const mockSearchErrorData: ErrorResponse = {
  errorType: 'system',
}

function createMockFetchSuggest(
  status: 'ok' | 'error' | 'loading',
  response: SuggestResponse | ErrorResponse
): FetchSuggestFunction {
  return async () => {
    if (status === 'loading') {
      // Infinite loading
      await new Promise(() => {})
    }
    if (status === 'error') {
      await new Promise((resolve) => setTimeout(resolve, MOCK_SUGGEST_DATA_DELAY))
      return response as ErrorResponse
    }
    await new Promise((resolve) => setTimeout(resolve, MOCK_SUGGEST_DATA_DELAY))
    return response as SuggestResponse
  }
}

function createMockFetchSearch(
  status: 'ok' | 'error' | 'loading',
  response: SearchResponse | ErrorResponse
): FetchSearchFunction {
  return async () => {
    if (status === 'loading') {
      // Infinite loading
      await new Promise(() => {})
    }
    if (status === 'error') {
      await new Promise((resolve) => setTimeout(resolve, MOCK_SEARCH_DATA_DELAY))
      return response as ErrorResponse
    }
    await new Promise((resolve) => setTimeout(resolve, MOCK_SEARCH_DATA_DELAY))
    return response as SearchResponse
  }
}

export const mockFetchSuggestOk = createMockFetchSuggest('ok', mockSuggestData)
export const mockFetchSuggestError = createMockFetchSuggest('error', mockSuggestErrorData)
export const mockFetchSuggestLoading = createMockFetchSuggest('loading', mockSuggestData)

export const mockFetchSearchOk = createMockFetchSearch('ok', mockSearchData)
export const mockFetchSearchError = createMockFetchSearch('error', mockSearchErrorData)
export const mockFetchSearchLoading = createMockFetchSearch('loading', mockSearchData)
export const mockFetchSearchNoResult = createMockFetchSearch('ok', mockSearchNoResultData)
