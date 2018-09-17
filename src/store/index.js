import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);
const $store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
  state: {
  },
  mutations: {

  },
  actions: {

  },
});
export default $store;
