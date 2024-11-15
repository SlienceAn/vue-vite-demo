import { createRouter, createWebHistory } from 'vue-router'
import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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
        name: '測站分析',
        path: '/Main/StationAnalysis',
        component: () => import('../components/Main/StationAnalysis.vue')
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
  const loginStore = useLoginStore()
  const token = loginStore.token
  console.log(from)
  router.addRoute(routes_404)
  if (to.path !== '/login' && !token) {
    next({
      path: '/login'
    })
    return false
  }
  // 如果已登入但訪問登入頁，轉到首頁
  // if (to.path === '/login' && token) {
  //   next({
  //     path: '/'
  //   })
  //   return false
  // }
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