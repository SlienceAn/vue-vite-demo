import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    //樣式集合
    shortcuts: {
        'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',//demo
        'btn-green': 'text-white bg-green-500 hover:bg-green-700'//demo
    },
    //是否樣式重置(預設啟用)
    preflight: true,
    //屬性樣式模式
    attributify:true
})