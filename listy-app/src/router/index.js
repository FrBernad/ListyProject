import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('../layouts/LayoutNoAppBar'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home')
      }
    ]
  },
  {
    path: '/UserHome',
    component: () => import('../layouts/LayoutDefault'),
    children: [
      {
        path: '',
        name: 'UserHome',
        component: () => import('../views/UserHome.vue')
      }
    ]
  },
  {
    path: '*',
    redirect:'/404',
    name: 'PageNotFound',
    component: () => import('../layouts/LayoutNoAppBar'),
    children: [
      {
        path: '',
        name: 'Error404',
        component: () => import('../views/Error404.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
