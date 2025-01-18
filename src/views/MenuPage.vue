<template>
  <div class="card w-75 mx-auto my-2">
    <div class="card-body">
      <p class="text-center mb-0">
        <span>{{ diningHours[0] }}</span>
        <span class="text-warning-emphasis"><br>{{ diningHours[1] }}</span>
      </p>
    </div>
  </div>
  <CategoryNav></CategoryNav>
  <ProductWindow ref="productModal" :mealPropped="mealProps"></ProductWindow>
  <BottomPanel></BottomPanel>
  <RouterView @selectProduct="selectProduct"></RouterView>
</template>

<script>
import CategoryNav from '@/components/menu-page/CategoryNav.vue'
import ProductWindow from '@/components/menu-page/ProductWindow.vue'
import BottomPanel from '@/components/menu-page/BottomPanel.vue'

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
      this.$refs.productModal.clearProductSettings()
      return false
    }
  }
}
</script>
