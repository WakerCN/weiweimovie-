export default {
  path: '/mine',
  component: () => import('@/views/Mine'),
  children: [
    {
      path: 'center',
      component: () => import('../../views/Mine/Center')
    },
    {
      path: 'login',
      component: () => import('../../views/Mine/Login')
    },
    {
      path: 'register',
      component: () => import('../../views/Mine/Register')
    },
    {
      path: 'findPassword',
      component: () => import('../../views/Mine/FindPassword')
    },
    {
      path: '/mine',
      redirect: 'center'
    }
  ]
}
