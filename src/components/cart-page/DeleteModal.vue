<template>
  <div id="deleteModal" ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-sm-unresponsive">
      <div class="modal-content">
        <div class="modal-body text-center" style="padding: 1.5rem 1.5rem 1rem">
          <h1 class="fs-5">確定要刪除此品項嗎？</h1>
          <p class="mb-0 text-body-secondary">{{ mealInfo.strMeal }}</p>
        </div>

        <div class="modal-footer justify-content-evenly border-top-0">
          <button
            class="btn btn-outline-secondary"
            data-bs-target="#editModal"
            data-bs-toggle="modal"
            @click="backToEditing"
          >
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

<script setup>
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'

const emitter = inject('emitter')

// 接收餐點資訊，以呈現在畫面上
const mealInfo = ref({})
emitter.on('deleteItem', (item) => {
  mealInfo.value = item
})
onBeforeUnmount(() => {
  emitter.off('deleteItem')
})

// Modal視窗
const modal = ref(null)
const modalInstance = ref(null)
onMounted(() => {
  modalInstance.value = new Modal(modal.value)
})
onBeforeUnmount(() => {
  modalInstance.value.hide()
})
defineExpose({ modalInstance })

// 返回編輯或確定刪除，交給另一個元件處理
function backToEditing() {
  emitter.emit('cancelDeleting')
}

function confirmDeleting() {
  emitter.emit('confirmDeleting')
}
</script>
