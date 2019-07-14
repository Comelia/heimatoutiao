// 配置 axios
import axios from 'axios'

// 自定义配置一个axios实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
})

// 添加请求拦截器 在请求时把 token加到headers中
instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('hm-toutiao')
  // 如果 user不为空 则给请求加上 token
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
    }
  }
  // 如果为空 不增加
  return config
}, error => Promise.reject(error))

// 响应拦截器 -- 解决token值失效 验证码401时 跳转回登录页
instance.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

// 导出axios
export default instance
