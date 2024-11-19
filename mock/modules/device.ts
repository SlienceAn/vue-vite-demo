import type { MockMethod } from 'vite-plugin-mock'
import MockData from '@mock/data'
const { data } = MockData

// 設備資訊
export default {
  url: '/device',
  method: 'get',
  response: ({ query }) => {
    const { page, size, status, city } = query
    if (status) {
      const deviceData = data
        .filter(el => el['status'] === status && el['city'] === city)
        .slice(Number(size) * (Number(page) - 1), Number(size) + Number(size) * (Number(page) - 1))
      return {
        success: true,
        message: `get ${status} data`,
        data: deviceData
      }
    } else {
      return {
        success: true,
        message: 'get all data',
        data: data
          .filter(el => el['city'] === city)
          .slice(Number(size) * (Number(page) - 1), Number(size) + Number(size) * (Number(page) - 1))
      }
    }
  }
} as MockMethod