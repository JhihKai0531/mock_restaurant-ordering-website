<template>
  <ul class="nav flex-xl-column flex-nowrap overflow-x-auto overflow-y-hidden">
    <li v-for="category in categoryList" :key="category" class="nav-item">
      <RouterLink :to="{ path: `/${category}` }" class="nav-link fw-normal px-xl-5" :class="{ active: false }">
        {{ category }}
      </RouterLink>
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

  &:hover {
    color: #404040;
  }
}

.nav-link.active {
  box-shadow: 0 -8px var(--color-F5B841) inset;
  color: #000;
}

@media screen and (min-width: 1200px) {
  .nav-link.active {
    box-shadow: 8px 0 var(--color-F5B841) inset;
  }
}
</style>
