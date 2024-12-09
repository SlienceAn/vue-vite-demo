import type { MockMethod } from 'vite-plugin-mock'
import MockData from '@mock/data'
const { data } = MockData

export default {
  url: '/info',
  method: 'get',
  rawResponse: async (req, res) => {
    const token = req.headers['authorization']
    const url = new URL(`http://localhost${req.url}` as string)
    res.setHeader('Content-Type', 'application/json')
    const city = url.searchParams.get('city')
    // 判斷 token
    if (!token) {
      res.statusCode = 403
      res.end(JSON.stringify({
        success: false,
        message: '身分驗證失敗'
      }))
      return
    }

    res.statusCode = 200
    const list = data
      .filter(el => el.city === city)
      .map(el => el)
    res.end(JSON.stringify({
      success: true,
      message: '查詢成功,暫時返回五筆',
      data: list
    }))
  }
} as MockMethod