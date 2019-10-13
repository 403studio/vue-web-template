export default [
  {
    path: '/users',
    name: 'user-list',
    component: () => import('@/views/layout/common'),
    redirect: '/users/list',
    children: [
      {
        path: 'list',
        name: 'user-list',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表' }
      },
      {
        path: 'edit',
        name: 'user-edit',
        component: () => import('@/views/user/edit')
      }
    ]
  }
]
