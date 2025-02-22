<template>
  <div class="card">
    <ul class="list-group list-group-flush">
      <li v-for="item in cartData" :key="item.dateTime" class="list-group-item">
        <div class="row mb-2">
          <div class="col-8 fw-bolder">
            {{ item.mealObject.strMeal }}
            <br />
            {{ `×${item.count}` }}
          </div>
          <div class="col-4 text-end">
            <button
              type="button"
              class="btn btn-outline-rosewood"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              :disabled="diningFinished"
              @click="emitCartItem(item)"
            >
              編輯
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-9 ps-4 text-body-secondary">
            <div class="custom-info">
              <span>{{ item.setMenuObject.setMenuName }}</span>
              <span>{{ item.spicyObject.name }}</span>
              <span v-show="item.extraObject.name">{{ item.extraObject.name }}</span>
            </div>
            <div>
              <details>
                <summary>備註</summary>
                <div class="ps-3">{{ item.notes || '無' }}</div>
              </details>
            </div>
          </div>
          <div class="col-3 text-end">
            <b>{{ `$${item.subtotal}` }}</b>
          </div>
        </div>
      </li>
    </ul>

    <div class="card-footer">
      <div class="row text-body fw-semibold">
        <div class="col">小計</div>
        <div class="col text-end">
          <slot>未計算</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const emit = defineEmits(['editProduct'])

const cartData = inject('cartData')
const diningFinished = inject('diningFinished')

function emitCartItem(item) {
  const mealItem = item.mealObject
  const dateTime = item.dateTime
  const options = {
    setMenuRadio: item.setMenuObject.setMenuId,
    spicy: item.spicyObject.value,
    extra: item.extraObject.value,
    notes: item.notes,
    count: item.count,
  }
  emit('editProduct', { mealItem, options, dateTime })
}
</script>

<style scoped>
.custom-info > :not(:first-child)::before {
  content: ' ‧ ';
}
</style>
