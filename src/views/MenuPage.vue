<template>
  <InfoBox :dining-hours="diningHours"></InfoBox>
  <CategoryNav></CategoryNav>
  <ProductWindow ref="productModal" :mealPropped="mealProps"></ProductWindow>
  <BottomPanel></BottomPanel>
  <RouterView @selectProduct="selectProduct"></RouterView>
</template>

<script>
import CategoryNav from '@/components/menu-page/CategoryNav.vue'
import ProductWindow from '@/components/menu-page/ProductWindow.vue'
import BottomPanel from '@/components/menu-page/BottomPanel.vue'
import InfoBox from '@/components/menu-page/InfoBox.vue'

export default {
  components: {
    CategoryNav,
    ProductWindow,
    BottomPanel,
    InfoBox
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
