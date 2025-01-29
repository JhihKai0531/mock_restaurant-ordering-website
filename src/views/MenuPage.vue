<template>
  <div class="container-xl">
    <div class="row">
      <div class="col-xl-3">
        <InfoBox :dining-hours="diningHours"></InfoBox>
        <CategoryNav></CategoryNav>
      </div>
      <div class="col-xl-9">
        <FilterBar></FilterBar>
        <RouterView @selectProduct="selectProduct"></RouterView>
      </div>
    </div>
  </div>
  <ProductWindow ref="productModal" :mealPropped="mealProps"></ProductWindow>
  <BottomPanel></BottomPanel>
  <ToTopBtn></ToTopBtn>
</template>

<script>
import CategoryNav from '@/components/menu-page/CategoryNav.vue'
import ProductWindow from '@/components/menu-page/ProductWindow.vue'
import BottomPanel from '@/components/menu-page/BottomPanel.vue'
import InfoBox from '@/components/menu-page/InfoBox.vue'
import FilterBar from '@/components/menu-page/FilterBar.vue'
import ToTopBtn from '@/components/application/ToTopBtn.vue'

export default {
  components: {
    CategoryNav,
    ProductWindow,
    BottomPanel,
    InfoBox,
    FilterBar,
    ToTopBtn
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
