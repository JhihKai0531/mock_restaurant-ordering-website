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

<script setup>
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import CategoryNav from '@/components/menu-page/CategoryNav.vue'
import ProductWindow from '@/components/menu-page/ProductWindow.vue'
import BottomPanel from '@/components/menu-page/BottomPanel.vue'
import InfoBox from '@/components/menu-page/InfoBox.vue'
import FilterBar from '@/components/menu-page/FilterBar.vue'
import ToTopBtn from '@/components/application/ToTopBtn.vue'

defineProps(['diningHours'])

// 傳遞餐點資訊到Modal
const mealProps = ref({})
function selectProduct(meal) {
  mealProps.value = meal
}

// 確保Modal被關閉
const productModal = ref(null)
onBeforeRouteLeave(() => {
  if (document.getElementById('productModal').classList.contains('show')) {
    productModal.value.modalInstance.hide()
    productModal.value.clearSettings()
    return false
  }
})
</script>
