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
        component: () => import('../views/Home.vue')
      },
      {
        path: 'configuracion',
        name: 'Configuracion',
        meta: {requiresAuth: true},
        component: () => import('../views/Configuracion'),

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

router.beforeEach(function (to, from, next) {
  console.log(to);
  console.log(from);
  console.log(store.getters);
  console.log("is auth "+store.getters["auth/isAuthenticated"])
  if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
    console.log("redirected to landing page")
    next('/');
  } else if (to.meta.requiresUnauth && store.getters["auth/isAuthenticated"]) {
    console.log("redirected to home");
    console.log(to.meta.requiresUnauth);
    next('/home');
  } else {
    console.log("nexting")
    next();
  }
});

export default router
