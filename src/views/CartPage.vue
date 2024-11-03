<template>
  <div class="container px-4 py-3">
    <form>
      <!-- 桌號 -->
      <div class="row justify-content-between mb-3">
        <div class="col">
          <label for="tableNumberSelect" class="col-form-label">內用桌號</label>
        </div>
        <div class="col">
          <select id="tableNumberSelect" class="form-select" v-model="tableNumber.value" :class="{'is-invalid': isInvalidTableNumber}" @="{change: checkTableNumber}">
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
        <div class="col-2 text-center"><button type="button" title="減少" class="btn border-0" @click="minusGuestsCount" :disabled="guestsCount.value <= 1"><i class="bi bi-dash-lg"></i></button></div>
        <div class="col-3">
          <input type="number" min="1" id="guestsCountInput" class="form-control" :class="{'is-invalid': isInvalidGuestsCount}" v-model.number="guestsCount.value" @="{input: checkGuestsCount, focusout: checkGuestsCount}">
          <div class="invalid-feedback">請輸入有效人數</div>
        </div>
        <div class="col-2 text-center"><button type="button" title="增加" class="btn" @click="plusGuestsCount"><i class="bi bi-plus-lg"></i></button></div>
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
    <EditWindow :cartItemPropped="cartItemProps" ref="editModal"></EditWindow>
    <DeleteModal ref="deleteModel"></DeleteModal>
    <div v-show="cartData.length">
      <!-- 購物車，以表格呈現。當中的插槽用來填入購物車金額小計。 -->
      <CartItemTable @editProduct="editProduct">
        {{ `NT$${cartSubtotal}` }}
      </CartItemTable>
      <button type="button" class="btn btn-warning fixed-bottom btn-lg" @click="submitCartData">送出訂單</button>
    </div>
  </div>
</template>

<script>
import CartItemTable from '@/components/CartItemTable.vue'
import EditWindow from '@/components/EditWindow.vue'
import DeleteModal from '@/components/DeleteModal.vue'

export default {
  inject: ['cartData', 'guestsCount', 'tableNumber', 'orderHistory'],
  components: { CartItemTable, EditWindow, DeleteModal },
  data () {
    return {
      isInvalidTableNumber: false,
      isInvalidGuestsCount: false,
      cartItemProps: {},
      cartSubtotal: 0
    }
  },
  watch: {
    cartData: {
      deep: true,
      handler (newValue, oldValue) {
        // console.log('頁面Watch偵測購物車，新值：', newValue)
        this.calcCartSubtotal()
      }
    }
  },
  provide () {
    return {
      cartSubtotal: this.cartSubtotal
    }
  },
  methods: {
    checkTableNumber () {
      if (!this.tableNumber.value) {
        this.isInvalidTableNumber = true
      } else {
        this.isInvalidTableNumber = false
      }
    },
    checkGuestsCount () {
      if (this.guestsCount.value < 1 || this.guestsCount.value % 1 !== 0) {
        this.isInvalidGuestsCount = true
      } else {
        this.isInvalidGuestsCount = false
      }
    },
    plusGuestsCount () {
      let number = this.guestsCount.value
      number++
      this.guestsCount.value = number
      this.checkGuestsCount()
    },
    minusGuestsCount () {
      let number = this.guestsCount.value
      number--
      if (number < 1) {
        number = 1
      }
      this.guestsCount.value = number
      this.checkGuestsCount()
    },
    calcCartSubtotal () {
      let result = 0
      this.cartData.forEach(item => {
        result += item.subtotal
      })
      this.cartSubtotal = result
      // console.log('計算總和：', this.cartSubtotal)
    },
    editProduct (cartItem) {
      this.cartItemProps = cartItem
    },
    directToPage (path) {
      this.$router.push(path)
    },
    submitCartData () {
      this.checkTableNumber()
      this.checkGuestsCount()
      if (this.isInvalidTableNumber || this.isInvalidGuestsCount) { return }
      const currentTime = new Date()
      const confirmedData = {
        cart: this.cartData,
        cartSubtotal: this.cartSubtotal,
        tableNumber: this.tableNumber,
        guestsCount: this.guestsCount,
        dateTime: currentTime.getTime()
      }
      const stringifiedData = JSON.stringify(confirmedData)
      const parsedData = JSON.parse(stringifiedData)
      this.orderHistory.push(parsedData)
      // console.log('送出訂單！', parsedData)
      // 清空陣列
      this.cartData.length = 0
      this.directToPage('/order-history')
    }
  },
  created () {
    this.calcCartSubtotal()
  },
  beforeRouteLeave (to, from) {
    if (document.getElementById('editModal').classList.contains('show') || document.getElementById('deleteModel').classList.contains('show')) {
      this.$refs.editModal.modal.hide()
      this.$refs.deleteModel.modal.hide()
      return false
    }
  }
}
</script>
