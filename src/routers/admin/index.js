export default {
  path: '/admin',
  component: () => import('@/views/Admin'),
  children: [
    {
      path: 'user',
      component: () => import('@/views/Admin/user')
    },
    {
      path: 'film',
      component: () => import('@/views/Admin/film')
    },
    {
      path: 'cinema',
      component: () => import('@/views/Admin/cinema')
    },
    {
      path: '/admin',
      redirect: '/admin/user'
    }
  ]
}
