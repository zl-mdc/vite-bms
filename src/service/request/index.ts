import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
interface MyRequestInterceptors<T = AxiosResponse> {
  requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch: (error: any) => any
  responseInterceptor: (config: T) => T
  responseInterceptorCatch: (error: any) => any
}
interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors
}
class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }
  request<T>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        // config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            // res = config.interceptors?.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'get' })
  }
  post<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'post' })
  }
  delete<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'delete' })
  }
  patch<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'patch' })
  }
}
interface DateType {
  data: any
  returnCode: string
  success: boolean
}
const myrequest = new MyRequest({})
myrequest.request<DateType>({}).then((res) => {
  console.log(res.data)
  console.log(res.returnCode)
  console.log(res.success)
})
export default MyRequest
