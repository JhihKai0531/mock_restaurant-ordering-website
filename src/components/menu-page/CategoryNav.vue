<template>
  <ul class="nav flex-xl-column flex-nowrap overflow-x-auto overflow-y-hidden">
    <li v-for="category in categoryList" :key="category" class="nav-item">
      <RouterLink
        :to="{ path: `/${category}` }"
        class="nav-link fw-normal px-xl-5"
        :class="{ active: false }"
      >
        {{ category }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup>
import { inject } from 'vue'

const categoryList = inject('categoryList')
</script>

<style scoped>
.nav-link {
  color: var(--bs-gray);

  &:hover {
    color: var(--bs-gray-dark);
  }
}

.nav-link.active {
  box-shadow: 0 -8px var(--bs-honey-gold) inset;
  color: #000;
}

@media screen and (min-width: 1200px) {
  .nav-link.active {
    box-shadow: 8px 0 var(--bs-honey-gold) inset;
  }
}
</style>
