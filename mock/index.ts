import { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker/locale/zh_TW'
import dayjs from 'dayjs'
const { location, date } = faker
type Data = {
  id: string
  city: string
  address: string
  latitude: number
  longitude: number
  value: any
  latestUpdate: string
  status: string
}
interface query {
  status?: string
  city?: string
  page: number
  size: number
}
interface device {
  query: query
}
//生成ID
const generateID = () => {
  const id = Math.random().toString().substring(2, 6)
  const upperChars: string[] = []
  for (let i = 65; i < 91; i++) {
    upperChars.push(String.fromCharCode(i))
  }
  const randomChar = upperChars[Math.floor(Math.random() * 26)]
  return randomChar + id
}
const statusRandom = (): string => {
  const code = Math.floor(Math.random() * (3 - 0))
  let status = ''
  switch (code) {
  case 0:
    status = 'online'
    break
  case 1:
    status = 'disconnect'
    break
  case 2:
    status = 'abnormal'
    break
  }
  return status
}
//All Fake Data
const data: Data[] = []
for (let i = 0; i < 1000; i++) {
  data.push({
    id: generateID(),
    city: location.city(),
    address: location.streetAddress(),
    latitude: 22.11,
    longitude: 120.22,
    value: {
      TMP: Math.floor(Math.random() * 100),
      HUM: Math.floor(Math.random() * 100),
      PM25: Math.floor(Math.random() * 100)
    },
    latestUpdate: dayjs(date.past()).format('YYYY-MM-DD HH:mm'),
    status: statusRandom()
  })
}
export default [
  {
    //登入
    url: '/login',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody: any = ''
      let data
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      const { account: acc, password: psw } = JSON.parse(reqbody)
      //PM...只能讀取
      if (acc === 'pm' && psw === '123') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        data = {
          success: true,
          userName: 'PM',
          isPremission: false,
          message: 'PM Login Success !',
          data: [{
            path: '/Main/Information',
            name: '設備資訊',
            icon: 'mti-Info'
          },
          {
            path: '/Main/Query',
            name: '設備查詢',
            icon: 'mti-QueryStats'
          }]
        }
        res.end(`${JSON.stringify(data)}`, 'utf-8')
        //RD...可以修改資料
      } else if (acc === 'rd' && psw === '123') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        data = {
          success: true,
          userName: 'RD',
          isPremission: true,
          message: 'PM Login Success !',
          data: [{
            path: '/Main/Information',
            name: '設備資訊',
            icon: 'mti-Info'
          },
          {
            path: '/Main/Query',
            name: '設備查詢',
            icon: 'mti-QueryStats'
          },
          {
            path: '/Main/InspectionForm',
            name: '巡檢表單',
            icon: 'mti-Description'
          }]
        }
        res.end(`${JSON.stringify(data)}`, 'utf-8')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        data = {
          success: false,
          message: 'Login failed'
        }
        res.end(`${JSON.stringify(data)}`, 'utf-8')
      }
    }
  },
  {
    url: '/device/stauts/list',
    method: 'get',
    response: ({ query }: any) => {
      const { city } = query
      const countList = [
        {
          title: '總機台數量',
          type: '',
          message: data.filter(el => el['city'] === city).length,
          icon: 'InfoFilled',
          color: 'info',
        },
        {
          title: '已連線',
          type: 'online',
          message: data.filter(el => el['status'] === 'online' && el['city'] === city).length,
          icon: 'SuccessFilled',
          color: 'green'
        },
        {
          title: '連線異常',
          type: 'abnormal',
          message: data.filter(el => el['status'] === 'abnormal' && el['city'] === city).length,
          icon: 'WarningFilled',
          color: 'orange',
        },
        {
          title: '已斷線',
          type: 'disconnect',
          message: data.filter(el => el['status'] === 'disconnect' && el['city'] === city).length,
          icon: 'CircleCloseFilled',
          color: 'red',
        }
      ]
      return {
        success: true,
        message: 'get  status',
        data: countList
      }
    }
  },
  {
    url: '/city',
    method: 'get',
    response: () => {
      return {
        success: true,
        message: 'get city data',
        data: Array.from(new Set(data.map(el => el.city))).slice(0, 10)
      }
    }
  },
  {
    //設備資訊
    url: '/device',
    method: 'get',
    response: ({ query }: device) => {
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
  },
  {
    //查詢分類
    url: '/query',
    method: 'get',
    response: ({ query }: any) => {
      const { type } = query
      if (type === 'equipment') {
        let { city } = query
        city = city.replace('台', '臺')
        return {
          success: true,
          message: 'Get success!',
          data: data.filter(el => el.city.includes(city))
        }
      } else if (type === 'event') {
        const { startTime, endTime, status } = query
        const result: any[] = []
        for (const key of data) {
          if (new Date(key.latestUpdate) <= new Date(endTime) &&
            new Date(key.latestUpdate) >= new Date(startTime) &&
            key.status === status
          ) {
            result.push({
              id: key.id,
              city: key.city,
              address: key.address,
              latestUpdate: key.latestUpdate
            })
          }
        }
        result.sort((start, end) => {
          // TypeScript 中，當您使用運算符（算術運算符、比較運算符等）並且運算符左側屬於意外類型時，就會發生這種情況
          return new Date(start.latestUpdate).getTime() - new Date(end.latestUpdate).getTime()
        })
        return {
          success: true,
          message: 'Get success!',
          data: result
        }
      } else {
        return {
          success: false,
          message: 'Get failed...'
        }
      }
    }
  },
  {
    //修改測值(初版)
    url: '/modify/value',
    method: 'get',
    response: ({ query }: any) => {
      console.log(query)
      const { id, TMP, HUM, PM25 } = query
      data.forEach(el => {
        if (el.id === id) {
          el.value['TMP'] = TMP
          el.value['HUM'] = HUM
          el.value['PM25'] = PM25
        }
      })
      return {
        success: true,
        message: 'value modify success'
      }
    }
  },
  {
    //巡檢表單
    url: '/modify',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody: any = ''
      let postData: any[] = []
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      postData = JSON.parse(reqbody)
      //表單資料
      postData.forEach(el => {
        data.forEach(list => {
          if (list.id === el.id) {
            list.city = el.city
            list.address = el.address
            list.latestUpdate = el.latestUpdate
            list.status = el.status
          }
        })
      })
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end('success', 'utf-8')
    }
  },
] as MockMethod[]