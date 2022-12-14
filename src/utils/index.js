import lincangGEO from '@/assets/jsons/lincang.json'
import cangyuanGEO from '@/assets/jsons/cangyuan.json'
import fengqingGEO from '@/assets/jsons/fengqing.json'
import yunxianGEO from '@/assets/jsons/yunxian.json'
import gengmaGEO from '@/assets/jsons/gengma.json'
import linxiangGEO from '@/assets/jsons/linxiang.json'
import shuangjiangGEO from '@/assets/jsons/shuangjiang.json'
import yongdeGEO from '@/assets/jsons/yongde.json'
import zhenkangGEO from '@/assets/jsons/zhenkang.json'

export const mapData = {
  '凤庆': {
    map: fengqingGEO,
    key: '530921',
    name: '凤庆县'
  },
  '云县': {
    map: yunxianGEO,
    key: '530922',
    name: '云县'
  },
  '永德': {
    map: yongdeGEO,
    key: '530923',
    name: '永德县'
  },
  '耿马': {
    map: gengmaGEO,
    key: '530926',
    name: '耿马傣族佤族自治县'
  },
  '沧源': {
    map: cangyuanGEO,
    key: '530927',
    name: '沧源佤族自治县'
  },
  '镇康': {
    map: zhenkangGEO,
    key: '530924',
    name: '镇康县'
  },
  '双江': {
    map: shuangjiangGEO,
    key: '530925',
    name: '双江拉祜族佤族布朗族傣族自治县'
  },
  '临翔': {
    map: linxiangGEO,
    name: '临翔区',
    key: '530902'
  },
  '临沧市': {
    map: lincangGEO,
    key: '530900',
    name: '临沧市'
  }
}

export const geoCoordMap = {
  临翔区: [100.086486, 23.886562],
  凤庆县: [99.91871, 24.592738],
  云县: [100.125637, 24.439026],
  永德县: [99.253679, 24.028159],
  镇康县: [98.82743, 23.761415],
  双江拉祜族佤族布朗族傣族自治县: [99.824419, 23.477476],
  耿马傣族佤族自治县: [99.402495, 23.534579],
  沧源佤族自治县: [99.2474, 23.146887]
}

export const getMediate = {
  1: '邻里纠纷',
  2: '家庭纠纷',
  3: '医疗纠纷',
  4: '赔偿纠纷',
  5: '劳资纠纷',
  6: '物业纠纷',
  7: '事故纠纷',
  8: '其它纠纷'
}