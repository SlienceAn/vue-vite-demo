import type { MockMethod } from 'vite-plugin-mock'
import MockData from '@mock/data'
const { data = [] } = MockData ?? {}

// 返回所有城市的設備id與位址
export default {
  url: '/city',
  method: 'get',
  rawResponse: async (req, res) => {
    const list = data.map(el => ({
      id: el.id,
      city: el.city,
      address: el.address
    }))
    const token = req.headers['authorization']
    res.setHeader('Content-Type', 'application/json')
    if (!token) {
      res.statusCode = 403
      res.end(JSON.stringify({
        success: false,
        message: '身分驗證失敗'
      }))
      return
    }
    res.end(JSON.stringify({
      success: true,
      message: 'get city data',
      data: list
    }))
  }
} as MockMethod