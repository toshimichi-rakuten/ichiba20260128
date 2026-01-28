import { AISearchSettings, AISearchStyle } from '.'

export const oseiboStyle: AISearchStyle = {
  themeColor: '#507819',
  subThemeColor: '#bfd5a0',
  thumbBgColor: 'var(--scm-ai-search-theme-color)',
  thumbSize: '24px',
  trackHeight: '8px',
  trackColor: '#d2d2d2',
  toggleBgColor: '#93b368',
  heroBgTexture: "url('https://r.r10s.jp/com/js/c/scm/assets/ai_search_texture.png')",
  smFilterGridSize: 2,
  mdFilterGridSize: 3,
}

// uses production api
export const oseiboSettings: AISearchSettings = {
  ratPrefix: 'oseibo2025',
  minResultScrollOffset: 50,
  api: {
    suggest: {
      url: 'https://api-catalog-jpe-gateway.rakuten.co.jp/ai-shopping/default/gift/initialize',
      searchParameters: {
        eventName: 'oseibo',
      },
      fallback: {
        suggestedQueries: [
          'お歳暮にぴったりの紅茶セットを見つける',
          'お歳暮のための手作りジャムを見つける',
          'お歳暮用の特別な体験ギフトを探す',
          '人気のあるお歳暮ギフトセットを探す',
          'お歳暮に贈るべきおしゃれな食器を探す',
        ],
      },
    },
    search: {
      url: 'https://api-catalog-jpe-gateway.rakuten.co.jp/ai-shopping/default/gift/search',
      queryParameters: {
        eventName: 'oseibo',
      },
    },
  },
  filters: [
    {
      type: 'multiselect',
      name: 'categories',
      placeholder: 'カテゴリー',
      smGridSpan: 2,
      options: [
        { value: 'カニ・魚介類', label: 'カニ・魚介類' },
        { value: '水産加工品', label: '水産加工品' },
        { value: '精肉', label: '精肉' },
        { value: 'ハム・肉加工品', label: 'ハム・肉加工品' },
        { value: 'グルメセット・詰め合わせ', label: 'グルメセット・詰め合わせ' },
        { value: 'クッキー・焼き菓子', label: 'クッキー・焼き菓子' },
        { value: '和菓子', label: '和菓子' },
        { value: 'ビール・洋酒', label: 'ビール・洋酒' },
        { value: '日本酒・焼酎', label: '日本酒・焼酎' },
        { value: 'コーヒー', label: 'コーヒー' },
        { value: '野菜・果実飲料', label: '野菜・果実飲料' },
        { value: 'カタログギフト', label: 'カタログギフト' },
      ],
    },
    {
      type: 'select',
      name: 'ageGroup',
      placeholder: '年代',
      options: [
        { value: '20代', label: '20代' },
        { value: '30代', label: '30代' },
        { value: '40代', label: '40代' },
        { value: '50代', label: '50代' },
        { value: '60代', label: '60代' },
        { value: 'シニア', label: 'シニア' },
      ],
    },
    {
      type: 'select',
      name: 'relationship',
      placeholder: '贈る相手',
      options: [
        { value: '家族・親戚', label: '家族・親戚' },
        { value: '仕事関係', label: '仕事関係' },
        { value: '友人・知人', label: '友人・知人' },
      ],
    },
    {
      type: 'range',
      name: 'price',
      priceRange: {
        min: 0,
        max: 22000,
        stepper: 2000,
        defaultMin: 0,
        defaultMax: 22000,
      },
      currencyText: '円',
      noLowerLimitText: '下限なし',
      noUpperLimitText: '上限なし',
      minLabel: '2,000円以下',
      maxLabel: '20,000円以上',
    },
  ],
}

export const xmasStyle: AISearchStyle = {
  themeColor: '#185EB4',
  subThemeColor: '#E4F0FF',
  thumbBgColor: 'var(--scm-ai-search-theme-color)',
  thumbSize: '24px',
  trackHeight: '8px',
  trackColor: '#d2d2d2',
  toggleBgColor: '#C3D2E5',
  heroBgTexture: "url('https://r.r10s.jp/com/js/c/scm/assets/ai_search_texture.png')",
  smFilterGridSize: 2,
  mdFilterGridSize: 4,
}

// uses production api
export const xmasSettings: AISearchSettings = {
  ratPrefix: 'xmas2025',
  minResultScrollOffset: 50,
  api: {
    suggest: {
      url: 'https://api-catalog-jpe-gateway.rakuten.co.jp/ai-shopping/default/gift/initialize',
      searchParameters: {
        eventName: 'xmas',
      },
      fallback: {
        suggestedQueries: [
          '彼氏にスポーツ・アウトドアをクリスマスで送りたい',
          '彼氏にクッキーをクリスマスで送りたい',
          '友達に日用品雑貨・文房具・手芸をクリスマスで贈りたい',
          '彼女にメイクアップをクリスマスで贈りたい',
          '友達にヘアケアをクリスマスで贈りたい',
        ],
      },
    },
    search: {
      url: 'https://api-catalog-jpe-gateway.rakuten.co.jp/ai-shopping/default/gift/search',
      queryParameters: {
        eventName: 'xmas',
      },
    },
  },
  filters: [
    {
      type: 'multiselect',
      name: 'categories',
      placeholder: 'カテゴリー',
      smGridSpan: 1,
      options: [
        { value: 'コスメ', label: 'コスメ' },
        { value: 'スキンケア', label: 'スキンケア' },
        { value: '香水・フレグランス', label: '香水・フレグランス' },
        { value: '美容・健康家電', label: '美容・健康家電' },
        { value: '洋菓子セット', label: '洋菓子セット' },
        { value: 'クッキー・焼き菓子', label: 'クッキー・焼き菓子' },
        { value: 'ケーキ', label: 'ケーキ' },
        { value: 'チョコレート', label: 'チョコレート' },
        { value: '食品', label: '食品' },
        { value: 'ビール・洋酒', label: 'ビール・洋酒' },
        { value: 'おもちゃ', label: 'おもちゃ' },
        { value: 'バッグ・小物・ブランド雑貨', label: 'バッグ・小物・ブランド雑貨' },
        { value: 'ジュエリー・アクセサリー', label: 'ジュエリー・アクセサリー' },
      ],
    },
    {
      type: 'select',
      name: 'ageGroup',
      placeholder: '年代',
      options: [
        { value: 'ベビー・幼児', label: 'ベビー・幼児' },
        { value: '小学生低学年', label: '小学生低学年' },
        { value: '小学生高学年', label: '小学生高学年' },
        { value: '中学生以上', label: '中学生以上' },
        { value: '20代', label: '20代' },
        { value: '30代', label: '30代' },
        { value: '40代', label: '40代' },
        { value: '50代', label: '50代' },
        { value: '60代', label: '60代' },
        { value: 'シニア', label: 'シニア' },
      ],
    },
    {
      type: 'select',
      name: 'relationship',
      placeholder: '贈る相手',
      options: [
        { value: '恋人', label: '恋人' },
        { value: '友達', label: '友達' },
        { value: '親', label: '親' },
        { value: '子供', label: '子供' },
      ],
    },
    {
      type: 'select',
      name: 'gender',
      placeholder: '性別',
      options: [
        { value: '男性', label: '男性' },
        { value: '女性', label: '女性' },
      ],
    },
    {
      type: 'range',
      name: 'price',
      priceRange: {
        min: 0,
        max: 11000,
        stepper: 1000,
        defaultMin: 0,
        defaultMax: 11000,
      },
      currencyText: '円',
      noLowerLimitText: '下限なし',
      noUpperLimitText: '上限なし',
      minLabel: '1,000円以下',
      maxLabel: '10,000円以上',
    },
  ],
}

// uses staging api
export const localSettings: AISearchSettings = {
  ratPrefix: 'xmas2025',
  minResultScrollOffset: 50,
  api: {
    suggest: {
      url: 'https://gateway-api.r-local.net/ai-shopping-stg/default/gift/initialize',
      searchParameters: {
        eventName: 'xmas',
      },
      fallback: {
        suggestedQueries: [
          'お歳暮にぴったりの紅茶セットを見つける',
          'お歳暮のための手作りジャムを見つける',
          'お歳暮用の特別な体験ギフトを探す',
          '人気のあるお歳暮ギフトセットを探す',
          'お歳暮に贈るべきおしゃれな食器を探す',
        ],
      },
    },
    search: {
      url: 'https://gateway-api.r-local.net/ai-shopping-stg/default/gift/search',
      queryParameters: {
        eventName: 'xmas',
      },
    },
  },
  filters: [
    {
      type: 'multiselect',
      name: 'categories',
      placeholder: 'カテゴリー',
      smGridSpan: 2,
      options: [
        { value: 'カニ・魚介類', label: 'カニ・魚介類' },
        { value: '水産加工品', label: '水産加工品' },
        { value: '精肉', label: '精肉' },
        { value: 'ハム・肉加工品', label: 'ハム・肉加工品' },
        { value: 'グルメセット・詰め合わせ', label: 'グルメセット・詰め合わせ' },
        { value: 'クッキー・焼き菓子', label: 'クッキー・焼き菓子' },
        { value: '和菓子', label: '和菓子' },
        { value: 'ビール・洋酒', label: 'ビール・洋酒' },
        { value: '日本酒・焼酎', label: '日本酒・焼酎' },
        { value: 'コーヒー', label: 'コーヒー' },
        { value: '野菜・果実飲料', label: '野菜・果実飲料' },
        { value: 'カタログギフト', label: 'カタログギフト' },
      ],
    },
    {
      type: 'select',
      name: 'ageGroup',
      placeholder: '年代',
      options: [
        { value: '20代', label: '20代' },
        { value: '30代', label: '30代' },
        { value: '40代', label: '40代' },
        { value: '50代', label: '50代' },
        { value: '60代', label: '60代' },
        { value: 'シニア', label: 'シニア' },
      ],
    },
    {
      type: 'select',
      name: 'relationship',
      placeholder: '贈る相手',
      options: [
        { value: '家族・親戚', label: '家族・親戚' },
        { value: '仕事関係', label: '仕事関係' },
        { value: '友人・知人', label: '友人・知人' },
      ],
    },
    {
      type: 'range',
      name: 'price',
      priceRange: {
        min: 0,
        max: 22000,
        stepper: 2000,
        defaultMin: 0,
        defaultMax: 22000,
      },
      currencyText: '円',
      noLowerLimitText: '下限なし',
      noUpperLimitText: '上限なし',
      minLabel: '2,000円以下',
      maxLabel: '20,000円以上',
    },
  ],
}
