<template>
  <!-- 電腦版型要改靠左 -->
  <div class="text-center text-xl-start p-3">
    <p>
      <span>{{ diningHours[0] }}</span>
      <span><br>{{ diningHours[1] }}</span>
    </p>
    <p class="mb-0">
      <span class="badge rounded-pill text-bg-822C41 fs-6 fw-normal">
        內用 {{ tableNumber.value || '-' }} 桌 | {{ guestsCount.value }} 位成人
      </span>
    </p>
  </div>
</template>

<script>
export default {
  inject: ['tableNumber', 'guestsCount'],
  props: ['diningHours']
}
</script>

<style scoped>

</style>
