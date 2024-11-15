import axios, { AxiosError, AxiosResponse } from 'axios'
import { ElNotification, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
interface ErrorResponseData {
  success: boolean
  message: string
}
const Request = axios.create({
  baseURL: process.env.NODE_ENV !== 'development' ? '/api' : '/'
  // 獲取當前請求進度
  // onDownloadProgress: (progressEvent) => {
  //   console.log(progressEvent)
  // }
})
const responseDetail = (response: AxiosResponse) => {
  return response
}

const responseError = (error: AxiosError<ErrorResponseData>) => {
  if (error.response) {
    if (error.response.status === 401) {
      ElNotification.error({
        title: '請求錯誤',
        message: '無權限或是帳號密碼錯誤'
      })
    } else if (error.response.status === 403) {
      ElMessageBox.confirm(
        '當前用戶已被登出或無權限訪問當前資源，請嘗試重新登入後再操作!',
        '系統通知', {
          type: 'error',
          showCancelButton: false,
          closeOnPressEscape: false,
          confirmButtonText: '重新登入'
        }
      ).then(() => {
        const router = useRouter()
        console.log('返回登入')
        router.push('/login')
      })
    }
    else if (error.response.status === 404) {
      ElNotification.error({
        title: '請求錯誤',
        message: '正在請求不存在伺服器'
      })
    } else if (error.response.status === 429) {
      ElNotification.error({
        title: '請求錯誤',
        message: '請求次數過多，請稍後再嘗試'
      })
    }
  }
}
//攔截器-request
Request.interceptors.request.use(
  (config) => {
    const loginStore = useLoginStore()
    const token = loginStore.token
    if (token) config.headers['Authorization'] = token
    return config
  }
)
//攔截器-response
Request.interceptors.response.use(
  responseDetail,
  responseError
)
// type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'
// type HttpMethodConfig<T extends HttpMethod> = T extends 'get'
//   ? { params?: object, config?: object }
//   : { data?: object, config?: object }
// type HttpReq = {
//   [M in HttpMethod]: (url: string, ...args: HttpMethodConfig<M> extends never ? [] : [HttpMethodConfig<M>]) => Promise<unknown>
// }

interface HttpMethod {
  get: <T = unknown>(url: string, params?: object, config?: object) => Promise<T>
  post: <T = unknown>(url: string, data?: object, config?: object) => Promise<T>
  put: <T = unknown>(url: string, data?: object, config?: object) => Promise<T>
  patch: <T = unknown>(url: string, data?: object, config?: object) => Promise<T>
  delete: <T = unknown>(url: string, data?: object, config?: object) => Promise<T>
}

const httpReq: HttpMethod = {
  get: (url: string, params = {}, config = {}) => {
    return new Promise((resolve, reject) => {
      Request({
        method: 'get',
        url,
        params,
        ...config
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  post: (url: string, data = {}, config = {}) => {
    return new Promise((resolve, reject) => {
      Request({
        method: 'post',
        url,
        data,
        ...config
      }).then((response) => {
        resolve(response.data || { result: response.status, message: '保存成功' })
      }).catch((error) => {
        reject(error)
      })
    })
  },
  put: (url, data = {}, config = {}) => {
    return new Promise((resolve, reject) => {
      Request({
        method: 'put',
        url: url,
        data: data,
        ...config
      }).then((response) => {
        resolve(response.data || { result: response.status, message: '修改成功' })
      }).catch((error) => {
        reject(error)
      })
    })
  },
  patch: (url: string, data = {}, config = {}) => {
    return new Promise((resolve, reject) => {
      Request({
        method: 'patch',
        url,
        data,
        ...config
      }).then((response) => {
        resolve(response.data || { result: response.status })
      }).catch((error) => {
        reject(error)
      })
    })
  },
  delete: (url, data = {}, config = {}) => {
    return new Promise((resolve, reject) => {
      Request({
        method: 'delete',
        url: url,
        data: data,
        ...config
      }).then((response) => {
        resolve(response.data || { result: response.status, message: '刪除成功' })
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default httpReq