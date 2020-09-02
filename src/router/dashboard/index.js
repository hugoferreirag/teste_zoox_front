const dashboardRouter = [
  {
    path: '/dashboard',
    name: 'admin',
    redirect: { name: 'admin dashboard' },
    component: () => import('@/views/dashboard/Index.vue'),
    meta: {
      showToolbar: true,
      breadCrumb: 'Admin',
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'admin dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        meta: {
          showToolbar: true,
          title: 'Dashboard',
          breadCrumb: 'Dashboard',
          requiresAuth: true
        }
      }
    ]
  }
]
export default dashboardRouter
