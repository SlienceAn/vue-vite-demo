import { createProdMockServer } from 'vite-plugin-mock/client'
import MockData from '@mock/data'
const data = MockData?.data ?? []

export function setupProdMockServer() {
  createProdMockServer([
    {
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
            console.log('Info資料處理錯誤', error)
          }
        }

        res.end(JSON.stringify({
          success: true,
          message: '查詢成功',
          data: flatDataList(data)
        }))
      }
    }
  ])
}

// // import deviceMock from './modules/device'
// // import infoMock from './modules/info'
// // import loginMock from './modules/login'
// // import searchMock from './modules/search'
// // import cityMock from './modules/city'

// export async function setupProdMockServer() {
//   const modules = await Promise.all([
//     import('./modules/device'),
//     import('./modules/info'),
//     import('./modules/login'),
//     import('./modules/search'),
//     import('./modules/city')
//   ])

//   createProdMockServer(modules.map(m => m.default))
// }