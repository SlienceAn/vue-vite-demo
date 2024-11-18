import { faker } from '@faker-js/faker/locale/zh_TW'
import dayjs from 'dayjs'
const { location, date } = faker

type Data = {
  id: string
  city: string
  address: string
  latitude: number
  longitude: number
  data: any
  latestUpdate: string
  status: string
  [key: string]: any
}
//Router List
export const routerList = [{
  path: '/Main/Information',
  name: '主控台',
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
},
{
  path: '/Main/StationAnalysis',
  name: '測站分析',
  icon: 'mti-TroubleShoot'
}]
//User List
export const userList = [
  {
    acc: 'pm',
    psw: '123',
    userName: 'PM',
    menu: [1, 2, 4]
  },
  {
    acc: 'rd',
    psw: '123',
    userName: 'RD',
    menu: [1, 2, 3, 4]
  },
  {
    acc: 'test',
    psw: '123',
    userName: 'Test',
    menu: [1, 2]
  },
  {
    acc: 'guest',
    psw: '123',
    userName: '訪客',
    menu: [1]
  }
]

//生成ID
// const generateID = () => {
//   const id = Math.random().toString().substring(2, 6)
//   const upperChars: string[] = []
//   for (let i = 65; i < 91; i++) {
//     upperChars.push(String.fromCharCode(i))
//   }
//   const randomChar = upperChars[Math.floor(Math.random() * 26)]
//   return randomChar + id
// }

//生成隨機狀態
const statusRandom = (): string => {
  const statusList= ['online','disconnect','abnormal']
  const code = Math.floor(Math.random() * (3 - 0))
  return statusList[code]
}
// 產生日期範圍
const dateRange = Array.from({ length: 60 }, (_, i) => dayjs().add(-i, 'day').format('YYYY-MM-DD'))
// 產生測項資料
const generateUnitData = () => {
  return {
    date: dateRange,
    value: Array.from({ length: 60 }, () => faker.number.int({ min: 0, max: 100 })),
  }
}
// 單一設備資訊
const singleDeviceData = Array.from({ length: 500 }, (): Data => {
  return {
    id: faker.string.uuid(),
    city: location.city(),
    address: location.streetAddress(),
    latitude: +faker.number.float({ min: 21.90, max: 25.30 }).toFixed(5),
    longitude: +faker.number.float({ min: 120.00, max: 122.00 }).toFixed(5),
    data: [
      { item: 'TMP', value: generateUnitData(), unit: '˚C', text: '溫度' },
      { item: 'HUM', value: generateUnitData(), unit: 'RH', text: '濕度' },
      { item: 'WS', value: generateUnitData(), unit: 'kn', text: '風速' },
      { item: 'RAIN', value: generateUnitData(), unit: 'mm', text: '雨量' },
    ],
    latestUpdate: dayjs(date.past()).format('YYYY-MM-DD HH:mm'),
    status: statusRandom()
  }
})
export default singleDeviceData