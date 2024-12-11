import type { MockMethod } from 'vite-plugin-mock'
import MockData from '@mock/data'
const { data = [] } = MockData ?? {}
// 依據日期展開資料
const transformData = (data) => {
  const groupedByDate = {}
  data.forEach(el => {
    el.forEach(item => {
      const { date, item: measurementType, value, unit, text } = item
      if (!groupedByDate[date]) {
        groupedByDate[date] = {
          date: date,
          measurements: {}
        }
      }
      groupedByDate[date].measurements[measurementType] = {
        value,
        unit,
        text
      }
    })
  })

  return Object.values(groupedByDate)
}
// 設備資訊
export default {
  url: '/device',
  method: 'get',
  rawResponse: async (req, res) => {
    const token = req.headers['authorization']
    const url = new URL(`http://localhost${req.url}` as string)
    const city = url.searchParams.get('city')
    const id = url.searchParams.get('id')
    const page = url.searchParams.get('page')
    const size = url.searchParams.get('size')

    const cityList = data.filter(el => el.city === city)
    // const a = cityList.find(el => el.id === id)
    // console.log('obj', a)
    const transformList = cityList[0].data.map(el => {
      return el.value.date.map((date, index) => ({
        item: el.item,
        unit: el.unit,
        text: el.text,
        date: date,
        value: el.value.value[index]
      }))
    })
    res.setHeader('Content-Type', 'application/json')
    if (!token) {
      res.statusCode = 403
      res.end(JSON.stringify({
        success: false,
        message: '身分驗證失敗'
      }))
      return
    }
    if (!id || !city || !size || !page) {
      res.statusCode = 404
      res.end(JSON.stringify({
        success: false,
        message: '參數錯誤'
      }))
      return
    }
    const startIndex = (Number(page) - 1) * Number(size) // 開始索引
    const endIndex = startIndex + Number(size) // 結束索引
    res.statusCode = 200
    res.end(JSON.stringify({
      success: true,
      message: '查詢成功',
      data: transformData(transformList).slice(startIndex, endIndex),
      page,
      size,
      total: transformData(transformList).length
    }))
  }
} as MockMethod