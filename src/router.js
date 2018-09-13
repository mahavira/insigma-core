import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layouts/Index.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('./views/About.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
  ],
});
export default router;
