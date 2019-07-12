// 配置 axios
import axios from 'axios'

const instance = axios.create({
  // 配置对象 基准路径
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  // 头部信息
  headers: {
    Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
  }
})

export default instance
