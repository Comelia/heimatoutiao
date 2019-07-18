import Vue from 'vue'
import App from './App.vue'

// 导入包  导入样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'

import component from '@/components'
// 导入axios
// import axios from 'axios'
// 基准路径
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// token认证 headers 头部信息
// axios.defaults.headers = {
//   Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
// }
// 导入 axios
import axios from '@/api/axios'

// 导入全局样式
import '@/styles/index.less'

Vue.use(component)
Vue.prototype.$http = axios

// 1.默认索引 文件夹下 存在index.js index.vue index.json 默认加载这些文件
// 2.在使用 vue-cli的时候 @符号在路径中作为前缀使用的时候 代表src目录

// 注册到Vue实例
Vue.use(ElementUI)

Vue.config.productionTip = false

// 职责1: 导入项目需要依赖的资源( 包 css ... )
// 职责2: 初始化根实例 new Vue() 选项 render 作用是把某一个App组件渲染在你指定的容器(.$mount('#app'))
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
