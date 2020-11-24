import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify/vuetify'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(Vuelidate);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

