import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/AppLayout.vue'),
    redirect: '/menu',
    children: [
      {
        path: 'menu',
        component: () => import('../views/MenuPage.vue'),
        // 不設定 redirect，由 MealView 的 watchEffect 動態導向第一個分類
        children: [
          {
            path: ':category?',
            component: () => import('../views/MealView.vue'),
            props: (route) => {
              // console.log('路由狀態：', route)
              return {
                category: route.params.category,
              }
            },
          },
        ],
      },
      {
        path: 'cart',
        component: () => import('../views/CartPage.vue'),
      },
      {
        path: 'order-history',
        component: () => import('../views/OrderHistoryPage.vue'),
      },
      {
        path: 'about-us',
        component: () => import('../views/AboutUsPage.vue'),
      },
      {
        path: ':pathMatch(.*)*',
        name: 'notFound',
        component: () => import('../views/NotFoundPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
})
// console.log(router)

export default router
