import type { MockMethod } from 'vite-plugin-mock'
import MockData from '@mock/data'
const data = MockData?.data ?? []
export default {
  url: '/info',
  method: 'get',
  rawResponse: async (req, res) => {
    const token = req.headers['authorization']
    const url = new URL(`http://localhost${req.url}` as string)
    const city = url.searchParams.get('city')
    const month = url.searchParams.get('month') // 年月
    res.setHeader('Content-Type', 'application/json')
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
    const flatDataList = (arr) => {
      try {
        return arr
          .filter(el => el.city === city)
          .map(item => ({
            address: item.address,
            data: item.data.map(val => {
              const { value: { date, value }, ...rest } = val
              const filterDate = date.filter(i => i.includes(month))
              return {
                ...rest,
                date: filterDate,
                value: value.slice(0, filterDate.length)
              }
            })
          }))
      } catch (error) {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 500
        res.end(JSON.stringify({
          success: false,
          message: 'Info資料處理錯誤 / ' + error
        }))
        console.log('Info資料處理錯誤', error)
      }
    }

    res.end(JSON.stringify({
      success: true,
      message: '查詢成功',
      data: flatDataList(data)
    }))
  }
} as MockMethod