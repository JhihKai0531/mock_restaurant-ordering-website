<template>
  <div class="card w-75 mx-auto my-2">
    <div class="card-body">
      <p class="text-center mb-0">{{ diningHours }}</p>
    </div>
  </div>
  <CategoryNav></CategoryNav>
  <RouterView></RouterView>
</template>

<script>
import CategoryNav from '@/components/CategoryNav.vue'

export default {
  components: {
    CategoryNav
  },
  props: [
    'diningHours'
  ]
}
</script>
