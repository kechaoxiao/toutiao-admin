import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import Article from '@/views/article'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Settings from '@/views/settings'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/Article',
        name: 'article',
        component: Article
      },
      {
        path: '/Comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/Fans',
        name: 'fans',
        component: Fans
      },
      {
        path: '/Image',
        name: 'image',
        component: Image
      },
      {
        path: '/Publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/Settings',
        name: 'settings',
        component: Settings
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫,to表示将要访问的路径，
// from表示从哪里来，next是下一个要做的操作 netx()放行  next('/login)强制跳转
router.beforeEach((to, from, next) => {
  // 允许通过
  const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(to)
  // console.log(from)
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
