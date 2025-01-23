<template>
  <div id="productModal" ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h1 class="modal-title fs-5">餐點選項</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="clearProductSettings"></button>
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
                <input :id="set.setMenuId"
                  v-model="productUserSettings.setMenuRadio"
                  class="form-check-input"
                  type="radio"
                  :value="set.setMenuId"
                >

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
              <div v-for="item in spicyArray" :key="item.value" class="form-check form-check-inline">
                <input :id="item.value"
                  v-model="productUserSettings.spicy"
                  class="form-check-input"
                  type="radio"
                  :value="item.value"
                >
                <label class="form-check-label" :for="item.value">
                  {{ item.name }}
                </label>
              </div>
            </fieldset>

            <!-- 加量 -->
            <fieldset>
              <legend class="col-form-label">加量</legend>
              <div class="form-check">
                <input id="extraCheckbox"
                  v-model="productUserSettings.extra"
                  class="form-check-input"
                  type="checkbox"
                >
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
              <textarea id="notesText"
                v-model.lazy="productUserSettings.notes"
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
                  <button type="button" class="btn border-0" :disabled="productUserSettings.count <= 1" @click="minusCount">
                    <i class="bi bi-dash-lg"></i>
                  </button>
                </div>

                <div class="col-4">
                  <input id="count"
                    v-model.number="productUserSettings.count"
                    class="form-control"
                    :class="{'is-invalid': isInvalidCount}"
                    type="number"
                    min="1"
                    @="{input: checkCount, focusout: checkCount}"
                  >
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
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clearProductSettings">
              取消
            </button>
            <button type="button" class="btn btn-6A041D" :disabled="diningFinished.value" @click="addToCart">
              加入購物車
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import setMenuJson from '@/assets/set-menu.json'
import { Modal } from 'bootstrap'
export default {
  props: ['mealPropped'],
  inject: ['cartData', 'diningFinished'],
  data () {
    return {
      // Bootstrap互動視窗
      modal: {},
      // 供使用者設定的物件，每個項目都綁定v-model
      productUserSettings: {
        setMenuRadio: 'No',
        spicy: 'no',
        extra: false,
        notes: '',
        count: 0
      },
      // 驗證數量是否合法，不通過則為true
      isInvalidCount: false,
      // 套餐資訊為讀取用，不供修改
      setMenus: setMenuJson,
      // 辣度資訊為讀取用，不供修改
      spicyArray: [
        { value: 'no', name: '不辣' },
        { value: 'mild', name: '微辣' },
        { value: 'mildMedium', name: '小辣' },
        { value: 'medium', name: '中辣' },
        { value: 'hot', name: '大辣' }
      ],
      // 加量的價錢為讀取用，不供修改
      extraPrice: 25
    }
  },
  computed: {
    // 商品表單的價格小計
    subtotal () {
      const productPrice = this.mealPropped.price

      let setMenuPrice = 0
      this.setMenus.forEach(set => {
        if (set.setMenuId === this.productUserSettings.setMenuRadio) {
          setMenuPrice = set.setMenuPrice
        }
      })

      const extraPrice = this.productUserSettings.extra ? 25 : 0
      const count = this.productUserSettings.count

      return (productPrice + setMenuPrice + extraPrice) * count
    }
  },
  methods: {
    // 增加數字框的數字
    plusCount () {
      let number = this.productUserSettings.count
      number++
      this.productUserSettings.count = number
      this.checkCount()
    },
    // 減少數字框的數字，並檢查和校正數值
    minusCount () {
      let number = this.productUserSettings.count
      number--
      if (number < 1) {
        number = 1
      }
      this.productUserSettings.count = number
      this.checkCount()
    },
    // 觸發時檢查數值，並修改資料狀態
    checkCount () {
      if (this.productUserSettings.count < 1 || this.productUserSettings.count % 1 !== 0) {
        this.isInvalidCount = true
      } else {
        this.isInvalidCount = false
      }
    },
    // 加入購物車，可以拆解成：檢查數量值、整理資料、推送資料、關閉商品表單、復原表單資料狀態
    addToCart () {
      this.checkCount()
      if (this.isInvalidCount) { return }

      const mealObject = { ...this.mealPropped }

      let setMenuObject = {}
      this.setMenus.forEach(set => {
        if (set.setMenuId === this.productUserSettings.setMenuRadio) {
          setMenuObject = { ...set }
        }
      })

      let spicyObject = {}
      this.spicyArray.forEach(option => {
        if (option.value === this.productUserSettings.spicy) {
          spicyObject = { ...option }
        }
      })

      const extraObject = {
        value: this.productUserSettings.extra,
        price: this.productUserSettings.extra ? 25 : 0,
        name: this.productUserSettings.extra ? '加量' : ''
      }

      const notes = this.productUserSettings.notes
      const count = this.productUserSettings.count

      const subtotal = this.subtotal
      const dateTime = new Date().getTime()

      const entireObject = {
        mealObject,
        setMenuObject,
        spicyObject,
        extraObject,
        notes,
        count,
        subtotal,
        dateTime
      }

      this.cartData.push(entireObject)
      // console.log('加入購物車：', entireObject)

      this.modal.hide()
      this.clearProductSettings()
    },
    // 將商品視窗的表單復原到預設值
    clearProductSettings () {
      this.productUserSettings = {
        setMenuRadio: 'No',
        spicy: 'no',
        extra: false,
        notes: '',
        count: 0
      }
      this.isInvalidCount = false
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, {
      backdrop: 'static',
      keyboard: false
    })
    // console.log(this.diningFinished.value)
  },
  beforeUnmount () {
    this.modal.hide()
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}

.modal {
  .form-check-input:checked {
    background-color: var(--color-F5B841);
    border-color: var(--color-F5B841);
  }
}
</style>
