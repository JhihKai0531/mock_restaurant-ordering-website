<template>
  <div id="payLoadingModal" ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">

        <div class="modal-body text-center">
          <!-- 付款處理中 -->
          <template v-if="paymentStatus.value === 'processing'">
            <h1 class="modal-title fs-5">
              付款處理中，請稍後
            </h1>
            <p class="mb-0 text-body-tertiary">不要關閉視窗</p>
            <div class="loader"></div>
          </template>

          <!-- 付款成功 -->
          <template v-else-if="paymentStatus.value === 'succeed'">
            <h1 class="modal-title fs-4 mb-2">
              付款成功！
            </h1>
            <p class="mb-0 text-body-tertiary">此為隨機模擬結果，感謝您。</p>
            <div class="text-center mt-4">
              <button type="button" class="btn btn-outline-success w-50" data-bs-dismiss="modal">
                關閉
              </button>
            </div>
          </template>

          <!-- 付款失敗 -->
          <template v-else-if="paymentStatus.value === 'failed'">
            <h1 class="modal-title fs-4 mb-2">
              付款失敗，請再試一次。
            </h1>
            <p class="mb-0 text-body-tertiary">此為隨機模擬結果，不必擔心。</p>

            <!-- 關閉按鈕 -->
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>

            <div class="text-center mt-4">
              <button type="button" class="btn btn-outline-danger w-50" data-bs-toggle="modal" data-bs-target="#paySelectModal">
                回付款選項
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  inject: ['paymentStatus'],
  data () {
    return {
      modal: {}
    }
  },
  methods: {
    resetStatus () {
      if (this.paymentStatus.value === 'succeed') return
      this.paymentStatus.value = ''
    },
    allowToClose () {
      if (this.paymentStatus.value !== 'processing') {
        this.modal.hide()
      }
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, {
      backdrop: 'static',
      keyboard: false
    })
    this.$refs.modal.addEventListener('hide.bs.modal', this.resetStatus)
    this.$refs.modal.addEventListener('hidePrevented.bs.modal', this.allowToClose)
  },
  beforeUnmount () {
    this.modal.hide()
    this.resetStatus()
    this.$refs.modal.removeEventListener('hide.bs.modal', this.resetStatus)
    this.$refs.modal.removeEventListener('hidePrevented.bs.modal', this.allowToClose)
  }
}
</script>

<style scoped>
.modal-sm {
  max-width: 300px;
  margin-right: auto;
  margin-left: auto;
}

.btn-close {
  position: absolute;
  right: 0.25em;
  top: 0.25em;
}

/* 動畫來源：https://css-loaders.com/dots/ */
.loader {
  display: inline-block;
  margin-top: 1rem;
  width: 60px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #4a4a4a 90%, #0000);
  background:
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 50%;
  animation: loader 1.3s infinite linear;
}

@keyframes loader {
  15% {
    background-position: 0% 0%, 50% 50%, 100% 50%
  }

  30% {
    background-position: 0% 100%, 50% 0%, 100% 50%
  }

  45% {
    background-position: 0% 50%, 50% 100%, 100% 0%
  }

  60% {
    background-position: 0% 50%, 50% 50%, 100% 100%
  }
}
</style>
