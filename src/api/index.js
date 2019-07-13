// 配置 axios
import axios from 'axios'

const instance = axios.create({
  // 配置对象 基准路径
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // 头部信息
  // headers: {
  //   Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
  // }
})

// 请求拦截
instance.interceptors.request.use(config => {
  // 给头部加上认证信息
  const user = window.sessionStorage.getItem('hm-toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器 token用于访问需要身份认证的普通接口 有效期2小时
// 做的事情 : 在后端响应之后(是失败的时候去做,任何接口请求失败的时候)
// 步骤: 1.获取错误状态码
// 2.如果是401代码 跳转去登录页面
// 3.重新登录 获取有效的token

// 响应拦截器
instance.interceptors.response.use(response => response, error => {
  console.log(error)
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
