import Layout from '@/layouts/Index.vue';

export default [
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
        children: [
          {
            path: '/dashboard/post/:id',
            name: 'postitem',
            component: () => import('../views/PostItem.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
];
