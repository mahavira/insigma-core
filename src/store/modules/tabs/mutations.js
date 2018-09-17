import Vue from 'vue';
import { ADD, REMOVE, REPLACE, SET_KEY } from './types';

export default {
  [ADD](state, payload) {
    Vue.set(state.items, payload.key, payload.item);
  },
  [REMOVE](state, payload) {
    Vue.delete(state.items, payload);
  },
  [REPLACE](state, payload) {
    Vue.delete(state.items, payload.oldKey);
    Vue.set(state.items, payload.key, payload.item);
  },
  [SET_KEY](state, payload) {
    state.key = payload;
  },
};
