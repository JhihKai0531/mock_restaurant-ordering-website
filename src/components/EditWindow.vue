<template>
  <div class="modal fade" id="editModal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">編輯餐點</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="clearProductSettings"></button>
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
              <div class="form-check" v-for="set in setMenus" :key="set.setMenuId">
                <input class="form-check-input" type="radio" :id="`${set.setMenuId}_E`" :value="set.setMenuId" v-model="productUserEditing.setMenuRadio">
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
              <div class="form-check form-check-inline" v-for="item in spicyArray" :key="item.value">
                <input class="form-check-input" type="radio" :id="`${item.value}_E`" :value="item.value" v-model="productUserEditing.spicy">
                <label class="form-check-label" :for="`${item.value}_E`">
                  {{ item.name }}
                </label>
              </div>
            </fieldset>
            <!-- 加量 -->
            <fieldset>
              <legend class="col-form-label">加量</legend>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="extraCheckbox_E" v-model="productUserEditing.extra">
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
              <textarea class="form-control" id="notesText_E" rows="3" v-model.lazy="productUserEditing.notes"></textarea>
            </fieldset>
            <!-- 數量 -->
            <fieldset>
              <label class="col-form-label" for="count_E">數量</label>
              <div class="row gx-0">
                <div class="col-2 text-center"><button type="button" class="btn border-0" @click="minusCount" :disabled="productUserEditing.count <= 1"><i class="bi bi-dash-lg"></i></button></div>
                <div class="col-4">
                  <input class="form-control" :class="{'is-invalid': isInvalidCount}" type="number" id="count_E" v-model.number="productUserEditing.count" min="1" @="{input: checkCount, focusout: checkCount}">
                  <div class="invalid-feedback">請輸入正整數</div>
                </div>
                <div class="col-2 text-center"><button type="button" class="btn" @click="plusCount"><i class="bi bi-plus-lg"></i></button></div>
              </div>
            </fieldset>
            <p class="text-end h5 mt-3">
              {{ `小計：NT$ ${subtotal} 元` }}
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger me-auto px-3" data-bs-target="#deleteModel" data-bs-toggle="modal" @click="askToDelete">刪除</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clearProductSettings">取消</button>
            <button type="button" class="btn btn-warning" @click="finishEditing">確認編輯</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import setMenuJson from '@/assets/set_menu.json'
import { Modal } from 'bootstrap'
export default {
  props: ['cartItemPropped'],
  inject: ['cartData'],
  data () {
    return {
      // Bootstrap互動視窗
      modal: {},
      // 如果因為錯誤導致資料沒有傳進來，至少先給個初始值
      productUserEditing: {
        setMenuRadio: 'No',
        spicy: 'no',
        extra: false,
        notes: '',
        count: 0
      },
      // 餐點資訊先給個空物件，再利用生命週期修改它
      mealInfo: {},
      // 以下同ProductWindow.vue
      isInvalidCount: false,
      setMenus: setMenuJson,
      spicyArray: [
        { value: 'no', name: '不辣' },
        { value: 'mild', name: '微辣' },
        { value: 'mildMedium', name: '小辣' },
        { value: 'medium', name: '中辣' },
        { value: 'hot', name: '大辣' }
      ],
      extraPrice: 25
    }
  },
  computed: {
    // 商品表單的價格小計
    subtotal () {
      const productPrice = this.mealInfo.price
      let setMenuPrice = 0
      this.setMenus.forEach(set => {
        if (set.setMenuId === this.productUserEditing.setMenuRadio) {
          setMenuPrice = set.setMenuPrice
        }
      })
      const extraPrice = this.productUserEditing.extra ? 25 : 0
      const count = this.productUserEditing.count
      return (productPrice + setMenuPrice + extraPrice) * count
    }
  },
  methods: {
    // 在beforeUpdate觸發這兩個事件，對本地的data賦值
    setEditingOptions () {
      this.productUserEditing = this.cartItemPropped.options
    },
    setMealInfo () {
      this.mealInfo = this.cartItemPropped.mealItem
    },
    // 增加數字框的數字
    plusCount () {
      let number = this.productUserEditing.count
      number++
      this.productUserEditing.count = number
      this.checkCount()
    },
    // 減少數字框的數字，並檢查和校正數值
    minusCount () {
      let number = this.productUserEditing.count
      number--
      if (number < 1) {
        number = 1
      }
      this.productUserEditing.count = number
      this.checkCount()
    },
    // 觸發時檢查數值，並修改資料狀態
    checkCount () {
      if (this.productUserEditing.count < 1 || this.productUserEditing.count % 1 !== 0) {
        this.isInvalidCount = true
      } else {
        this.isInvalidCount = false
      }
    },
    // 完成修改時的動作
    finishEditing () {
      this.checkCount()
      if (this.isInvalidCount) { return }
      const mealObject = { ...this.mealInfo }
      let setMenuObject = {}
      this.setMenus.forEach(set => {
        if (set.setMenuId === this.productUserEditing.setMenuRadio) {
          setMenuObject = { ...set }
        }
      })
      let spicyObject = {}
      this.spicyArray.forEach(option => {
        if (option.value === this.productUserEditing.spicy) {
          spicyObject = { ...option }
        }
      })
      const extraObject = {
        value: this.productUserEditing.extra,
        price: this.productUserEditing.extra ? 25 : 0,
        name: this.productUserEditing.extra ? '加量' : ''
      }
      const notes = this.productUserEditing.notes
      const count = this.productUserEditing.count
      const subtotal = this.subtotal
      const dateTime = this.cartItemPropped.dateTime
      const editedObject = {
        mealObject,
        setMenuObject,
        spicyObject,
        extraObject,
        notes,
        count,
        subtotal,
        dateTime
      }
      // 透過陣列splice去替換資料
      this.cartData.forEach((item, index) => {
        if (item.dateTime === editedObject.dateTime) {
          this.cartData.splice(index, 1, editedObject)
        }
      })
      console.log('修改完成：', editedObject, '\n目前購物車', this.cartData)
      this.modal.hide()
      this.clearProductSettings()
    },
    askToDelete () {
      this.emitter.emit('deleteItem', this.mealInfo)
      this.isInvalidCount = false
    },
    deleteCartItem () {
      const dateTime = this.cartItemPropped.dateTime
      this.cartData.forEach((item, index) => {
        if (item.dateTime === dateTime) {
          this.cartData.splice(index, 1)
        }
      })
      console.log('刪除一項餐點，目前購物車', this.cartData)
    },
    // 將商品視窗的表單復原到預設值
    clearProductSettings () {
      this.productUserEditing = {
        setMenuRadio: 'No',
        spicy: 'no',
        extra: false,
        notes: '',
        count: 0
      }
      this.isInvalidCount = false
    }
  },
  created () {
    // console.log('created, cartItemPropped', this.cartItemPropped)
    // console.log('created, productUserEditing', this.productUserEditing)
    this.emitter.on('cancelDeleting', () => {
      this.checkCount()
    })
    this.emitter.on('confirmDeleting', this.deleteCartItem)
  },
  beforeUpdate () {
    this.setMealInfo()
    this.setEditingOptions()
    // console.log('beforeUpdate, cartItemPropped', this.cartItemPropped)
    // console.log('beforeUpdate, productUserEditing', this.productUserEditing)
  },
  updated () {
    // console.log('updated, cartItemPropped', this.cartItemPropped)
    // console.log('updated, productUserEditing', this.productUserEditing)
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, {
      backdrop: 'static',
      keyboard: false
    })
  },
  beforeUnmount () {
    this.emitter.off('cancelDeleting')
    this.emitter.off('confirmDeleting')
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}

.modal {
  --custom-check-color: rgb(224, 156, 9);

  /* .modal-header {
    background-color: var(--custom-check-color);
  } */

  .form-check-input:checked {
    background-color: var(--custom-check-color);
    border-color: var(--custom-check-color);
  }
}

</style>
