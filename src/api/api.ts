import { AxiosRequestConfig } from 'axios'
import { useAxios as x } from '@vueuse/integrations/useAxios'

// const baseURL = "http://localhost:5173";

export const useAxios = async (url: string, config: AxiosRequestConfig = {}) => {
    //攔截請求
    // axios.interceptors.request.use(config => {
    //     console.log("request =>", config)
    //     return config
    // }, error => {
    //     return Promise.reject(error)
    // })
    //攔截回應
    // axios.interceptors.response.use(response => {
    //     console.log("response =>", response.data)
    //     return response.data
    // }, error => {
    //     return Promise.reject(error);
    // })

    //初始化值
    // const state = reactive({
    //     loading: false,
    //     error: false,
    //     data: []
    // })
    const { data, isFinished, isLoading } = await x(url, config)

    return {
        data: data.value,
        isFinished: isFinished.value,
        isLoading: isLoading.value
    }
}