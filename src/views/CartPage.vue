<template>
  <div class="container px-4 py-3">
    <p v-if="cartData.length" class="mb-2">
      <RouterLink to="/" class="text-decoration-none text-roast-brown fw-semibold">回菜單←</RouterLink>
    </p>

    <form>
      <!-- 桌號 -->
      <div class="row mb-3 gx-0">
        <div class="col">
          <label for="tableNumberSelect" class="col-form-label">內用桌號</label>
        </div>

        <div class="col col-lg-5">
          <select id="tableNumberSelect"
            v-model="tableNumber"
            class="form-select"
            :class="{'is-invalid': isInvalidTableNumber}"
            @="{change: checkTableNumber}"
            :disabled="disabledTableNumber"
          >
            <option value="" disabled>請選擇桌號</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A3">A3</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
          </select>
          <div class="invalid-feedback">請選擇您的桌號。</div>
        </div>
      </div>

      <!-- 用餐人數 -->
      <div class="row gx-0">
        <div class="col">
          <label for="guestsCountInput" class="col-form-label">用餐人數</label>
        </div>

        <div class="col-2 text-center col-lg-1">
          <button type="button" title="減少" class="btn border-0" :disabled="guestsCount <= 1 || disabledGuestsCount" @click="minusGuestsCount">
            <i class="bi bi-dash-lg"></i>
          </button>
        </div>

        <div class="col-3">
          <input id="guestsCountInput"
            v-model.number="guestsCount"
            type="number"
            min="1"
            class="form-control"
            :class="{'is-invalid': isInvalidGuestsCount}"
            @="{input: checkGuestsCount, focusout: checkGuestsCount}"
            :disabled="disabledGuestsCount"
          >
          <div class="invalid-feedback">請輸入有效人數</div>
        </div>

        <div class="col-2 text-center col-lg-1">
          <button type="button" title="增加" class="btn border-0" :disabled="disabledGuestsCount" @click="plusGuestsCount">
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </form>

    <!-- 分隔線 -->
    <hr>

    <!-- 購物車為空的時候，的提示訊息 -->
    <div v-if="!cartData.length">
      <h1 class="text-center text-body-tertiary mt-4">尚未加入餐點</h1>
      <p class="text-center">
        <RouterLink to="/" title="首頁" class="text-body-tertiary">點餐去</RouterLink>
      </p>
    </div>

    <EditWindow ref="editModal" :cartItemPropped="cartItemProps"></EditWindow>
    <DeleteModal ref="deleteModal"></DeleteModal>

    <!-- 購物車，以表格呈現。當中的插槽用來填入購物車金額小計。 -->
    <template v-if="cartData.length">
      <CartItemList @editProduct="editProduct">
        {{ `NT$${cartSubtotal}` }}
      </CartItemList>
    </template>

    <button type="button" class="btn btn-warning fixed-bottom btn-lg btn-wine-red" :disabled="diningFinished || !cartData.length" @click="submitCartData">
      送出訂單
    </button>

    <ToTopBtn></ToTopBtn>
  </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import CartItemList from '@/components/cart-page/CartItemList.vue'
import EditWindow from '@/components/cart-page/EditWindow.vue'
import DeleteModal from '@/components/cart-page/DeleteModal.vue'
import ToTopBtn from '@/components/application/ToTopBtn.vue'

const router = useRouter()

const diningFinished = inject('diningFinished')

const cartData = inject('cartData')
const orderHistory = inject('orderHistory')

// 呼叫時檢查訂單紀錄是否有資料，如果有就鎖定桌號與用餐人數欄位
const disabledTableNumber = ref(false)
const disabledGuestsCount = ref(false)

watch(
  () => !!orderHistory.value.length,
  (hasOrder) => {
    disabledTableNumber.value = hasOrder
    disabledGuestsCount.value = hasOrder
  },
  { immediate: true }
)

// 設定用餐人數
const guestsCount = inject('guestsCount')
const tableNumber = inject('tableNumber')

function plusGuestsCount () {
  let number = guestsCount.value
  number++
  guestsCount.value = number
  checkGuestsCount()
}

function minusGuestsCount () {
  let number = guestsCount.value
  number--
  if (number < 1) {
    number = 1
  }
  guestsCount.value = number
  checkGuestsCount()
}

// 購物車內的金額總和
const cartSubtotal = ref(0)

watch(
  cartData,
  calcCartSubtotal,
  { immediate: true, deep: true }
)

function calcCartSubtotal () {
  let result = 0
  cartData.value.forEach(item => {
    result += item.subtotal
  })
  cartSubtotal.value = result
  // console.log('計算總和：', cartSubtotal.value)
}

// 檢驗桌號與用餐人數
const isInvalidTableNumber = ref(false)
const isInvalidGuestsCount = ref(false)

function checkTableNumber () {
  if (!tableNumber.value) {
    isInvalidTableNumber.value = true
  } else {
    isInvalidTableNumber.value = false
  }
}

function checkGuestsCount () {
  if (guestsCount.value < 1 || guestsCount.value % 1 !== 0) {
    isInvalidGuestsCount.value = true
  } else {
    isInvalidGuestsCount.value = false
  }
}

// 將子元件傳遞上來的商品資料丟進編輯視窗
const cartItemProps = ref({})

function editProduct (cartItem) {
  cartItemProps.value = cartItem
}

// 提交訂單
function submitCartData () {
  checkTableNumber()
  checkGuestsCount()
  if (isInvalidTableNumber.value || isInvalidGuestsCount.value) { return }

  const confirmedData = {
    cart: cartData.value,
    cartSubtotal: cartSubtotal.value,
    tableNumber: tableNumber.value,
    guestsCount: guestsCount.value,
    dateTime: Date.now()
  }

  const deepCopyData = JSON.parse(JSON.stringify(confirmedData))

  orderHistory.value.push(deepCopyData)
  // console.log('送出訂單！', deepCopyData)

  // 清空陣列
  cartData.value.length = 0
  router.push('/order-history')
}

// 確保Modal能夠被關閉
const editModal = ref(null)
const deleteModal = ref(null)
onBeforeRouteLeave(() => {
  if (document.getElementById('editModal').classList.contains('show') || document.getElementById('deleteModel').classList.contains('show')) {
    editModal.value.modalInstance.hide()
    deleteModal.value.modalInstance.hide() // 之後要改
    editModal.value.clearSettings()
    return false
  }
})
</script>

<style scoped>
.container {
  @media screen and (min-width: 1200px) {
    max-width: 960px;
  }
}
</style>
