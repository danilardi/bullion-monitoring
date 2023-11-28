import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../views/auth/LoginView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/monitoring',
      redirect: '/monitoring/user',
      children: [
        {
          path: '/monitoring/user',
          name: 'UserMonitoring',
          component: () => import('@/views/monitoring/UserView.vue'),
        },
        {
          path: '/monitoring/fisikEmas',
          name: 'FisikEmasMonitoring',
          component: () => import('@/views/monitoring/FisikEmasView.vue'),
        },
        {
          path: '/monitoring/metalpay',
          name: 'MetalpayMonitoring',
          component: () => import('@/views/monitoring/MetalpayView.vue'),
        },
        {
          path: '/monitoring/gtm',
          name: 'GTMMonitoring',
          component: () => import('@/views/monitoring/GTMView.vue'),
        },
        {
          path: '/monitoring/ticketing',
          name: 'TicketingMonitoring',
          component: () => import('@/views/monitoring/TicketingView.vue'),
        },
        {
          path: '/monitoring/ziswaf',
          name: 'ZiswafMonitoring',
          component: () => import('@/views/monitoring/ZiswafView.vue'),
        },
      ],
    },
    // {
    //   path: "/monitoring/user",
    //   name: "monitoringUser",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/monitoring/UserView.vue"),
    // },
    // {
    //   path: '/monitoring/fisikEmas',
    //   name: 'monitoringFisikEmas',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/monitoring/FisikEmasView.vue')
    // },
    // {
    //   path: '/monitoring/metalpay',
    //   name: 'monitoringMetalpay',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/monitoring/MetalpayView.vue')
    // },
    // {
    //   path: '/monitoring/gtm',
    //   name: 'monitoringGTM',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/monitoring/GTMView.vue')
    // },
    // {
    //   path: '/monitoring/fisikEmas',
    //   name: 'monitoringFisikEmas',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/monitoring/FisikEmasView.vue')
    // }
  ]
})

export default router;
