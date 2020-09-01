import Vue from 'vue'
import Vuex from 'vuex'
import States from './states/index'
import Cities from './cities/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    States,
    Cities
  }
})

export default store
