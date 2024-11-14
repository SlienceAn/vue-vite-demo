import { defineStore } from 'pinia'
import { Store } from './type'
import httpRequest from '../api/request'
import router from '../router'
//調用 $patch 方法。它允許您使用部分 “state” 物件同時應用多個更改
//調用 $reset 方法，將狀態重置到其初始值
//state推薦使用完整類型推斷的箭頭函數
export const useGlobalStore = defineStore('globalStore', {
  state: (): Store['global'] => ({
    menuCollapse: false,
    cityList: [],
    countList: [],
    city: ''
  }),
  actions: {
    async getCity() {
      const data: any = await httpRequest.get('/city')
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
export const useLoginStore = defineStore('loginStore', {
  state: (): Store<{
    success: boolean,
    message: string,
    token?: string,
    isPremission?: boolean,
    usersname?: string,
    menu?: any[]
  }>['login'] => ({
    loginForm: {
      account: 'rd',
      password: '123',
    },
    userName: '',
    success: false,
    data: null,
    message: '',
    isPremission: false,
    token: ''
  }),
  actions: {
    async postLogin() {
      const data: any = await httpRequest.post('/api/login', { ...this.loginForm })
      if (data.success) {
        this.data = data
        this.token = data.token
        router.replace('/Main/information')
      }
    },
  },
  persist: true
})

//設備資訊
export const useInformation = defineStore('information', {
  state: (): Store['information'] => ({
    isLoading: true,
    status: '',
    data: null,
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

export const useForm = defineStore('inspectForm', {
  state: (): Store['inspect'] => ({
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
