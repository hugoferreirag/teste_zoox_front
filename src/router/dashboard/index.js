const dashboardRouter = [
  {
    path: '/',
    name: 'admin',
    redirect: { name: 'admin dashboard' },
    component: () => import('@/views/dashboard/Index.vue'),
    meta: {
      showToolbar: true,
      breadCrumb: 'Admin'
    },
    children: [
      {
        path: 'dashboard',
        name: 'admin dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        meta: {
          showToolbar: true,
          title: 'Dashboard',
          breadCrumb: 'Dashboard'
        }
      }
    ]
  }
]
export default dashboardRouter
