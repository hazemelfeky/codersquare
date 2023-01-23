import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import axios from '@/plugins/axios'
import store from '@/plugins/vuex'

Vue.config.productionTip = false

new Vue({
  axios,
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
