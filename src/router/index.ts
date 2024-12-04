import { createRouter, createWebHistory } from 'vue-router'
import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import createPusher from '@/socket'

const routes_404 = {
  path: '/:pathMatch(.*)*',
  hidden: true,
  component: () => import('../components/other/404.vue')
}
const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('../components/Login.vue')
  },
  {
    name: 'Main',
    path: '/Main',
    component: () => import('../components/Main.vue'),
    redirect: '/main/Information',
    children: [
      {
        name: '主控台',
        path: '/Main/Information',
        component: () => import('../components/Main/Information.vue'),
        alias: ['/Main', '/']
      },
      {
        name: '設備查詢',
        path: '/Main/Query',
        component: () => import('../components/Main/Query.vue')
      },
      {
        name: '巡檢表單',
        path: '/Main/InspectionForm',
        component: () => import('../components/Main/InspectionForm.vue')
      },
      {
        name: '帳戶管理',
        path: '/Main/Setting',
        component: () => import('../components/Main/Setting.vue')
      },
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const userStore = useUserForm()
  const { isConnect } = storeToRefs(userStore)
  // const loginStore = useLoginStore()
  // const { token } = storeToRefs(loginStore)
  router.addRoute(routes_404)
  console.log(from)

  if (to.path === '/login') {
    createPusher.disconnect()
    next()
    return
  }
  console.log('isConnect=>',isConnect.value)

  if (!isConnect.value) {
    createPusher.init()
  }
  next()
})


router.afterEach(() => {
  NProgress.done()
})
router.onError((error) => {
  ElNotification.error({
    title: '路由錯誤',
    message: error.message
  })
})
export default router