<template>
  <ul class="nav nav-tabs flex-nowrap overflow-x-auto overflow-y-hidden" style="background-color: rgb(206 165 43);">
    <li class="nav-item" v-for="category in categoryList" :key="category">
      <RouterLink
        :to="{path: `/mealview/${category}`}"
        class="nav-link text-light"
        :class="{active: false}"
        style="--bs-nav-tabs-link-active-bg: #666;">{{ category }}</RouterLink>
    </li>
  </ul>
</template>

<script>
export default {
  props: [],
  inject: ['categoryList'],
  created () {

  }
}
</script>
