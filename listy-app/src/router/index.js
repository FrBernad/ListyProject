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
        component: () => import('../views/LandingPage'),
        meta: {requiresUnauth: true}
      },
      {
        path: 'verifyAccount',
        name: 'verifyAccount',
        component: () => import('../views/VerifyAccount'),
        meta: {requiresUnauth: true}
      }
    ]
  },

  {
    path: '/home',
    component: () => import('../layouts/LayoutDefault'),
    children: [
      {
        path: '',
        name: 'home',
        meta: {requiresAuth: true},
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'miPerfil',
        name: 'MiPerfil ',
        meta: {requiresAuth: true},
        component: () => import('../views/MiPerfil'),
      },
      {
        path: 'destacadas',
        name: 'Destacadas',
        meta: {requiresAuth: true},
        component: () => import('../views/Destacadas')
      },
      {
        path: 'grupos',
        name: 'Grupos',
        meta: {requiresAuth: true},
        component: () => import('../views/Grupos')
      },
      {
        path: 'ayuda',
        name: 'Ayuda',
        meta: {requiresAuth: true},
        component: () => import('../views/Ayuda')
      },
      {
        path: 'createList',
        name: 'CreateList',
        meta: {requiresAuth: true},
        component: () => import('../views/CreateList')
      },
      {
        path: 'list',
        name: 'List',
        meta: {requiresAuth: true},
        component: () => import('../views/EditList'),
        props: route => ({
          listId: route.query.listId,
          share: route.query.share
        }),
      },
      {
        path: 'grupo',
        name: 'Group',
        meta: {requiresAuth: true},
        component: () => import('../views/Group'),
        props: route => ({
          groupId: route.query.groupId,
          share: route.query.share
        })
      },
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

store.dispatch('tryLogin');

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters['isAuthenticated']) {
    next('/')
  } else if (to.meta.requiresUnauth && store.getters['isAuthenticated']) {
    next('/home')
  } else {
    next()
  }
})

export default router
