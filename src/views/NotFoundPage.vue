<template>
  <div id="notFoundPage" class="container text-center py-5">
    <div class="d-inline-block text-start">
      <!-- 404 icon來源：https://www.flaticon.com/free-icon/error-404_3855833?term=error+404&page=1&position=4&origin=search&related_id=3855833 -->
      <h1 class=""><img src="@/assets/error-404.png" alt="The Page is not Found" width="30" height="30">找不到頁面</h1>
      <p class="text-body-secondary">請再確認網址，或是聯絡本團隊。</p>
      <p class="text-body-secondary"><RouterLink to="/" title="首頁">或是嘗試點此回到首頁→</RouterLink></p>
    </div>
  </div>
</template>

<style scoped>
.container {
  --custom-h1-font-size: calc(1.75rem + 2vw);

  h1 {
    font-size: var(--custom-h1-font-size);
    margin-bottom: 0.5em;
  }

  img {
    width: var(--custom-h1-font-size);
    height: var(--custom-h1-font-size);
  }

  p {
    font-size: calc(var(--custom-h1-font-size) / 2);
  }
}
</style>

<style>
body:has(#notFoundPage) {
  height: 100vh;
  background: linear-gradient(#fff, #ddd);
}
</style>
