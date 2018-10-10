import Vue from 'vue';

Vue.directive('privi', {
  bind(el, binding) {
    console.log(binding, el);
    el.style.display = 'none';
  },
});
