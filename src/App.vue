<template>
  <router-view />
</template>

<style lang="scss">
@import './scss/all.scss';
$bootstrap-icons-font-dir: '~/bootstrap-icons/font/fonts';
@import '~/bootstrap-icons/font/bootstrap-icons.scss';

body {
  padding-bottom: calc(var(--reserve-space-panel, 0px) + var(--reserve-space-totop, 0px));
}

body:has(.fixed-bottom) {
  --reserve-space-panel: 60px;
}

body:has(#toTopBtn) {
  --reserve-space-totop: 45px;
}

.modal-sm-unresponsive {
  max-width: 300px;
  margin-right: auto;
  margin-left: auto;
}

.modal {
  .form-check-input:checked {
    background-color: var(--bs-honey-gold);
    border-color: var(--bs-honey-gold);
  }

  textarea {
    resize: none;
  }
}
</style>
