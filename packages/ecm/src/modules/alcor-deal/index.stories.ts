import { Meta } from '@storybook/html'
import { useEffect } from '@storybook/addons'
import { ECM } from '../../core'
import { generateStaticSolo } from './generator'

import {
  staticSP1columnPC2ReviewNum,
  staticSP1columnPC3ReviewNum,
  staticSP1columnPC4ReviewNum,
  staticSP1columnPC5ReviewNum,
  staticSP2columnPC2ReviewNum,
  staticSP2columnPC3ReviewNum,
  staticSP2columnPC4ReviewNum,
  staticSP2columnPC5ReviewNum,
  staticSP1columnPC2ReviewAvg,
  staticSP1columnPC3ReviewAvg,
  staticSP1columnPC4ReviewAvg,
  staticSP1columnPC5ReviewAvg,
  staticSP2columnPC2ReviewAvg,
  staticSP2columnPC3ReviewAvg,
  staticSP2columnPC4ReviewAvg,
  staticSP2columnPC5ReviewAvg,
  staticSP1columnPC2EndDate,
  staticSP1columnPC3EndDate,
  staticSP1columnPC4EndDate,
  staticSP1columnPC5EndDate,
  staticSP2columnPC2EndDate,
  staticSP2columnPC3EndDate,
  staticSP2columnPC4EndDate,
  staticSP2columnPC5EndDate,
  staticSP1columnPC2Black,
  staticSP1columnPC3Black,
  staticSP1columnPC4Black,
  staticSP1columnPC5Black,
  staticSP2columnPC2Black,
  staticSP2columnPC3Black,
  staticSP2columnPC4Black,
  staticSP2columnPC5Black,
  staticSP1columnPC2Obi,
  staticSP1columnPC3Obi,
  staticSP1columnPC4Obi,
  staticSP1columnPC5Obi,
  staticSP2columnPC2Obi,
  staticSP2columnPC3Obi,
  staticSP2columnPC4Obi,
  staticSP2columnPC5Obi,
  staticSP1columnPC2ObiBlack,
  staticSP1columnPC3ObiBlack,
  staticSP1columnPC4ObiBlack,
  staticSP1columnPC5ObiBlack,
  staticSP2columnPC2ObiBlack,
  staticSP2columnPC3ObiBlack,
  staticSP2columnPC4ObiBlack,
  staticSP2columnPC5ObiBlack,
  staticSP1columnPC2ShopLink,
  staticSP1columnPC3ShopLink,
  staticSP1columnPC4ShopLink,
  staticSP1columnPC5ShopLink,
  staticSP2columnPC2ShopLink,
  staticSP2columnPC3ShopLink,
  staticSP2columnPC4ShopLink,
  staticSP2columnPC5ShopLink,
} from './static'

import '../../core/index.scss'
import '../../core/utils.scss'
import '../../core/utils_md.scss'
import '../../core/utils_lg.scss'

const Story: Meta = {
  title: 'Modules/AlcorDeal',
  decorators: [
    (story) => {
      useEffect(() => {
        new ECM()
      })
      return story()
    },
  ],
}

export default Story

export const SoloEndDate = () => {
  return generateStaticSolo(
    {
      endDate: 'true',
      badge: 'red',
      review: 'none',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
    }
  )
}
export const SoloEndDateNoStock = () => {
  return generateStaticSolo(
    {
      endDate: 'true',
      badge: 'red',
      review: 'none',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
      'stock-flg': '0',
    }
  )
}

export const SoloReviewAvg = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'red',
      review: 'avg',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
    }
  )
}
export const SoloReviewAvgNoStock = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'red',
      review: 'avg',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
      'stock-flg': '0',
    }
  )
}

export const SoloReviewNum = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'red',
      review: 'num',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
    }
  )
}
export const SoloReviewNumNoStock = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'red',
      review: 'num',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
      'stock-flg': '0',
    }
  )
}

export const SoloReviewAvgBlack = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'black',
      review: 'avg',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
    }
  )
}
export const SoloReviewAvgBlackNoStock = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'black',
      review: 'avg',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
      'stock-flg': '0',
    }
  )
}

export const SoloReviewNumBlack = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'black',
      review: 'num',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
    }
  )
}
export const SoloReviewNumBlackNoStock = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'black',
      review: 'num',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
      'stock-flg': '0',
    }
  )
}

export const SoloReviewAvgObi = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'obi_red',
      review: 'avg',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
    }
  )
}
export const SoloReviewAvgObiNoStock = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'obi_red',
      review: 'avg',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
      'stock-flg': '0',
    }
  )
}

export const SoloReviewNumObi = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'obi_red',
      review: 'num',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
    }
  )
}
export const SoloReviewNumObiNoStock = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'obi_red',
      review: 'num',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
      'stock-flg': '0',
    }
  )
}

export const SoloReviewAvgObiBlack = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'obi_black',
      review: 'avg',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
    }
  )
}
export const SoloReviewAvgObiBlackNoStock = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'obi_black',
      review: 'avg',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
      'stock-flg': '0',
    }
  )
}

export const SoloReviewNumObiBlack = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'obi_black',
      review: 'num',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
    }
  )
}
export const SoloReviewNumObiBlackNoStock = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'obi_black',
      review: 'num',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
      'stock-flg': '0',
    }
  )
}

export const SoloHideZeroPointback = () => {
  return generateStaticSolo(
    {
      endDate: 'true',
      badge: 'red',
      review: 'none',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'false',
      hideEmptyPointback: 'true',
    },
    {
      'deal-point-rate-base': '',
    }
  )
}

export const SoloShopLink = () => {
  return generateStaticSolo(
    {
      endDate: 'false',
      badge: 'red',
      review: 'none',
      spColumn: '1',
      pcColumn: '2',
      shopLink: 'true',
      hideEmptyPointback: 'false',
    },
    {
      'deal-point-rate-base': '20',
    }
  )
}

export const SP1columnPC2ReviewNum = () => staticSP1columnPC2ReviewNum
export const SP1columnPC3ReviewNum = () => staticSP1columnPC3ReviewNum
export const SP1columnPC4ReviewNum = () => staticSP1columnPC4ReviewNum
export const SP1columnPC5ReviewNum = () => staticSP1columnPC5ReviewNum
export const SP2columnPC2ReviewNum = () => staticSP2columnPC2ReviewNum
export const SP2columnPC3ReviewNum = () => staticSP2columnPC3ReviewNum
export const SP2columnPC4ReviewNum = () => staticSP2columnPC4ReviewNum
export const SP2columnPC5ReviewNum = () => staticSP2columnPC5ReviewNum
export const SP1columnPC2ReviewAvg = () => staticSP1columnPC2ReviewAvg
export const SP1columnPC3ReviewAvg = () => staticSP1columnPC3ReviewAvg
export const SP1columnPC4ReviewAvg = () => staticSP1columnPC4ReviewAvg
export const SP1columnPC5ReviewAvg = () => staticSP1columnPC5ReviewAvg
export const SP2columnPC2ReviewAvg = () => staticSP2columnPC2ReviewAvg
export const SP2columnPC3ReviewAvg = () => staticSP2columnPC3ReviewAvg
export const SP2columnPC4ReviewAvg = () => staticSP2columnPC4ReviewAvg
export const SP2columnPC5ReviewAvg = () => staticSP2columnPC5ReviewAvg
export const SP1columnPC2EndDate = () => staticSP1columnPC2EndDate
export const SP1columnPC3EndDate = () => staticSP1columnPC3EndDate
export const SP1columnPC4EndDate = () => staticSP1columnPC4EndDate
export const SP1columnPC5EndDate = () => staticSP1columnPC5EndDate
export const SP2columnPC2EndDate = () => staticSP2columnPC2EndDate
export const SP2columnPC3EndDate = () => staticSP2columnPC3EndDate
export const SP2columnPC4EndDate = () => staticSP2columnPC4EndDate
export const SP2columnPC5EndDate = () => staticSP2columnPC5EndDate
export const SP1columnPC2Black = () => staticSP1columnPC2Black
export const SP1columnPC3Black = () => staticSP1columnPC3Black
export const SP1columnPC4Black = () => staticSP1columnPC4Black
export const SP1columnPC5Black = () => staticSP1columnPC5Black
export const SP2columnPC2Black = () => staticSP2columnPC2Black
export const SP2columnPC3Black = () => staticSP2columnPC3Black
export const SP2columnPC4Black = () => staticSP2columnPC4Black
export const SP2columnPC5Black = () => staticSP2columnPC5Black
export const SP1columnPC2Obi = () => staticSP1columnPC2Obi
export const SP1columnPC3Obi = () => staticSP1columnPC3Obi
export const SP1columnPC4Obi = () => staticSP1columnPC4Obi
export const SP1columnPC5Obi = () => staticSP1columnPC5Obi
export const SP2columnPC2Obi = () => staticSP2columnPC2Obi
export const SP2columnPC3Obi = () => staticSP2columnPC3Obi
export const SP2columnPC4Obi = () => staticSP2columnPC4Obi
export const SP2columnPC5Obi = () => staticSP2columnPC5Obi
export const SP1columnPC2ObiBlack = () => staticSP1columnPC2ObiBlack
export const SP1columnPC3ObiBlack = () => staticSP1columnPC3ObiBlack
export const SP1columnPC4ObiBlack = () => staticSP1columnPC4ObiBlack
export const SP1columnPC5ObiBlack = () => staticSP1columnPC5ObiBlack
export const SP2columnPC2ObiBlack = () => staticSP2columnPC2ObiBlack
export const SP2columnPC3ObiBlack = () => staticSP2columnPC3ObiBlack
export const SP2columnPC4ObiBlack = () => staticSP2columnPC4ObiBlack
export const SP2columnPC5ObiBlack = () => staticSP2columnPC5ObiBlack
export const SP1columnPC2ShopLink = () => staticSP1columnPC2ShopLink
export const SP1columnPC3ShopLink = () => staticSP1columnPC3ShopLink
export const SP1columnPC4ShopLink = () => staticSP1columnPC4ShopLink
export const SP1columnPC5ShopLink = () => staticSP1columnPC5ShopLink
export const SP2columnPC2ShopLink = () => staticSP2columnPC2ShopLink
export const SP2columnPC3ShopLink = () => staticSP2columnPC3ShopLink
export const SP2columnPC4ShopLink = () => staticSP2columnPC4ShopLink
export const SP2columnPC5ShopLink = () => staticSP2columnPC5ShopLink
