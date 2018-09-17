import { ADD, SET_KEY } from './types';

export default {
  [ADD]({ commit }, payload) {
    commit(ADD, payload);
    commit(SET_KEY, payload.key);
  },
};
