import Vue from 'vue'
import Vuex from 'vuex'
import States from './states/index'
import Cities from './cities/index'
import Auth from './auth/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    States,
    Cities,
    Auth
  }
})

export default store
