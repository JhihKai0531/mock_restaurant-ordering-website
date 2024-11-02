<template>
  <div class="container px-4 py-3">
    <!-- 大標題以及結帳按鈕 -->
    <div v-if="orderHistory.length" class="row mb-2">
      <h1 class="h3 col">點餐紀錄</h1>
      <div class="col-auto"><button type="button" class="btn btn-outline-primary">結帳去</button></div>
    </div>
    <!-- 還沒加入訂單的時候，的提示訊息 -->
    <div v-if="!orderHistory.length">
      <h1 class="text-center text-body-tertiary mt-4">尚未加入訂單</h1>
      <p class="text-center">
        <RouterLink to="/" title="首頁" class="text-body-tertiary">回首頁</RouterLink>
      </p>
    </div>
    <!-- 將每次點餐的紀錄放在手風琴的面板 -->
    <div v-if="orderHistory.length">
      <h5 class="float-end lh-sm">總金額 {{ `NT$ ${totalAmount} 元` }}</h5>
      <!-- 以首次提交購物車的時間點判斷當下日期 -->
      <p class="mb-0">{{ new Date(orderHistory[0].dateTime).toLocaleDateString() }}</p>
      <p class="mb-0">桌號：{{ orderHistory[0].tableNumber.value }}</p>
      <p>用餐人數：{{ orderHistory[0].guestsCount.value }}位</p>
      <div class="accordion" id="orderHistoryAccordion">
        <div v-for="(order, index) in orderHistory" :key="order.dateTime" class="accordion-item">
          <!-- 摺疊面板標題 -->
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#orderHistoryContent${order.dateTime}`">
              <span>{{ `第 ${index + 1} 次點餐` }}</span>
              <span class="custom-to-right text-body-secondary">{{ new Date(order.dateTime).toLocaleTimeString() }}</span>
            </button>
          </h2>
          <!-- 摺疊面板內容 -->
          <div :id="`orderHistoryContent${order.dateTime}`" class="accordion-collapse collapse show">
            <div class="accordion-body">
              <!-- 每一項餐點也是一個小折疊面板 -->
              <details v-for="item in order.cart" :key="item.dateTime">
                <summary class="mb-2">
                  <span>{{ item.mealObject.strMeal }}</span>
                  <span>{{ `NT$${item.subtotal}` }}</span><br>
                  <span v-show="item.setMenuObject.setMenuPrice" class="text-body-secondary ps-3">{{ item.setMenuObject.setMenuName }}</span>
                </summary>
                <table class="table table-sm mt-2 table-bordered">
                  <tbody>
                    <!-- 餐點數量及基本單價 -->
                    <tr>
                      <td>數量 / 基本單價</td>
                      <td>{{ `×${item.count}` }}</td>
                      <td>{{ `$${item.mealObject.price}` }}</td>
                    </tr>
                    <!-- 辣度 -->
                    <tr>
                      <td>{{ item.spicyObject.name }}</td>
                      <td colspan="2">$0</td>
                    </tr>
                    <!-- 加量 -->
                    <tr v-show="item.extraObject.value">
                      <td>{{ item.extraObject.name }}</td>
                      <td colspan="2">{{ `$${item.extraObject.price}` }}</td>
                    </tr>
                    <!-- 套餐 -->
                    <tr v-if="item.setMenuObject.setMenuPrice">
                      <td>
                        {{ item.setMenuObject.setMenuName }}<br>
                        <span class="text-body-secondary">
                          {{ item.setMenuObject.setMenuDescription }}
                        </span>
                      </td>
                      <td colspan="2">{{ `$${item.setMenuObject.setMenuPrice}` }}</td>
                    </tr>
                    <tr v-else>
                      <td>單點</td>
                      <td colspan="2">$0</td>
                    </tr>
                    <!-- 備註 -->
                    <tr v-show="item.notes">
                      <td colspan="3">
                        <details>
                          <summary>備註</summary>
                          <p v-if="item.notes" class="my-0 text-body-secondary">{{ item.notes }}</p>
                          <p v-else class="my-0 text-body-secondary">無</p>
                        </details>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </details>
              <!-- 訂單小計 -->
              <div class="custom-div-cart-subtotal">
                <p class="my-2">訂單小計：</p>
                <p class="my-2">{{ `NT$${order.cartSubtotal}` }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['orderHistory'],
  data () {
    return {

    }
  },
  computed: {
    totalAmount () {
      let result = 0
      this.orderHistory.forEach(order => {
        result += order.cartSubtotal
      })
      return result
    }
  }
}
</script>

<style scoped>
.accordion-button {
  background-color: #ffe457;

  .custom-to-right {
    margin-left: auto;
  }

  &::after {
    margin-left: 1rem;
  }
}

.accordion-body > details > summary > span {
  display: inline-block;
  vertical-align: top;

  &:first-child {
    max-width: 67%;
  }

  &:nth-child(2) {
    float: right;
  }
}

.accordion-body > details > table {
  margin-left: 0.75rem;
  width: calc(100% - 0.75rem);
}

tr > td:not(:first-child), tr > th:not(:first-child) {
  text-align: right;
}

.custom-div-cart-subtotal {
  display: flex;
  justify-content: space-between;
  background-color: #e9ecef;
  padding: 0 0.75rem;
  border-radius: 0.25rem;
  margin: 0 -0.75rem;
}
</style>
