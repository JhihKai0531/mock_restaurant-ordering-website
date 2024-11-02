import { createRouter, createWebHashHistory } from 'vue-router'
import MenuPage from '@/views/MenuPage.vue'
import MealView from '@/views/MealView.vue'

const routes = [
  {
    path: '/',
    component: MenuPage,
    redirect: '/Beef',
    children: [
      {
        path: ':category?',
        component: MealView,
        props: (route) => {
          // console.log('路由狀態：', route)
          return {
            category: route.params.category
          }
        }
      }
    ]
  },
  {
    path: '/cart',
    component: () => import('../views/CartPage.vue')
  },
  {
    path: '/order-history',
    component: () => import('../views/OrderHistoryPage.vue')
  },
  {
    path: '/about-us',
    component: () => import('../views/AboutUsPage.vue')
  },
  {
    path: '/contact-us',
    component: () => import('../views/ContactUsPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})
// console.log(router)

export default router
