<template>
  <nav class="navbar navbar-expand bg-warning-subtle">
    <div class="container-fluid justify-content-sm-start">
      <RouterLink class="navbar-brand" to="/" title="首頁">
        <span class="lead">肉之家</span>
        <span class="fs-6" style="color: rgb(207 160 13);">異國料理</span>
      </RouterLink>
      <ul class="navbar-nav flex-grow-1">
        <RouterLink to="/about-us" class="nav-link">關於我們</RouterLink>
        <a class="nav-link ms-auto" href="javascript:;" @click="resetPage">重置網頁</a>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    resetPage () {
      const answer = confirm(
        '將重置所有用戶端資料，包含：\n' +
        '1. 購物車\n' +
        '2. 訂單紀錄\n' +
        '3. 其他用餐相關資料'
      )
      if (answer) {
        localStorage.clear()
        window.location.reload()
      }
    }
  }
}
</script>
