<template>
  <button
    id="toTopBtn"
    type="button"
    class="btn btn-butter-cream rounded-circle fs-4"
    :style="{ display: btnDisplay }"
    @click="goToTop"
  >
    <i class="bi bi-arrow-up"></i>
  </button>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'

const btnDisplay = ref('none')

function toggleDisplay() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btnDisplay.value = ''
  } else {
    btnDisplay.value = 'none'
  }
}

function goToTop() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

window.addEventListener('scroll', toggleDisplay)

onUnmounted(() => {
  window.removeEventListener('scroll', toggleDisplay)
})
</script>

<style scoped>
button {
  position: fixed;
  bottom: var(--reserve-space-panel, 20px);
  right: 20px;
  z-index: 30;
}
</style>
