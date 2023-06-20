import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    //是否樣式重置(預設啟用)
    preflight: true,
    //屬性樣式模式
    attributify: true,
    //樣式集合
    shortcuts: {
        'center': 'flex justify-center items-center',
        'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md text-white',
        'input': 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
        'title-label': 'block text-gray-700 text-sm font-bold mb-2'
    },
    theme: {
        extend: {
            screens: {
                xs: '768px',
                sm: '768px',
                md: '992px',
                lg: '1280px',
                xl: '1920px',
            }
        }
    }
})