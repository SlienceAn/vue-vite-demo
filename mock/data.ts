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
const routerList = [{
  path: '/Information',
  name: '主控台',
  icon: 'mti-Info'
},
{
  path: '/Query',
  name: '設備查詢',
  icon: 'mti-QueryStats'
},
{
  path: '/InspectionForm',
  name: '巡檢表單',
  icon: 'mti-Description'
},
{
  path: '/Setting',
  name: '帳戶管理',
  icon: 'mti-Admin'
}]
//User List
const userList = [
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

const count = 100 as const
const dayCount = 30 as const // 資料天數
const CITY = ['台北', '高雄', '台南', '屏東', '彰化'] as const
const STATUS = ['online', 'disconnect', 'abnormal'] as const
const ITEMS = [
  { item: 'TMP', unit: '˚C', text: '溫度' },
  { item: 'HUM', unit: 'RH', text: '濕度' },
  // { item: 'WS', unit: 'kn', text: '風速' },
  // { item: 'RAIN', unit: 'mm', text: '雨量' },
] as const

// 生成函數
const getRandomElement = <T>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

// 產生日期範圍
const dateRange = Array.from({ length: dayCount }, (_, i) => dayjs().add(-i, 'day').format('YYYY-MM-DD'))
// 產生測項資料
const generateItemData = () => {
  return {
    date: dateRange,
    value: Array.from({ length: dayCount },
      () => faker.number.int({ min: 0, max: 100 })),
  }
}
// 單一設備資訊
const singleDeviceData = Array.from({ length: count }, (): Data => {
  return {
    id: faker.string.uuid(),
    city: getRandomElement(CITY),
    address: location.streetAddress(),
    latitude: +faker.number.float({ min: 21.90, max: 25.30 }).toFixed(5),
    longitude: +faker.number.float({ min: 120.00, max: 122.00 }).toFixed(5),
    data: ITEMS.map(({ item, unit, text }) => ({
      item,
      unit,
      text,
      value: generateItemData()
    })),
    latestUpdate: dayjs(date.past()).format('YYYY-MM-DD HH:mm'),
    status: getRandomElement(STATUS)
  }
})
export default {
  data: singleDeviceData,
  city: CITY,
  routerList,
  userList
}