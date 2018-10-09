import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './service';
import './filter';
import './directive';
import './assets/styles/index.styl';

Vue.use(ElementUI);
Vue.config.productionTip = false;
// Vue.config.errorHandler = (err, vm, info) => {
//   console.log(err, vm, info);
// };

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
