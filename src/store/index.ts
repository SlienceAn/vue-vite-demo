import { defineStore } from 'pinia'
import { Store } from './type'
import httpRequest from '../api/request'
import router from '../router'
import { ElMessageBox } from 'element-plus'
// import { Application, Graphics, Sprite, Assets } from 'pixi.js'

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
      const data: any = await httpRequest.post('/dev/login', { ...this.loginForm }).finally(() => this.isLoading = false)
      if (data.success) {
        this.data = data
        this.token = data.token
        router.replace('/')
      }
    },
    async loginOut() {
      this.isLoading = true
      const data: any = await httpRequest.post('/dev/loginOut').finally(() => this.isLoading = false)
      if (data.success) {
        console.log('login out!!!')
      }
    }
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
    form: {
      usersname: '',
      address: '',
      status: '',
      startDate: '',
      longitude: 0,
      latitude: 0,
      item: []
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
// Pixi API
// export const usePixi = defineStore('pixiPlace', {
//   state: () => ({

//   }),
//   actions: {
//     async initPixi(element: HTMLElement) {
//       let app: Application | null = null
//       const width = element.clientWidth
//       const height = element.clientHeight
//       app = new Application()
//       await app.init({
//         width,
//         height,
//         backgroundColor: 0xffffff,
//         resolution: window.devicePixelRatio || 1, // 設置解析度
//         autoDensity: true,  // 啟用自動密度調整
//         eventMode: 'static',
//       })
//       element.appendChild(app.canvas)

//       const grid = this.drawGrid(new Graphics(), width, height).stroke({ color: 0xE6E6E6, width: 1, alpha: 1 })
//       grid.zIndex = -1
//       app.stage.addChild(grid)
//     },
//     // 創建網格的函數
//     drawGrid(graphics: Graphics, width: number, height: number): Graphics {
//       // 定義網格單元格的大小（像素）
//       const cellSize = 30

//       graphics.clear()
//       graphics.eventMode = 'static'
//       graphics.cursor = 'pointer'
//       // 繪製垂直線
//       for (let x = 0; x <= width; x += cellSize) {
//         graphics
//           .moveTo(x, 0)
//           .lineTo(x, height)
//       }
//       // 繪製水平線
//       for (let y = 0; y <= height; y += cellSize) {
//         graphics
//           .moveTo(0, y)
//           .lineTo(width, y)
//       }
//       return graphics
//     },
//     // 繪製平面圖
//     async drawPlace() {

//       const place = await Assets.load('/placeImg2.webp')
//       const sprite = Sprite.from(place)

//       sprite.interactive = true
//       sprite.scale.set(0.3)
//       sprite.anchor.set(0.5)
//       sprite.x = app!.screen.width / 2
//       sprite.y = app!.screen.height / 2
//       console.log(sprite.width, sprite.height)

//       for (let i = 0; i < 5; i++) {
//         // 新增可拖曳圓點
//         sprite.addChild(createDot((i + 1).toString()))
//       }
//       return sprite
//     }
//   }
// })

