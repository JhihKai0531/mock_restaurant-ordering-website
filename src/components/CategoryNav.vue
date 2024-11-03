<template>
  <ul class="nav nav-tabs flex-nowrap overflow-x-auto overflow-y-hidden" style="background-color: rgb(206 165 43);">
    <li class="nav-item" v-for="category in categoryList" :key="category">
      <RouterLink
        :to="{path: `/${category}`}"
        class="nav-link text-light"
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
.nav-link:hover {
  background-color: #0002;
}

.nav-link.active {
  background-color: #666;
}
</style>
