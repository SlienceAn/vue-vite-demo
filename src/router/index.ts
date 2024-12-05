import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import createPusher from '@/socket'

// 系統路由
const systemRouter: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登入'
    },
    component: () => import('../components/Login.vue'),
  },
]
// 特殊路由
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
  routes: systemRouter,

  // 滾動事件
  // scrollBehavior(to, form, savedPosition) {
  //   console.log('scroll', to)
  //   console.log('scroll', form)
  //   console.log('scroll', savedPosition)
  //   return { top: 200 }
  // }
})

router.beforeEach((to, _, next) => {
  NProgress.start()
  const userStore = useUserForm()
  const { isConnect } = storeToRefs(userStore)
  const loginStore = useLoginStore()
  const { token, data } = storeToRefs(loginStore)

  document.title = to.meta.title as string

  if (to.path === '/login') {
    createPusher.disconnect()
    removeAllRoutes()
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
      if (route.name !== '404' && route.name !== 'login' && route.name !== 'layout')
        router.removeRoute(route.name as string)
    })

    // 獲取第一個可訪問的路由
    const fristRoute = menuRoutes[0].path || '/information'

    router.addRoute({
      name: 'layout',
      path: '/',
      component: () => import('../components/Main.vue'),
      redirect: fristRoute,  // 動態設置重定向
      children: []
    })

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
// 移除全部動態路由，只剩login
function removeAllRoutes() {
  router.getRoutes().forEach(route => {
    if (route.name !== 'login') {
      router.removeRoute(route.name as string)
    }
  })
}
export default router