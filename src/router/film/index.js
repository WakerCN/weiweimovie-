import cityRouter from './city'
import nowplayingRouter from './nowplaying'
import comingsoonRouter from './comingsoon'
import searchRouter from './search'

export default {
  path: '/film',
  component: () => import('@/views/Film'),
  children: [
    cityRouter,
    nowplayingRouter,
    comingsoonRouter,
    searchRouter,
    {
      path: '/film',
      redirect: '/film/nowplaying'
    }
  ]
}
