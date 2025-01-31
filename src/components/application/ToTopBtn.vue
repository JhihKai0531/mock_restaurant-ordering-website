<template>
  <button type="button" class="btn btn-butter-cream rounded-circle fs-4" :style="{display: btnDisplay}" @click="goToTop">
    <i class="bi bi-arrow-up"></i>
  </button>
</template>

<script>
export default {
  data () {
    return {
      btnDisplay: 'none'
    }
  },
  methods: {
    toggleDisplay () {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.btnDisplay = ''
      } else {
        this.btnDisplay = 'none'
      }
    },
    goToTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    window.addEventListener('scroll', this.toggleDisplay)
  },
  unmounted () {
    window.removeEventListener('scroll', this.toggleDisplay)
  }
}
</script>

<style scoped>
button {
  position: fixed;
  bottom: 60px;
  right: 20px;
  z-index: 30;
}
</style>
