import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueJWT from 'vuejs-jwt'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.config.productionTip = false

Vue.use(VueJWT)
Vue.use(VueMoment, { moment })

moment.tz.setDefault('Brasil/São_Paulo')
moment.locale('pt-br')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
