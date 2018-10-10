import { ADD } from './types';

export default {
  [ADD]({ commit }, payload) {
    commit(ADD, payload);
  },
};
