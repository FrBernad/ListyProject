import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth/index.js';
import user from '../../../../../../HCI/TP/FitnessHub/fitness-hub-app/src/store/modules/user/index.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user
  },
})
