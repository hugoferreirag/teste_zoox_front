import Vue from 'vue'
import Router from 'vue-router'
import LoginValidate from '../config/validateAuth'
import dashboard from './dashboard'
import login from './login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    ...dashboard,
    ...login
  ]
})
router.beforeEach((to, from, next) => {
  const getToken = localStorage.TOKEN ? localStorage.TOKEN : null
  const token = Vue.$jwt.decode(getToken)
  const loginValidate = new LoginValidate(to, from, token)
  document.title = to.meta.title ? `${to.meta.title}` : 'Dashboard'
  next(loginValidate.validateToken())
})

export default router
