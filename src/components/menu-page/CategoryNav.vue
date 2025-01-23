<template>
  <ul class="nav nav-tabs flex-nowrap overflow-x-auto overflow-y-hidden">
    <li v-for="category in categoryList" :key="category" class="nav-item">
      <RouterLink
        :to="{path: `/${category}`}"
        class="nav-link"
        :class="{active: false}"
      >{{ category }}</RouterLink>
    </li>
  </ul>
</template>

<script>
export default {
  inject: ['categoryList']
}
</script>

<style scoped>
.nav-link {
  color: var(--color-898989);
}

.nav-link.active {
  box-shadow: 0 -8px var(--color-F5B841) inset;
}
</style>
