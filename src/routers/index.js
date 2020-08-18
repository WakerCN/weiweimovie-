import Vue from 'vue'
import VueRouter from 'vue-router'

import filmRouter from './film'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import adminRouter from './admin'

Vue.use(VueRouter)

const routes = [
  filmRouter,
  cinemaRouter,
  mineRouter,
  adminRouter,
  {
    path: '/detail/:filmId',
    component: () => import('@/views/Detail')
  },
  {
    path: '/*',
    redirect: '/film/nowplaying'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'weiwei',
  routes
})

export default router
