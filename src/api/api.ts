import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

export const httpRequest = (url: string, config: AxiosRequestConfig = {}) => {
    // 攔截請求
    axios.interceptors.request.use(config => {
        Object.assign(config.headers, { headers: 'headers-test-fgo' })
        // console.log("config header =>", config.headers)
        return config
    }, error => {
        return Promise.reject(error)
    })
    // 攔截回應
    axios.interceptors.response.use(response => {
        return response.data
    }, error => {
        return Promise.reject(error);
    })
    return new Promise<any>((resolve, reject) => {
        axios({
            url,
            ...config
        }).then(response => {
            resolve(response.data)
            ElMessage({
                showClose: true,
                message: 'request success',
                type: 'success'
            })
        }).catch(error => {
            reject(error)
            ElMessage({
                showClose: true,
                message: 'Error, please check !!',
                type: 'error'
            })
        })
    })
}