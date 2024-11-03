<template>
  <div class="card w-75 mx-auto my-2">
    <div class="card-body">
      <p class="text-center mb-0">{{ diningHours }}</p>
    </div>
  </div>
  <CategoryNav></CategoryNav>
  <ProductWindow :mealPropped="mealProps" ref="productModal"></ProductWindow>
  <BottomPanel></BottomPanel>
  <RouterView @selectProduct="selectProduct"></RouterView>
  <div v-if="$route.fullPath === '/'" class="h2 text-center py-4 text-body-secondary" style="height: 80vh;">請選擇餐點類別</div>
</template>

<script>
import CategoryNav from '@/components/CategoryNav.vue'
import ProductWindow from '@/components/ProductWindow.vue'
import BottomPanel from '@/components/BottomPanel.vue'

export default {
  components: {
    CategoryNav,
    ProductWindow,
    BottomPanel
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
  },
  beforeRouteLeave (to, from) {
    if (document.getElementById('productModal').classList.contains('show')) {
      this.$refs.productModal.modal.hide()
      return false
    }
  }
}
</script>
