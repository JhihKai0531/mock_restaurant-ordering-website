<template>
  <div class="outer">
    <div class="container py-sm-5 py-4 px-3">
      <h1 class="text-center mb-4">肉之家異國料理</h1>

      <div class="mb-4">
        <h3 class="fs-5 fw-bold">無肉不歡者的天堂，舌尖上的世界之旅！</h3>
        <p>
          來到肉之家，您將踏上一場美味的冒險之旅。我們精選全球破百道肉類料理，不論是多汁嫩雞、香濃豬排、頂級牛肉、鮮美羊排，還是新鮮海鮮，都能滿足您的挑剔味蕾。除此之外，還有讓人驚喜的甜點、健康蔬食和暖心濃湯，為每一位顧客提供多元選擇。
        </p>
        <p>無論是家庭聚會、浪漫約會、商務洽談，或是享受一場獨自的饗宴，肉之家都會讓您流連忘返。</p>
      </div>

      <div class="mb-4">
        <h2 class="text-center mb-3">點餐方式</h2>
        <h3 class="fs-5 fw-bold">輕鬆點餐，專屬美味即刻送上！</h3>
        <p>
          只需拿起手機掃描桌上的 QR
          Code，便能瀏覽我們的豐富菜單。選擇您心儀的餐點，客製化您的專屬風味，加入購物車後確認訂單即可。我們的廚師團隊將全力以赴，為您呈現每一道精心準備的美味料理。
        </p>
        <p>此外，您還可隨時查看訂單紀錄及消費金額，最後輕鬆結帳，享受無憂的用餐體驗。</p>
      </div>

      <h2 class="text-center">營業資訊</h2>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          營業時間：
          <ul class="mt-2">
            <li class="mt-1">週二至週日</li>
            <li class="mt-1">午餐時段：11:00 ~ 14:30</li>
            <li class="mt-1">晚餐時段：17:00 ~ 21:00</li>
          </ul>
        </li>
        <li class="list-group-item">餐廳地址：142 台北市中央區成功路一段100號</li>
        <li class="list-group-item">連絡電話：02-0100-0010</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* 來源：https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-holding-wine-glass-7BpuzmcxlHU */
.outer {
  /* background-image: url(@/assets/dinner.jpg); */
  /* background-image: linear-gradient(rgb(255 255 255 / 0.3), rgb(255 255 255 / 0.3)), url(@/assets/dinner.jpg); */
  background-image: linear-gradient(rgb(0 0 0 / 0.3), rgb(0 0 0 / 0.3)), url(@/assets/dinner.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.container {
  background-color: rgb(255 255 255 / 0.9);
}

.list-group-item {
  background: inherit;
}
</style>
