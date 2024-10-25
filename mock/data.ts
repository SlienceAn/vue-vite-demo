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
//生成隨機狀態
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
//生成隨機經緯度
const generateLocation = () => {
  const lat = 21.90 + Math.random() * (25.30 - 21.90)
  const lng = 120.00 + Math.random() * (122.00 - 120.00)
  return {
    latitude: Number(lat.toFixed(6)),
    longitude: Number(lng.toFixed(6))
  }
}
const generateValue = (max: number) => {
  return Math.floor(Math.random() * max)
}
const data: Data[] = []
for (let i = 0; i < 5000; i++) {
  data.push({
    id: generateID(),
    city: location.city(),
    address: location.streetAddress(),
    ...generateLocation(),
    data: [
      { item: 'TMP', value: generateValue(100), unit: '˚C', text: '溫度' },
      { item: 'HUM', value: generateValue(100), unit: 'RH', text: '濕度' },
      { item: 'WS', value: generateValue(100), unit: 'kn', text: '風速' },
      { item: 'RAIN', value: generateValue(100), unit: 'mm', text: '雨量' },
    ],
    latestUpdate: dayjs(date.past()).format('YYYY-MM-DD HH:mm'),
    status: statusRandom()
  })
}

export default data