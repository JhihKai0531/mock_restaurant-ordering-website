<template>
  <div id="paySelectModal" ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <!-- Modal的內容主體 -->
        <div class="modal-header d-block text-center border-bottom-0">
          <h1 class="modal-title fs-5">請點選付款方式並確認</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body text-center">
          <!-- 以網格系統裝著不同選項的checkbox -->
          <div class="row row-cols-2 gy-3 p-3">
            <div v-for="payment in paymentMethods" :key="payment.value" class="col">
              <input :id="payment.value"
                v-model="paymentSelected"
                type="radio"
                class="btn-check"
                :value="payment.value"
              >
              <label class="btn btn-outline-success" :for="payment.value">
                <p>{{ payment.name }}</p>
                <img :src="payment.imgURL"
                  :alt="payment.name"
                  width="50"
                  height="50"
                  class="img-fluid w-75"
                >
              </label>
            </div>
          </div>

          <button type="button" class="btn btn-6A041D w-25" :disabled="!paymentSelected" @click="confirmOption">
            確定
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import counter from '@/assets/counter.png' // 來源：https://www.flaticon.com/free-icon/counter_3492385?term=counter&related_id=3492385
import credit from '@/assets/credit.png' // 來源：https://www.flaticon.com/free-icon/credit_1198299
import creditCard from '@/assets/credit-card.png' // 來源：https://www.flaticon.com/free-icon/credit-card_4117864?term=digital+payment&related_id=4117864

export default {
  data () {
    return {
      modal: {},
      paymentSelected: '',
      paymentMethods: [
        { name: '現場付款', value: 'payOnSite', imgURL: counter },
        { name: '線上刷卡', value: 'payWithCreditCard', imgURL: credit },
        { name: '行動支付', value: 'payDigital', imgURL: creditCard }
      ]
    }
  },
  methods: {
    dismiss () {
      this.paymentSelected = ''
    },
    confirmOption () {
      this.$emit('processPayment', this.paymentSelected)
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
    this.$refs.modal.addEventListener('hide.bs.modal', this.dismiss)
  },
  beforeUnmount () {
    this.modal.hide()
    this.$refs.modal.removeEventListener('hide.bs.modal', this.dismiss)
  }
}
</script>

<style scoped>
.btn-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
</style>
