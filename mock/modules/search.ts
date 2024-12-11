import type { MockMethod } from 'vite-plugin-mock'
import MockData from '@mock/data'
const { data = [] } = MockData ?? {}

// 設備查詢
export default {
  url: '/search',
  method: 'get',
  rawResponse: async (req, res) => {
    const token = req.headers['authorization']
    const url = new URL(`http://localhost${req.url}` as string)
    const city = url.searchParams.get('city')

    res.setHeader('Content-Type', 'application/json')
    if (!token) {
      res.statusCode = 403
      res.end(JSON.stringify({
        success: false,
        message: '身分驗證失敗'
      }))
      return
    }
    if (!city) {
      res.statusCode = 404
      res.end(JSON.stringify({
        success:false,
        message:'參數錯誤'
      }))
    }
    const list = data.filter(el => el.city === city)
    res.statusCode = 200
    res.end(JSON.stringify({
      success: true,
      message: '查詢成功',
      data: list
    }))
  }
} as MockMethod