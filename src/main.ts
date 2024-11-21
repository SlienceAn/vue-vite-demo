// Core Vue imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Pinia (State Management)
import { createPinia } from 'pinia'
import piniaPersisted from 'pinia-plugin-persistedstate'
// Element Plus
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
// Map Components
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
// Custom Components
import Loading from './components/common/Loading.vue'
// Icons
import * as materialIcons from './assets/icons/material-icons'
// Styles
import 'uno.css'
// API and Utilities
import httpRequest from './api/request'
import dayjs from 'element-plus'
// Mock Service
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import mock from '../mock'

const app = createApp(App)
//mock運行在生產環境
if (process.env.NODE_ENV === 'production') {
  createProdMockServer(mock)
}
//掛載全局
app.config.globalProperties.$http = httpRequest
app.config.globalProperties.$day = dayjs
const pinia = createPinia()
pinia.use(piniaPersisted)
//掛載全局組件
app.component('LMap', LMap)
app.component('LTileLayer', LTileLayer)
app.component('LMarker', LMarker)
app.component('CircleLoading', Loading)
for (const icons in materialIcons) {
  app.component(`mti-${icons}`, materialIcons[icons])
}
app.use(router)
app.use(pinia)
app.use(ElementPlus)
//載入全部icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')