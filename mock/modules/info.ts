import type { MockMethod } from 'vite-plugin-mock'
import MockData from '@mock/data'
const { data } = MockData

export default {
  url: '/info',
  method: 'get',
  response: ({ query }) => {
    const list = data
      .filter(el => el.city === query.city)
      .map(el => el)
    return {
      success: true,
      message: '查詢成功,暫時返回五筆',
      data: list
    }
  }
} as MockMethod