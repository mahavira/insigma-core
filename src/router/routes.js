import Layout from '@/layouts/Index.vue';

const routeList = [
  {
    path: '/dashboard',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'home',
        meta: {
          title: '首页',
          keepAlive: false,
        },
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/dashboard/about/:id',
        name: 'about',
        meta: {
          title: '关于我',
          keepAlive: false,
        },
        component: () => import('../views/About.vue'),
      },
      {
        path: '/dashboard/post',
        name: 'post',
        component: () => import('../views/Post.vue'),
        children: [{
          path: '/dashboard/post/:id',
          name: 'postitem',
          component: () => import('../views/PostItem.vue'),
        }],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
];
function meta(data) {
  return data.map((route) => {
    if (!route.meta) route.meta = {};
    route.meta.original = route.path;
    if (route.children && route.children.length) route.children = meta(route.children);
    return route;
  });
}
const routes = meta(routeList);
export default routes;
