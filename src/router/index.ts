import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [
    {
        name: "login",
        path: "/",
        component: () => import('../components/Login.vue')
    },
    {
        name: "Main",
        path: "/Main",
        component: () => import('../components/Main.vue'),
        children: [
            {
                name: "設備資訊",
                path: "/Main/Information",
                component: () => import('../components/Main/Information.vue')
            },
            {
                name: "設備查詢",
                path: "/Main/Query",
                component: () => import('../components/Main/Query.vue')
            },
            {
                name: "巡檢表單",
                path: "/Main/InspectionForm",
                component: () => import('../components/Main/InspectionForm.vue')
            }
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(()=>{
    NProgress.start()
})
router.afterEach(()=>{
    NProgress.done()
})
export default router