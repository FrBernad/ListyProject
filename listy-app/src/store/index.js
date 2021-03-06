import Vue from 'vue'
import Vuex from 'vuex'

import pathify from "vuex-pathify";

import auth from './modules/auth/index.js';
import user from './modules/user/index.js';
import lists from './modules/lists/index.js';

Vue.use(Vuex)

const store = {
  modules: {
    user, auth, lists
  }
}

export default new Vuex.Store({
  plugins: [pathify.plugin],
  ...store
})
