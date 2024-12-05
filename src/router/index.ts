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
    redirect: '/Information',
    children: []
  }
]

const routes_404: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: '404',
  meta: {
    title: '404無頁面'
  },
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
    if (to.matched.length === 0) {
      next({ ...to, replace: true })  // 重新導航，使用新的路由配置
      return
    }
  }
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


// 動態添加路由
function updateRoutes(menuRoutes: RouteRecordRaw[]) {
  try {
    router.getRoutes().forEach(route => {
      console.log('route name', route)
      if (route.name !== '404' && route.name !== 'login' && route.name !== 'layout')
        router.removeRoute(route.name as string)
    })
    console.log('移除後路由 => ', router.getRoutes())
    menuRoutes.forEach(route => {
      const { path, name, meta } = route
      router.addRoute('layout', {
        path,
        name,
        meta,
        component: importRoutes(name as string)
      })
    })

    router.addRoute(routes_404)
    console.log('當前路由 =>', router.getRoutes())
  } catch (error) {
    console.error('路由更新錯誤', error)
  }

}
// 導入路由模塊
function importRoutes(component: string) {
  try {
    const modules = import.meta.glob('../views/**/index.vue')
    const path = `../views/${component}/index.vue`

    if (!modules[path]) {
      console.warn(`找不到路由組件: ${path}`)
      return () => import('@/components/other/empty.vue')
    }

    return modules[path]
  } catch (error) {
    console.error('導入路由模組時發生錯誤:', error)
    return () => import('@/components/other/empty.vue')
  }
}

export default router