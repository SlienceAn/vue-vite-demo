import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import createPusher from '@/socket'

const systemRouter: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('../components/Login.vue'),
    meta: {
      title: '登入'
    }
  },
  {
    name: 'layout',
    path: '/',
    component: () => import('../components/Main.vue'),
    redirect: '/information',
    children: []
  }
]

const routes_404: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  component: () => import('../components/other/404.vue')
}

const router = createRouter({
  history: createWebHistory(),
  routes: systemRouter
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const userStore = useUserForm()
  const { isConnect } = storeToRefs(userStore)
  const loginStore = useLoginStore()
  const { token, data } = storeToRefs(loginStore)
  console.log(from)

  if (to.path === '/login') {
    createPusher.disconnect()
    next()
    return
  }

  if (!token.value) {
    next({
      path: '/login'
    })
    return false
  }

  if (data.value.menu && data.value.menu.length > 0) {
    updateRoutes(data.value.menu)
    console.log('to', to)
    if (to.matched.length === 0) {
      next({ ...to, replace: true })  // 重新導航，使用新的路由配置
      return
    }
  }
  console.log('to matched', to.matched)
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

function updateRoutes(menuRoutes: RouteRecordRaw[]) {
  router.getRoutes().forEach(route => {
    if (route.name !== 'login' && route.name !== 'layout')
      router.removeRoute(route.name as string)
  })
  menuRoutes.forEach(route => {
    router.addRoute('layout', route)
  })

  // router.addRoute('layout', {
  //   path: 'c',
  //   name: 'c',
  //   redirect: undefined,
  //   children: []
  // })
  // 添加錯誤路由
  router.addRoute(routes_404)

  console.log('更新後路由', router.getRoutes())
}

export default router