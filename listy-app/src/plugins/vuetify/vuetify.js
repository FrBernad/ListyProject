import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import listyTheme from './customTheme'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {listyTheme},
  },
})
