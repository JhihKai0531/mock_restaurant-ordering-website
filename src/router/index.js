import { createRouter, createWebHashHistory } from 'vue-router'
import MenuPage from '@/views/MenuPage.vue'
import MealView from '@/views/MealView.vue'

const routes = [
  {
    path: '/',
    component: MenuPage,
    children: [
      {
        path: 'mealview/:category?',
        // path: ':category?',
        component: MealView,
        props: (route) => {
          console.log(route)
          return {
            category: route.params.category
          }
        }
      }
    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})
// console.log(router)

export default router
