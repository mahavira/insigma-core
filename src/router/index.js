import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { BASE_URL } from '../config';

Vue.use(VueRouter);
const router = new VueRouter({
  base: BASE_URL,
  routes,
});
router.beforeResolve((to, from, next) => {
  next();
});
export default router;
