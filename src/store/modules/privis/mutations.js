import Vue from 'vue';
import { ADD, REMOVE, REPLACE } from './types';

export default {
  [ADD](state, payload) {
    Vue.set(state.items, payload.key, payload.value);
  },
  [REMOVE](state, payload) {
    Vue.delete(state.items, payload);
  },
  [REPLACE](state, payload) {
    Vue.set(state.items, payload.key, payload.item);
  },
};
