import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        name: "login",
        path: "/",
        component: () => import('@components/Login.vue')
    },
    {
        name: "Main",
        path: "/Main",
        component: () => import('@components/Main.vue'),
        children: [
            {
                name: "Demo-1",
                path: "/Main/Demo-1",
                component: () => import('@components/Main/Demo-1.vue')
            },
            {
                name: "Demo-2",
                path: "/Main/Demo-2",
                component: () => import('@components/Main/Demo-2.vue')
            },
            {
                name: "Demo-3",
                path: "/Main/Demo-3",
                component: () => import('@components/Main/Demo-3.vue')
            }
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router