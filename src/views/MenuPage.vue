<template>
  <div class="card w-75 mx-auto my-2">
    <div class="card-body">
      <p class="text-center mb-0">{{ diningHours }}</p>
    </div>
  </div>
  <CategoryNav></CategoryNav>
  <ProductWindow :mealPropped="mealProps"></ProductWindow>
  <RouterView @selectProduct="selectProduct"></RouterView>
  <div v-if="$route.fullPath === '/'" class="h2 text-center py-4 text-light" style="height: 80vh; background-color: #888;">請選擇餐點類別</div>
</template>

<script>
import CategoryNav from '@/components/CategoryNav.vue'
import ProductWindow from '@/components/ProductWindow.vue'

export default {
  components: {
    CategoryNav,
    ProductWindow
  },
  props: [
    'diningHours'
  ],
  data () {
    return {
      mealProps: {}
    }
  },
  methods: {
    selectProduct (meal) {
      this.mealProps = meal
    }
  }
}
</script>
