import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Auth from './middleware'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: Auth
  },
  {
    path: '/in',
    name: 'ingresos',
    component: () => import(/* webpackChunkName: "about" */ '../views/IncomesView.vue'),
    beforeEnter: Auth
  },
  {
    path: '/in/create',
    name: 'create_ingresos',
    component: () => import(/* webpackChunkName: "about" */ '../views/IncomeView.vue'),
    beforeEnter: Auth
  },
  {
    path: '/in/:id',
    name: 'create_ingresos',
    component: () => import(/* webpackChunkName: "about" */ '../views/IncomeView.vue'),
    beforeEnter: Auth
  },
  {
    path: '/out',
    name: 'movements',
    component: () => import(/* webpackChunkName: "about" */ '../views/OutsView.vue'),
    beforeEnter: Auth
  },
  {
    path: '/out/create',
    name: 'create_movement',
    component: () => import(/* webpackChunkName: "about" */ '../views/OutView.vue'),
    beforeEnter: Auth
  },
  {
    path: '/out/:id',
    name: 'create_movement',
    component: () => import(/* webpackChunkName: "about" */ '../views/OutView.vue'),
    beforeEnter: Auth
  },
  {
    path: '/inventary',
    name: 'inventary',
    component: () => import(/* webpackChunkName: "about" */ '../views/InventaryView.vue'),
    beforeEnter: Auth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes
})

export default router
