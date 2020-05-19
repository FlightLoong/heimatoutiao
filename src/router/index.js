import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        // 设置默认的自子路由
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        // 设置默认的自子路由
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        // 设置默认的自子路由
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        // 设置默认的自子路由
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
