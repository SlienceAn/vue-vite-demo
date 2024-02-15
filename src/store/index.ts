import { defineStore } from 'pinia'
import { httpRequest } from '../api/api'
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
      const data = await httpRequest('/city')
      this.cityList = data.data
    },
    async getDeviceStatusList() {
      const data = await httpRequest(`/device/stauts/list?city=${this.city}`)
      this.countList = data.data
    },
    fetchCity() {
      this.city = this.cityList[0]
    }
  },
})
//登入
type loginResponse = {
  account: string,
  password: string,
  success: boolean,
  userName: string,
  message: string,
  isPremission: boolean,
  data: any
}
export const useLoginStore = defineStore('loginStore', {
  state: (): loginResponse => ({
    account: 'rd',
    password: '123',
    userName: '',
    success: false,
    data: [],
    message: '',
    isPremission: false
  }),
  actions: {
    async postLogin() {
      const data = await httpRequest('/login', { method: 'POST', data: { account: this.account, password: this.password } })
      this.data = data
      if (this.data.success) router.replace('/Main/information')
    }
  },
  persist: true
})

//設備資訊
interface informationConfig {
  isLoading: boolean
  status: string
  data: Array<any>
}
export const useInformation = defineStore('information', {
  state: (): informationConfig => ({
    isLoading: true,
    status: '',
    data: [],
  }),
  actions: {
    async getStatusData(type) {
      this.status = type
      const data = await httpRequest(`/device?status=${type}&page=1&size=20`)
      this.data = data.data
    },
  },
  getters: {}
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
