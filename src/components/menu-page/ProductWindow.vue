<template>
  <div id="productModal" ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">餐點選項</h1>
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
              <h2 class="col-8">{{ mealPropped.strMeal }}</h2>
              <div class="col-4 text-end">{{ `NT$ ${mealPropped.price}` }}</div>
            </div>

            <!-- 套餐 -->
            <fieldset>
              <legend class="col-form-label">套餐</legend>
              <div v-for="set in setMenus" :key="set.setMenuId" class="form-check">
                <input
                  :id="set.setMenuId"
                  v-model="userSettings.setMenuRadio"
                  class="form-check-input"
                  type="radio"
                  :value="set.setMenuId"
                />

                <label class="form-check-label d-block" :for="set.setMenuId">
                  <!-- label裡面有兩個row -->
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
                  :id="item.value"
                  v-model="userSettings.spicy"
                  class="form-check-input"
                  type="radio"
                  :value="item.value"
                />
                <label class="form-check-label" :for="item.value">
                  {{ item.name }}
                </label>
              </div>
            </fieldset>

            <!-- 加量 -->
            <fieldset>
              <legend class="col-form-label">加量</legend>
              <div class="form-check">
                <input
                  id="extraCheckbox"
                  v-model="userSettings.extra"
                  class="form-check-input"
                  type="checkbox"
                />
                <label class="form-check-label d-block" for="extraCheckbox">
                  <div class="row">
                    <div class="col-8">是</div>
                    <div class="col-4 text-end">{{ `+ ${extraPrice} 元` }}</div>
                  </div>
                </label>
              </div>
            </fieldset>

            <!-- 備註 -->
            <fieldset>
              <label for="notesText" class="col-form-label">備註</label>
              <textarea
                id="notesText"
                v-model.lazy="userSettings.notes"
                class="form-control"
                rows="3"
              ></textarea>
            </fieldset>

            <!-- 數量 -->
            <fieldset>
              <label class="col-form-label" for="count">數量</label>
              <!-- 用網格系統來擺放「減按鈕」、「數字框」、「加按鈕」 -->
              <div class="row gx-0">
                <div class="col-2 text-center">
                  <button
                    type="button"
                    class="btn border-0"
                    :disabled="userSettings.count <= 1"
                    @click="minusCount"
                  >
                    <i class="bi bi-dash-lg"></i>
                  </button>
                </div>

                <div class="col-4">
                  <input
                    id="count"
                    v-model.number="userSettings.count"
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

            <p class="text-end h5 mt-3">
              {{ `小計：NT$ ${subtotal} 元` }}
            </p>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-rosewood"
              data-bs-dismiss="modal"
              @click="clearSettings"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-rosewood"
              :disabled="diningFinished"
              @click="addToCart"
            >
              加入購物車
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'
import setMenus from '@/assets/set-menu.json'

const props = defineProps(['mealPropped'])

// 用餐完成狀態，決定購物車按鈕是否可用
const diningFinished = inject('diningFinished')

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
defineExpose({ modalInstance, clearSettings }) // 將資料與方法暴露給父元件

// V-Model餐點選項設定
const userSettings = ref({
  setMenuRadio: 'No',
  spicy: 'no',
  extra: false,
  notes: '',
  count: 0,
})

// 將商品視窗的表單復原到預設值
function clearSettings() {
  userSettings.value = {
    setMenuRadio: 'No',
    spicy: 'no',
    extra: false,
    notes: '',
    count: 0,
  }
  isInvalidCount.value = false
}

// 商品表單的價格小計
const subtotal = computed(() => {
  const productPrice = props.mealPropped.price

  let setMenuPrice = 0
  setMenuPrice = setMenus.find(
    (set) => set.setMenuId === userSettings.value.setMenuRadio,
  ).setMenuPrice

  const extraPrice = userSettings.value.extra ? 25 : 0
  const count = userSettings.value.count

  return (productPrice + setMenuPrice + extraPrice) * count
})

// 數量是否無效
const isInvalidCount = ref(false)

// 增加數字框的數字
function plusCount() {
  let number = userSettings.value.count
  number++
  userSettings.value.count = number
  checkCount()
}
// 減少數字框的數字，並檢查和校正數值
function minusCount() {
  let number = userSettings.value.count
  number--
  if (number < 1) {
    number = 1
  }
  userSettings.value.count = number
  checkCount()
}
// 觸發時檢查數值，並修改資料狀態
function checkCount() {
  if (userSettings.value.count < 1 || userSettings.value.count % 1 !== 0) {
    isInvalidCount.value = true
  } else {
    isInvalidCount.value = false
  }
}

// 購物車資料
const cartData = inject('cartData')

// 加入購物車，可以拆解成：檢查數量值、整理資料、推送資料、關閉商品表單、復原表單資料狀態
function addToCart() {
  checkCount()
  if (isInvalidCount.value) {
    return
  }

  const mealObject = { ...props.mealPropped }

  let setMenuObject = {}
  setMenuObject = { ...setMenus.find((set) => set.setMenuId === userSettings.value.setMenuRadio) }

  let spicyObject = {}
  spicyObject = { ...spicyArray.find((option) => option.value === userSettings.value.spicy) }

  const extraObject = {
    value: userSettings.value.extra,
    price: userSettings.value.extra ? 25 : 0,
    name: userSettings.value.extra ? '加量' : '',
  }

  const all = {
    mealObject,
    setMenuObject,
    spicyObject,
    extraObject,
    notes: userSettings.value.notes,
    count: userSettings.value.count,
    subtotal: subtotal.value,
    dateTime: Date.now(),
  }

  cartData.value.push(all)
  // console.log('加入購物車：', all)

  modalInstance.value.hide()
  clearSettings()
}
</script>
