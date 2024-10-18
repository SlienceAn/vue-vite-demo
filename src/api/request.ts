import axios, { AxiosError, AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'


const Request = axios.create({
  baseURL: '/',
})

const responseDetail = (response: AxiosResponse) => {
  return response
}
const responseError = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status === 401) {
      ElNotification.error({
        title: '請求錯誤',
        message: '無權限或是帳號密碼錯誤'
      })
    } else if (error.response.status === 404) {
      ElNotification.error({
        title: '請求錯誤',
        message: '正在請求不存在伺服器'
      })
    }
  }
}
//攔截器
Request.interceptors.request.use()
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