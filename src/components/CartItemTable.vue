<template>
  <table class="table table-borderless mt-3 table-light">
    <colgroup>
      <col span="1">
      <col span="1">
      <col span="1">
    </colgroup>
    <tbody>
      <template v-for="item in cartData" :key="item.dateTime">
        <!-- 該餐點名稱，以及編輯按鈕 -->
        <tr class="table-active">
          <th style="max-width: 20ch;">{{ item.mealObject.strMeal }}</th>
          <td colspan="2">
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal"
            :disabled="diningFinished.value" @click="emitCartItem(item)">修改 / 刪除</button>
          </td>
        </tr>
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
            <span class="text-body-secondary">{{ item.setMenuObject.setMenuDescription }}</span>
          </td>
          <td colspan="2">{{ `$${item.setMenuObject.setMenuPrice}` }}</td>
        </tr>
        <tr v-else>
          <td>單點</td>
          <td colspan="2">$0</td>
        </tr>
        <!-- 備註 -->
        <tr>
          <td>
            <details>
              <summary>備註</summary>
              <p v-if="item.notes" class="my-0 text-body-secondary">{{ item.notes }}</p>
              <p v-else class="my-0 text-body-secondary">無</p>
            </details>
          </td>
          <td colspan="2"></td>
        </tr>
        <!-- 單項價格合計 -->
        <tr>
          <th scope="row">單項合計：</th>
          <td colspan="2">{{ `NT$${item.subtotal}` }}</td>
        </tr>
      </template>
    </tbody>
    <tfoot class="table-group-divider">
      <!-- 小計，加入插槽，由上層來渲染 -->
      <tr class="fs-5">
        <th>小計</th>
        <th colspan="2">
          <slot>未計算</slot>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  inject: ['cartData', 'diningFinished'],
  methods: {
    emitCartItem (item) {
      const mealItem = item.mealObject
      const dateTime = item.dateTime
      const options = {
        setMenuRadio: item.setMenuObject.setMenuId,
        spicy: item.spicyObject.value,
        extra: item.extraObject.value,
        notes: item.notes,
        count: item.count
      }
      this.$emit('editProduct', { mealItem, options, dateTime })
    }
  }
}
</script>

<style scoped>
tr > td:not(:first-child), tr > th:not(:first-child) {
  text-align: right;
}

.table-borderless > .table-group-divider {
  border-top-width: 2px;
}
</style>
