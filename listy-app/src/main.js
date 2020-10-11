import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify/vuetify'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);

Vue.config.productionTip = false
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

