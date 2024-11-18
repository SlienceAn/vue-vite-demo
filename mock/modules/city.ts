import { MockMethod } from 'vite-plugin-mock'
import MockData from '../data'

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