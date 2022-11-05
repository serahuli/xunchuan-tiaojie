import axios from "axios";

const defaultConfig = {
  timeout: 60 * 1000,
  baseURL: 'https://jie.xctsoft.com:8080',
  headers: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    post: {
      "Content-Type": "application/json;charset=utf-8"
    }
  }
};

const http = axios.create(defaultConfig);

http.interceptors.response.use(
  res => {
    if(res.status === 200) {
      
      if(res.config.baseURL === defaultConfig.baseURL) {
        if(res.data.code === 200) {
          return Promise.resolve(res.data.data)
        } else {
          return Promise.resolve()
        }
      } else {
        return Promise.resolve(res.data)
      }
    }
  }, 
  () => {
    return Promise.resolve()
  }
)

export const getConflictAreas = () => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: '/home/view/selectRecordByAreaToday'
    })
    .then(res => resolve(res))
    .catch(() => resolve([
      { area: "临翔区", num: 0 },
      { area: "凤庆县", num: 0 },
      { area: "双江拉祜族佤族布朗族傣族自治县", num: 0 },
      { area: "云县", num: 0 },
      { area: "沧源佤族自治县", num: 0 },
      { area: "耿马傣族佤族自治县", num: 0 },
      { area: "镇康县", num: 0 },
      { area: "永德县", num: 0 }
    ]))
  })
}

export const getMediateUsers = () => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: '/home/view/selectRecordByMediateUserTop'
    })
    .then(res => resolve(res))
    .catch(() => resolve([{}, {}, {}, {}, {}]))
  })
}

export const getHistoryByDate = () => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: '/home/view/selectRecordByDate'
    })
    .then(res => resolve(res))
    .catch(() => resolve({1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}))
  })
}

export const getMediateRecords = () => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: '/home/view/selectXctMediateRecordStat'
    })
    .then(res => resolve(res))
    .catch(() => resolve({
      "已调解": 0,
      "总调解": 0,
      "调解中": 0,
      "已完成": "0%",
      "昨日调解数量": 0
    }))
  })
}

export const getConflictTypes = () => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: '/home/view/selectXctMediateRecordType'
    })
    .then(res => resolve(res))
    .catch(() => resolve([]))
  })
}

export const getUserInfos = () => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: '/home/view/getMediateUserCount',
    })
    .then(res => resolve(res))
    .catch(() => resolve({
      jxyCount: 0,               //接线员
      mediateUserCount: 0,     //调解员
      litigantUserCOunt: 0,   //当事人
      jcyCount: 0   // 基层院
    }))
  })
}

export const getNowMediateRecord = () => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: '/home/view/getNowMediateRecord',
    })
    .then(res => resolve(res))
    .catch(() => resolve({
      recordList: [{}, {}, {}, {}, {}, {}],
      successCount: 0,
      recordCount: 0
    }))
  })
}

export const getHazardLevel = () => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: '/home/view/getMediateHazardLevel',
    })
    .then(res => resolve(res))
    .catch(() => resolve({hazardLevel: '低风险'}))
  })
}

export const getWeathers = () => {
  return new Promise((resolve) => {
    const WEATHER_ID = 'd0aac87446f549cfb17312a95421312c'
    const LOCATION = '101291101'
    http({
      method: 'get',
      url: `/v7/weather/3d?location=${LOCATION}&key=${WEATHER_ID}`,
      baseURL: 'https://devapi.qweather.com'
    })
    .then(res => resolve(res.daily[0]))
    .catch(() => resolve())
  })
}

/**
 * 子页面接口
 */
export const getHazardLevel2 = () => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: '/home/view/getMediateHazardLevel2/',
    })
    .then(res => resolve(res))
    .catch(() => resolve({hazardLevel: '低风险'}))
  })
}


export const getCountryMediateInfo = (areaName) => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: `/home/view/getMediateRecordCountByArea/${areaName}`,
    })
    .then(res => resolve(res))
    .catch(() => resolve({
      "已调解": 0,
      "总调解": 0,
      "调解中": 0,
      "已完成": "0%",
      "昨日调解数量": 0
    }))
  })
}

export const getRecordsByArea = (areaName) => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: `/home/view/selectMediatorRecordByArea/${areaName}`,
    })
    .then(res => resolve(res))
    .catch(() => resolve([]))
  })
}

export const getMediateRecordByArea = (areaName) => {
  return new Promise((resolve) => {
    http({
      method: 'post',
      url: `home/view/getMediateRecordByArea/${areaName}`,
    })
    .then(res => resolve(res))
    .catch(() => resolve([]))
  })
}