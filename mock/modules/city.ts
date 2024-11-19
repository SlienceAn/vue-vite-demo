import type { MockMethod } from 'vite-plugin-mock'
import MockData from '@mock/data'

export default {
  url: '/city',
  method: 'get',
  response: () => {
    return {
      success: true,
      message: 'get city data',
      data: MockData.city
    }
  }
} as MockMethod