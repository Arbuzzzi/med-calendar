import Vue from 'vue'
import Vuex from 'vuex'
import roomEvents from './roomEvents'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    roomEvents
  },
})
