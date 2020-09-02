const authRouters = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/Index.vue'),
    meta: {
      showToolbar: true,
      title: 'Login',
      breadCrumb: 'Login'
    }
  }
]
export default authRouters
