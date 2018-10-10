import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

export const SET_ATTR = 'SET_ATTR';

Vue.use(Vuex);
const $store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
  state: {
    visibleServiceList: false,
  },
  mutations: {
    [SET_ATTR](state, payload) {
      Object.assign(state, payload);
    },
  },
  actions: {

  },
});
export default $store;
