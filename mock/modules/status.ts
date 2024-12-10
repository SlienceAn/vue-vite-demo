import type { MockMethod } from 'vite-plugin-mock'
import MockData from '@mock/data'
const { data = [] } = MockData ?? {}
export default {
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
} as MockMethod