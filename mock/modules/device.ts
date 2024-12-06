import type { MockMethod } from 'vite-plugin-mock'
import MockData from '@mock/data'
const { data } = MockData

// 設備資訊
export default {
  url: '/device',
  method: 'get',
  response: ({ query }) => {
    const { city } = query
    const cityList = data.filter(el => el.city === city)
    console.log(city)
    console.log('city', cityList[0].data)
    const final = [
      {
        date: '2022-10-19',
        tmpValue: 29,
        humValue: 30
      },
      {
        date: '2022-10-29',
        tmpValue: 29,
        humValue: 30
      },
      {
        date: '2022-10-29',
        tmpValue: 29,
        humValue: 30
      },
      {
        date: '2022-10-29',
        tmpValue: 29,
        humValue: 30
      },
      {
        date: '2022-10-29',
        tmpValue: 29,
        humValue: 30
      },
      {
        date: '2022-10-29',
        tmpValue: 29,
        humValue: 30
      }
    ]
    return {
      success: true,
      message: '查詢成功',
      data: final
    }
    // if (status) {
    //   const deviceData = data
    //     .filter(el => el['status'] === status && el['city'] === city)
    //     .slice(Number(size) * (Number(page) - 1), Number(size) + Number(size) * (Number(page) - 1))
    //   return {
    //     success: true,
    //     message: '查詢成功',
    //     data: deviceData
    //   }
    // } else {
    //   return {
    //     success: true,
    //     message: 'get all data',
    //     data: data
    //       .filter(el => el['city'] === city)
    //       .slice(Number(size) * (Number(page) - 1), Number(size) + Number(size) * (Number(page) - 1))
    //   }
    // }
  }
} as MockMethod