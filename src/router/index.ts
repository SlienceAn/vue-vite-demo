import { createRouter, createWebHistory } from 'vue-router'
import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes_404 = {
  path: '/:pathMatch(.*)*',
  hidden: true,
  component: () => import('../components/404.vue')
}

const routes = [
  {
    name: 'login',
    path: '/',
    component: () => import('../components/Login.vue')
  },
  {
    name: 'Main',
    path: '/Main',
    component: () => import('../components/Main.vue'),
    children: [
      {
        name: '主控台',
        path: '/Main/Information',
        component: () => import('../components/Main/Information.vue')
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

router.beforeEach(() => {
  NProgress.start()
  router.addRoute(routes_404)
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