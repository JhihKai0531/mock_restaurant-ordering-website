<template>
  <div id="deleteModel" ref="modal" class="modal fade" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">

      <div class="modal-body text-center" style="padding: 1.5rem 1.5rem 1rem;">
        <h1 class="fs-5">確定要刪除此品項嗎？</h1>
        <p class="mb-0 text-body-secondary">{{ mealInfo.strMeal }}</p>
      </div>

      <div class="modal-footer justify-content-evenly border-top-0">
        <button class="btn btn-outline-secondary" data-bs-target="#editModal" data-bs-toggle="modal" @click="backToEditing">
          返回編輯
        </button>
        <button class="btn btn-danger" data-bs-dismiss="modal" @click="confirmDeleting">
          確定刪除
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  inject: ['cartData'],
  data () {
    return {
      // Bootstrap互動視窗
      modal: {},
      mealInfo: {}
    }
  },
  methods: {
    backToEditing () {
      this.emitter.emit('cancelDeleting')
    },
    confirmDeleting () {
      this.emitter.emit('confirmDeleting')
    }
  },
  created () {
    this.emitter.on('deleteItem', item => {
      this.mealInfo = item
    })
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  },
  beforeUnmount () {
    this.modal.hide()
    this.emitter.off('deleteItem')
  }
}
</script>

<style scoped>
.modal-sm {
  max-width: 300px;
  margin-right: auto;
  margin-left: auto;
}
</style>
