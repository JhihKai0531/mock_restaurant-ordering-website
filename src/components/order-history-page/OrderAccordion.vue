<template>
  <div id="orderHistoryAccordion" class="accordion">
    <div v-for="(order, index) in orderHistory" :key="order.dateTime" class="accordion-item">

      <!-- 摺疊面板標題 -->
      <h2 class="accordion-header">
        <button class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#orderHistoryContent${order.dateTime}`"
        >
          <span>{{ `第 ${index + 1} 次點餐` }}</span>
          <span class="ms-auto">{{ new Date(order.dateTime).toLocaleTimeString() }}</span>
        </button>
      </h2>

      <!-- 摺疊面板內容 -->
      <div :id="`orderHistoryContent${order.dateTime}`" class="accordion-collapse collapse show">
        <div class="accordion-body">

          <!-- 每一項餐點也是一個小折疊面板 -->
          <details v-for="item in order.cart" :key="item.dateTime">
            <!-- 小摺疊面板的標題顯示內容 -->
            <summary class="mb-2">
              <span class="d-inline-block col-8 align-top">{{ item.mealObject.strMeal }}</span>
              <span class="float-end align-top">{{ `NT$${item.subtotal}` }}</span>
              <br>
              <span v-if="item.setMenuObject.setMenuPrice" class="text-body-secondary ps-3">
                {{ item.setMenuObject.setMenuName }}
              </span>
            </summary>

            <!-- 小摺疊面板收合的內容 -->
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
                <tr v-if="item.extraObject.value">
                  <td>{{ item.extraObject.name }}</td>
                  <td colspan="2">{{ `$${item.extraObject.price}` }}</td>
                </tr>

                <!-- 套餐 -->
                <tr>
                  <td>
                    {{ item.setMenuObject.setMenuName }}<br>
                    <span class="text-body-secondary">
                      {{ item.setMenuObject.setMenuDescription }}
                    </span>
                  </td>
                  <td colspan="2">{{ `$${item.setMenuObject.setMenuPrice}` }}</td>
                </tr>

                <!-- 備註 -->
                <tr v-if="item.notes">
                  <td colspan="3">
                    <details>
                      <summary>備註</summary>
                      <p class="my-0 text-body-secondary text-break">{{ item.notes }}</p>
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
</template>

<script>
export default {
  inject: ['orderHistory']
}
</script>

<style scoped>
/* icon解決方案：https://stackoverflow.com/questions/66231936/change-accordion-button-collapsed-icon-color-in-bootstrap-5 */
.accordion-button {
  background-color: var(--bs-wine-red);
  --bs-accordion-btn-color: #fff;
  --bs-accordion-active-color: #fff;
  --bs-accordion-btn-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  --bs-accordion-btn-active-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");

  &::after {
    margin-left: 1rem;
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
  background-color: var(--bs-gray-200);
  padding: 0 0.75rem;
  border-radius: 0.25rem;
  margin: 0 -0.75rem;
}
</style>
