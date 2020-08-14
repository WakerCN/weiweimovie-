import Vue from 'vue'
import VueRouter from 'vue-router'

import filmRouter from './film'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(VueRouter)

const routes = [
  filmRouter,
  cinemaRouter,
  mineRouter,
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
  base: process.env.BASE_URL,
  // base: 'miaomiao',
  routes
})

export default router
