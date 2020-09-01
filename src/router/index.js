import Vue from 'vue'
import Router from 'vue-router'
import dashboard from './dashboard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    ...dashboard
  ]
})

export default router
