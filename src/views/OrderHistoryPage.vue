<template>
  <div class="container px-4 py-3">
    <!-- 大標題以及結帳按鈕 -->
    <div v-if="orderHistory.length" class="row mb-3">
      <h1 class="col">點餐紀錄</h1>
      <div v-if="!(paymentStatus.value === 'payOnSite' || paymentStatus.value === 'succeed')" class="col-auto">
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#paySelectModal">結帳去</button>
      </div>
      <div v-if="paymentStatus.value === 'payOnSite'" class="col-auto">
        <button type="button" class="btn btn-outline-success" disabled>現場結帳</button>
      </div>
      <div v-if="paymentStatus.value === 'succeed'" class="col-auto">
        <button type="button" class="btn btn-outline-success" disabled>已結帳</button>
      </div>
    </div>
    <!-- 還沒加入訂單的時候，的提示訊息 -->
    <div v-if="!orderHistory.length">
      <h1 class="text-center text-body-tertiary mt-4">尚未加入訂單</h1>
      <p class="text-center">
        <RouterLink to="/" title="首頁" class="text-body-tertiary">回菜單</RouterLink> /
        <RouterLink to="/cart" title="購物車頁面" class="text-body-tertiary">前往購物車</RouterLink>
      </p>
    </div>
    <PaySelectModal ref="paySelectModal" @processPayment="processPayment"></PaySelectModal>
    <PayLoadingModal ref="payLoadingModal"></PayLoadingModal>
    <div v-if="orderHistory.length">
      <h5 class="float-end lh-sm">總金額 {{ `NT$ ${totalAmount} 元` }}</h5>
      <!-- 以首次提交購物車的時間點判斷當下日期 -->
      <p class="mb-0">{{ new Date(orderHistory[0].dateTime).toLocaleDateString() }}</p>
      <p class="mb-0">桌號：{{ orderHistory[0].tableNumber.value }}</p>
      <p>
        用餐人數：{{ orderHistory[0].guestsCount.value }}位
        <RouterLink to="/" class="text-success float-end text-decoration-none">回菜單〉</RouterLink>
      </p>
    </div>
    <!-- 將每次點餐的紀錄放在手風琴的面板 -->
    <OrderAccordion v-show="orderHistory.length"></OrderAccordion>
  </div>
</template>

<script>
import PaySelectModal from '@/components/PaySelectModal.vue'
import PayLoadingModal from '@/components/PayLoadingModal.vue'
import OrderAccordion from '@/components/OrderAccordion.vue'

export default {
  inject: ['orderHistory', 'paymentStatus'],
  components: {
    PaySelectModal,
    PayLoadingModal,
    OrderAccordion
  },
  computed: {
    totalAmount () {
      let result = 0
      this.orderHistory.forEach(order => {
        result += order.cartSubtotal
      })
      return result
    }
  },
  methods: {
    processPayment (selected) {
      if (selected === 'payOnSite') {
        this.paymentStatus.value = selected
      } else if (selected === 'payWithCreditCard' || selected === 'payDigital') {
        this.paymentStatus.value = 'processing'
        this.$refs.payLoadingModal.modal.show()
        setTimeout(() => {
          const number = Math.random()
          const result = number < 0.7 ? 'succeed' : 'failed'
          this.paymentStatus.value = result
        }, 5000)
      } else {
        console.warn('沒有選擇有效付款選項。')
      }
    }
  },
  beforeRouteLeave (to, from) {
    if (document.getElementById('paySelectModal').classList.contains('show') || document.getElementById('payLoadingModal').classList.contains('show')) {
      this.$refs.paySelectModal.modal.hide()
      if (this.paymentStatus.value !== 'processing') {
        this.$refs.payLoadingModal.modal.hide()
      }
      return false
    }
  }
}
</script>

<style scoped>
.container {
  @media screen and (min-width: 1200px) {
    max-width: 960px;
  }
}
</style>
