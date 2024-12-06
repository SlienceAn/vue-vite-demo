import { defineStore } from 'pinia'
import { Store } from './type'
import httpRequest from '../api/request'
import router from '../router'
import { ElMessageBox } from 'element-plus'

//調用 $patch 方法。它允許您使用部分 “state” 物件同時應用多個更改
//調用 $reset 方法，將狀態重置到其初始值
//state推薦使用完整類型推斷的箭頭函數

export const useGlobalStore = defineStore('globalStore', {
  state: (): Store<any>['global'] => ({
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
    data: [],
    message: '',
    isPremission: false,
    token: '',
    isLoading: false
  }),
  actions: {
    async postLogin() {
      this.isLoading = true
      const data: any = await httpRequest.post('/api/login', { ...this.loginForm }).finally(() => this.isLoading = false)
      if (data.success) {
        this.data = data
        this.token = data.token
        router.replace('/')
      }
    },
  },
  persist: true
})

//設備資訊
export const useInformation = defineStore('information', {
  state: (): Store<any>['information'] => ({
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
    async getInfo() {
      const global = useGlobalStore()
      const data: any = await httpRequest.get(`/info?city=${global.city}`)
      if (data.success) {
        this.data = data.data
      }
    }
  },
  persist: true
})

export const useForm = defineStore('inspectForm', {
  state: (): Store<any>['inspect'] => ({
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
// 帳戶管理
export const useUserForm = defineStore('userForm', {
  state: () => ({
    isDialog: false,
    dialogFunc: 1, // 1是新增 , 2是編輯
    form: {
      id: 1,
      account: '',
      password: 'qwe', // 預設
      username: '',
      menu: []
    },
    data: [],
    isConnect: false // 是否連接 Pusher 服務
  }),
  actions: {
    async getAll() {
      const data: any = await httpRequest.get('/dev/user')
      if (data.success) {
        this.data = data.data
      }
    },
    async addUser() {
      const data: any = await httpRequest.post('/dev/user', this.form)
      if (data.success) console.log('新增成功')
    },
    async modifyUser() {
      const data: any = await httpRequest.put(`/dev/user/${this.form.id}`, this.form)
      if (data.success) console.log('修改成功')
    },
    async deleteUser(id) {
      ElMessageBox.confirm(
        '確定要刪除?',
        '警告',
        {
          confirmButtonText: '確認',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        const data: any = await httpRequest.delete(`/dev/user/${id}`)
        if (data.success) console.log('delete')
      })
    },
    resetForm() {
      this.form = {
        id: 1,
        account: '',
        password: 'qwe',
        username: '',
        menu: []
      }
    },
    handleSumbit() {
      this.dialogFunc === 1 ? this.addUser() : this.modifyUser()
      this.isDialog = false
    }
  },
})

