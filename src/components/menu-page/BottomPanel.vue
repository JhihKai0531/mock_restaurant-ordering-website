<template>
  <div class="btn-group fixed-bottom">
    <RouterLink to="/order-history" class="btn btn-light">訂單紀錄</RouterLink>
    <RouterLink to="/cart" class="btn btn-6A041D">購物車</RouterLink>
  </div>
</template>

<style scoped>
.btn-group > .btn {
  flex: 1 1 50%;
}

.btn {
  --bs-btn-padding-y: 0.625rem
}
</style>
