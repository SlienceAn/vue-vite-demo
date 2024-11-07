import { defineStore } from 'pinia'
import httpRequest from '../api/request'
import router from '../router'
//調用 $patch 方法。它允許您使用部分 “state” 物件同時應用多個更改
//調用 $reset 方法，將狀態重置到其初始值
//state推薦使用 完整類型推斷的箭頭函數

interface CountList {
  title: string
  type: string
  message: number
  icon: string
  color: string
}
interface globalStore {
  city: string
  cityList: Array<string>
  countList: Array<CountList>
}

export const useGlobalStore = defineStore('globalStore', {
  state: (): globalStore => ({
    cityList: [],
    countList: [],
    city: ''
  }),
  actions: {
    async getCity() {
      const data: any = await httpRequest.get('/city')
      await httpRequest.get('/dev/authTest')
      this.cityList = data.data
      this.city = data.data[0]
    },
    async getDeviceStatusList() {
      const data: any = await httpRequest.get(`/device/stauts/list?city=${this.city}`)
      this.countList = data.data
    },
    fetchCity() {
      this.city = this.cityList[0]
    }
  },
  persist: true
})
//登入
type loginResponse = {
  loginForm: {
    [key: string]: string
  }
  success: boolean,
  userName: string,
  message: string,
  isPremission: boolean,
  data: any,
  token: string
}
export const useLoginStore = defineStore('loginStore', {
  state: (): loginResponse => ({
    loginForm: {
      account: 'rd',
      password: '123',
    },
    userName: '',
    success: false,
    data: [],
    message: '',
    isPremission: false,
    token: ''
  }),
  actions: {
    async postLogin() {
      const data: any = await httpRequest.post('/dev/login', { ...this.loginForm })
      this.data = data
      if (data.success) {
        this.token = data.token
        router.replace('/Main/information')
      }
    }
  },
  persist: true
})

//設備資訊
interface informationConfig {
  isLoading: boolean
  status: string
  data: Array<any>
  queryList: {
    [key: string]: string
  }
}
export const useInformation = defineStore('information', {
  state: (): informationConfig => ({
    isLoading: true,
    status: '',
    data: [],
    queryList: {
      status: '',
      startDate: '',
      endDate: ''
    }
  }),
  actions: {
    //設備查詢
    async getQeryData() {
      const globalStore = useGlobalStore()
      const { city } = storeToRefs(globalStore)
      const data: any = await httpRequest.get(`/query?city=${city.value}`)
      this.data = data.data
    },
  },
})
type formConfig = {
  form: any[]
}
export const useForm = defineStore('inspectForm', {
  state: (): formConfig => ({
    form: []
  }),
  actions: {
    add(id: string, city: string, address: string) {
      this.form.push({
        id,
        city,
        address
      })
    },
  },
  persist: false
})
