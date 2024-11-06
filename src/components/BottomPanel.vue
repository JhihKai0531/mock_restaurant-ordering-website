<template>
  <div class="btn-group fixed-bottom">
    <RouterLink to="/order-history" class="btn custom-btn-light-yellow">訂單紀錄</RouterLink>
    <RouterLink to="/cart" class="btn btn-primary">購物車</RouterLink>
  </div>
</template>

<style scoped>
.btn-group > .btn {
  flex: 1 1 50%;
}

.btn {
  --bs-btn-padding-y: 0.625rem
}

.custom-btn-light-yellow {
  --bs-btn-color: #000;
  --bs-btn-bg: #ffe457;
  --bs-btn-border-color: #ffe457;
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #e4cb50;
  --bs-btn-hover-border-color: #e4cb50;
  --bs-btn-focus-shadow-rgb: 11, 172, 204;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #e4cb50;
  --bs-btn-active-border-color: #e4cb50;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #000;
  --bs-btn-disabled-bg: #ffe457;
  --bs-btn-disabled-border-color: #ffe457;
}
</style>
