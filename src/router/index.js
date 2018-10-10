import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { BASE_URL } from '../config';
import store from '../store';

Vue.use(VueRouter);
const router = new VueRouter({
  base: BASE_URL,
  routes,
});

const { replace } = router;
router.replace = (location, onComplete, onAbort) => {
  if (router.currentRoute.path !== location.path) {
    router.replaceData = {
      replace: true,
      key: store.state.tabs.key,
    };
  }
  replace.call(router, location, onComplete, onAbort);
};

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
router.beforeResolve((to, from, next) => {
  next();
});
export default router;
