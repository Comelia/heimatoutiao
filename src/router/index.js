// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由懒加载 解决首屏加载过慢 --当你访问那个路由，只加载这个路由需要的资源
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Welcome = () => import('@/views/welcome')
const Notfound = () => import('@/views/404')
const Article = () => import('@/views/article')
const Image = () => import('@/views/image')
const Publish = () => import('@/views/publish')
const Comment = () => import('@/views/comment')
const Fans = () => import('@/views/fans')
const Setting = () => import('@/views/setting')

Vue.use(VueRouter)

const router = new VueRouter({
  // 配置路由规则
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        // 欢迎页
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'comment', path: '/comment', component: Comment },
        { name: 'fans', path: '/fans', component: Fans },
        { name: 'setting', path: '/setting', component: Setting }
      ]
    },
    // 404页面 当路径发生改变 根据定义的路由规则顺序去匹配 走到最后发现没有对应的规则, 做404处理
    { name: '404', path: '*', component: Notfound }
  ]
})
// 每一次的跳转路由会执行这个函数
// to 目标路由对象
// from 当前路由对象
// next()放行  next('/login')拦截
// to.path 目标路径
// 前置守卫
router.beforeEach((to, from, next) => {
  // 1.路由地址 /login 放行
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('hm-toutiao')
  // 2.路由地址 不是/login 但是存储了用户信息 放行
  if (user) return next()
  // 3.路由地址 不是/login且没有存储用户信息 拦截到登录页面 /login
  next('/login')
})

// 导出router
export default router
