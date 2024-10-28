<template>
  <div class="container">
    <table class="table">
      <colgroup>
        <col span="1">
        <col span="1">
        <col span="1">
      </colgroup>
      <tbody>
        <template v-for="item in cartData" :key="item.vBindKey">
          <tr>
            <th>{{ item.mealObject.strMeal }}</th>
            <td>{{ `×${item.count}` }}</td>
            <td>{{ `NT$${item.mealObject.price}` }}</td>
          </tr>
          <tr>
            <td>{{ item.spicyObject.name }}</td>
            <td colspan="2">$0</td>
          </tr>
          <tr v-show="item.extraObject.value">
            <td>{{ item.extraObject.name }}</td>
            <td colspan="2">{{ `$${item.extraObject.price}` }}</td>
          </tr>
          <tr v-if="item.setMenuObject.setMenuPrice">
            <td>{{ item.setMenuObject.setMenuName }}</td>
            <td colspan="2">{{ `$${item.setMenuObject.setMenuPrice}` }}</td>
          </tr>
          <tr v-else>
            <td>單點</td>
            <td colspan="2">$0</td>
          </tr>
          <tr>
            <td>
              <details>
                <summary>備註</summary>
                <p class="my-0 text-body-secondary">{{ item.notes }}</p>
              </details>
            </td>
            <td colspan="2">{{`單項合計：$${item.subtotal}`}}</td>
          </tr>
        </template>
        <tr class="fs-5">
          <th>小計</th>
          <th colspan="2">{{ `NT$${subtotal}` }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  inject: ['cartData'],
  computed: {
    subtotal () {
      let result = 0
      this.cartData.forEach(item => {
        result += item.subtotal
      })
      return result
    }
  }
}
</script>

<style scoped lang="scss">
@import "bootstrap/scss/bootstrap-utilities";
tr > td:not(:first-child), tr > th:not(:first-child) {
  @extend .text-end;
}
</style>
