import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('../layouts/LayoutNoAppBar'),
    children: [
      {
        path: '',
        name: 'landingPage',
        component: () => import('../views/LandingPage')
      }
    ]
  },
  {
    path: '/:id',
    component: () => import('../layouts/LayoutDefault'),
    children: [
      {
        path: 'home',
        name: 'UserHome',
        component: () => import('../views/UserHome.vue')
      },
      {
        path: 'configuracion',
        name: 'Configuracion',
        component: () => import('../views/Configuracion')
      },
      {
        path: 'destacadas',
        name: 'Destacadas',
        component: () => import('../views/Destacadas')
      },
      {
        path: 'grupos',
        name: 'Grupos',
        component: () => import('../views/Grupos')
      },
      {
        path: 'ayuda',
        name: 'Ayuda',
        component: () => import('../views/Ayuda')
      },
      {
        path: 'createList',
        name: 'CreateList',
        component: () => import('../views/CreateList')
      }

    ]
  },
  {
    path: '*',
    redirect: '/404',
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

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated)
    next('/');
  else
    next();
})

export default router
