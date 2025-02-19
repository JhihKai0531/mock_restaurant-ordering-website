<template>
  <div id="editModal" ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">編輯餐點</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="clearSettings"
          ></button>
        </div>

        <form>
          <div class="modal-body">
            <!-- 該餐點資訊 -->
            <div class="row">
              <h2 class="col-8">{{ mealInfo.strMeal }}</h2>
              <div class="col-4 text-end">{{ `NT$ ${mealInfo.price}` }}</div>
            </div>

            <!-- 套餐 -->
            <fieldset>
              <legend class="col-form-label">套餐</legend>
              <div v-for="set in setMenus" :key="set.setMenuId" class="form-check">
                <input
                  :id="`${set.setMenuId}_E`"
                  v-model="userEditing.setMenuRadio"
                  class="form-check-input"
                  type="radio"
                  :value="set.setMenuId"
                />

                <label class="form-check-label d-block" :for="`${set.setMenuId}_E`">
                  <div class="row">
                    <div class="col-8">{{ set.setMenuName }}</div>
                    <div class="col-4 text-end">{{ `+ ${set.setMenuPrice} 元` }}</div>
                  </div>

                  <div class="row">
                    <div class="col">{{ set.setMenuDescription }}</div>
                  </div>
                </label>
              </div>
            </fieldset>

            <!-- 辣度 -->
            <fieldset>
              <legend class="col-form-label">辣度</legend>
              <div
                v-for="item in spicyArray"
                :key="item.value"
                class="form-check form-check-inline"
              >
                <input
                  :id="`${item.value}_E`"
                  v-model="userEditing.spicy"
                  class="form-check-input"
                  type="radio"
                  :value="item.value"
                />
                <label class="form-check-label" :for="`${item.value}_E`">
                  {{ item.name }}
                </label>
              </div>
            </fieldset>

            <!-- 加量 -->
            <fieldset>
              <legend class="col-form-label">加量</legend>
              <div class="form-check">
                <input
                  id="extraCheckbox_E"
                  v-model="userEditing.extra"
                  class="form-check-input"
                  type="checkbox"
                />
                <label class="form-check-label d-block" for="extraCheckbox_E">
                  <div class="row">
                    <div class="col-8">是</div>
                    <div class="col-4 text-end">{{ `+ ${extraPrice} 元` }}</div>
                  </div>
                </label>
              </div>
            </fieldset>

            <!-- 備註 -->
            <fieldset>
              <label for="notesText_E" class="col-form-label">備註</label>
              <textarea
                id="notesText_E"
                v-model.lazy="userEditing.notes"
                class="form-control"
                rows="3"
              ></textarea>
            </fieldset>

            <!-- 數量 -->
            <fieldset>
              <label class="col-form-label" for="count_E">數量</label>
              <!-- 一樣用網格系統來擺放「減按鈕」、「數字框」、「加按鈕」 -->
              <div class="row gx-0">
                <div class="col-2 text-center">
                  <button
                    type="button"
                    class="btn border-0"
                    :disabled="userEditing.count <= 1"
                    @click="minusCount"
                  >
                    <i class="bi bi-dash-lg"></i>
                  </button>
                </div>

                <div class="col-4">
                  <input
                    id="count_E"
                    v-model.number="userEditing.count"
                    class="form-control"
                    :class="{ 'is-invalid': isInvalidCount }"
                    type="number"
                    min="1"
                    v-on="{ input: checkCount, focusout: checkCount }"
                  />
                  <div class="invalid-feedback">請輸入正整數</div>
                </div>

                <div class="col-2 text-center">
                  <button type="button" class="btn" @click="plusCount">
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
            </fieldset>

            <!-- 小計 -->
            <p class="text-end h5 mt-3">
              {{ `小計：NT$ ${subtotal} 元` }}
            </p>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger me-auto px-3"
              data-bs-target="#deleteModel"
              data-bs-toggle="modal"
              @click="askToDelete"
            >
              刪除
            </button>
            <button
              type="button"
              class="btn btn-outline-rosewood"
              data-bs-dismiss="modal"
              @click="clearSettings"
            >
              取消
            </button>
            <button type="button" class="btn btn-rosewood" @click="finishEditing">確認編輯</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, ref } from 'vue'
import { Modal } from 'bootstrap'
import setMenus from '@/assets/set-menu.json'

const emitter = inject('emitter')

const props = defineProps(['cartItemPropped'])

// 餐點選項（顯示用）
const spicyArray = [
  { value: 'no', name: '不辣' },
  { value: 'mild', name: '微辣' },
  { value: 'mildMedium', name: '小辣' },
  { value: 'medium', name: '中辣' },
  { value: 'hot', name: '大辣' },
]
const extraPrice = 25

// Modal視窗
const modal = ref(null)
const modalInstance = ref(null)
onMounted(() => {
  modalInstance.value = new Modal(modal.value, {
    backdrop: 'static',
    keyboard: false,
  })
})
onBeforeUnmount(() => {
  modalInstance.value.hide()
})
defineExpose({ modalInstance, clearSettings })

// V-Model餐點選項設定
// 如果因為錯誤導致資料沒有傳進來，至少先給個初始值
const userEditing = ref({
  setMenuRadio: 'No',
  spicy: 'no',
  extra: false,
  notes: '',
  count: 0,
})

// 將商品視窗的表單復原到預設值
function clearSettings() {
  userEditing.value = {
    setMenuRadio: 'No',
    spicy: 'no',
    extra: false,
    notes: '',
    count: 0,
  }
  isInvalidCount.value = false
}

// 餐點資訊先給個空物件，再利用生命週期修改它
const mealInfo = ref({})
function setMealInfo() {
  mealInfo.value = props.cartItemPropped.mealItem
}
function setEditingOptions() {
  userEditing.value = props.cartItemPropped.options
}
onBeforeUpdate(() => {
  setMealInfo()
  setEditingOptions()
})

// 商品表單的價格小計
const subtotal = computed(() => {
  const productPrice = mealInfo.value.price

  let setMenuPrice = 0
  setMenuPrice = setMenus.find(
    (set) => set.setMenuId === userEditing.value.setMenuRadio,
  ).setMenuPrice

  const extraPrice = userEditing.value.extra ? 25 : 0
  const count = userEditing.value.count

  return (productPrice + setMenuPrice + extraPrice) * count
})

// 數量是否無效
const isInvalidCount = ref(false)

// 增加數字框的數字
function plusCount() {
  let number = userEditing.value.count
  number++
  userEditing.value.count = number
  checkCount()
}
// 減少數字框的數字，並檢查和校正數值
function minusCount() {
  let number = userEditing.value.count
  number--
  if (number < 1) {
    number = 1
  }
  userEditing.value.count = number
  checkCount()
}
// 觸發時檢查數值，並修改資料狀態
function checkCount() {
  if (userEditing.value.count < 1 || userEditing.value.count % 1 !== 0) {
    isInvalidCount.value = true
  } else {
    isInvalidCount.value = false
  }
}

// 購物車資料
const cartData = inject('cartData')

// 完成修改時的動作
function finishEditing() {
  checkCount()
  if (isInvalidCount.value) {
    return
  }

  const mealObject = { ...mealInfo.value }

  let setMenuObject = {}
  setMenuObject = { ...setMenus.find((set) => set.setMenuId === userEditing.value.setMenuRadio) }

  let spicyObject = {}
  spicyObject = { ...spicyArray.find((option) => option.value === userEditing.value.spicy) }

  const extraObject = {
    value: userEditing.value.extra,
    price: userEditing.value.extra ? 25 : 0,
    name: userEditing.value.extra ? '加量' : '',
  }

  const dateTime = props.cartItemPropped.dateTime

  const all = {
    mealObject,
    setMenuObject,
    spicyObject,
    extraObject,
    notes: userEditing.value.notes,
    count: userEditing.value.count,
    subtotal: subtotal.value,
    dateTime,
  }

  // 透過陣列splice去替換資料
  cartData.value.forEach((item, index) => {
    if (item.dateTime === all.dateTime) {
      cartData.value.splice(index, 1, all)
    }
  })
  // console.log('修改完成：', all, '\n目前購物車', cartData)

  modalInstance.value.hide()
  clearSettings()
}

// 有關刪除的邏輯
function askToDelete() {
  emitter.emit('deleteItem', mealInfo.value)
  isInvalidCount.value = false
}

function deleteCartItem() {
  const dateTime = props.cartItemPropped.dateTime
  cartData.value.forEach((item, index) => {
    if (item.dateTime === dateTime) {
      cartData.value.splice(index, 1)
    }
  })
  // console.log('刪除一項餐點，目前購物車', cartData)
}

emitter.on('cancelDeleting', checkCount)
emitter.on('confirmDeleting', deleteCartItem)

onUnmounted(() => {
  emitter.off('cancelDeleting')
  emitter.off('confirmDeleting')
})
</script>
