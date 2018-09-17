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
          keepAlive: false,
        },
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/dashboard/about/:id',
        name: 'about',
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
function original(data) {
  return data.map((route) => {
    if (!route.meta) route.meta = {};
    route.meta.original = route.path;
    if (route.children && route.children.length) route.children = original(route.children);
    return route;
  });
}
const routes = original(routeList);
export default routes;
