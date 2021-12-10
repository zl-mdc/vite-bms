//service统一出口
import myRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
export default new myRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
