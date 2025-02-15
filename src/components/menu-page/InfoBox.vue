<template>
  <!-- 電腦版型要改靠左 -->
  <div class="text-center p-3">
    <p>
      <span>{{ diningHours[0] }}</span>
      <span><br>{{ diningHours[1] }}</span>
    </p>
    <p class="mb-0">
      <span class="badge rounded-pill text-bg-wine-red fs-6 fw-normal">
        內用 {{ tableNumber || '-' }} 桌 | {{ guestsCount }} 位成人
      </span>
    </p>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps(['diningHours'])

const tableNumber = inject('tableNumber')
const guestsCount = inject('guestsCount')
</script>
