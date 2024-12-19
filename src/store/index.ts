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
    data: [],
    id: '',
    city: ''
  }),
  actions: {
    async getCity() {
      const data: any = await httpRequest.get('/city')
      this.data = data.data
      this.cityList = [...new Set(this.data.map((el: any) => el.city))]
      this.fetchCity()
    },
    fetchCity() {
      this.city = this.cityList[0]
    }
  },
  getters: {
    cityAddressList(state) {
      return state.data.filter(el => el.city === state.city)
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
    data: [],
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
  persist: [
    {
      key: 'token',
      paths: ['token'],
      storage: sessionStorage
    },
    {
      key: 'login',
      paths: ['loginForm', 'data', 'isLoading'],
      storage: localStorage
    }
  ]
})
//設備資訊
export const useInformation = defineStore('information', {
  state: (): Store<any>['information'] => ({
    isLoading: true,
    month: '',
    data: [],
    grids: 'four' // 版面顯示的網格數
  }),
  actions: {
    async getInfo() {
      const global = useGlobalStore()
      const { city } = storeToRefs(global)
      const data: any = await httpRequest.get(`/info?city=${city.value}&month=${this.month}`)
      if (data.success) {
        this.data = data.data
      }
    }
  },
  persist: true
})
export const useQueryStore = defineStore('queryStore', {
  state: (): Store<any>['query'] => ({
    isLoading: false,
    data: [],
    statusValue: '',
    statusList: [
      {
        value: 'disconnect',
        label: '斷線',
      },
      {
        value: 'abnormal',
        label: '連線異常',
      },
      {
        value: 'online',
        label: '連線',
      },
    ],
    form:{
      usersname:'',
      address:'',
      status:'',
      startDate:'',
      longitude:0,
      latitude:0,
      item:[]
    },
  }),
  actions: {
    async getQuery() {
      const global = useGlobalStore()
      const { city } = storeToRefs(global)
      const data: any = await httpRequest.get(`/search?city=${city.value}`)
      if (data.success) {
        this.data = data.data
      }
    }
  },
  getters: {
    filterList: (state) => {
      if (!state.statusValue) {
        return state.data
      } else {
        return state.data.filter(el => el.status === state.statusValue)
      }
    }
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

