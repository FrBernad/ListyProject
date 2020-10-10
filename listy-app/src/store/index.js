import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth/index.js';
import user from './modules/user/index.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user
  }
})
