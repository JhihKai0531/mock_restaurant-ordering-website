<template>
  <div>
    <div class="input-group my-3">

      <span class="input-group-text border-0">
        <i class="bi bi-search"></i>
      </span>

      <input v-model.trim="search" type="search" class="form-control border-0 bg-body-tertiary" placeholder="輸入以搜尋商品..." @input="emitSearch">

      <!-- 選擇商品清單版面模式 -->
      <div class="input-group-text border-0" title="切換版面">
        <input id="squareLayout" v-model="layout" class="btn-check" type="radio" value="squareLayout" @change="emitLayout">
        <label class="btn px-2 py-1 fs-5" for="squareLayout">
          <i class="bi bi-square-fill"></i>
        </label>

        <input id="listLayout" v-model="layout" class="btn-check" type="radio" value="listLayout" @change="emitLayout">
        <label class="btn px-2 py-1 fs-5" for="listLayout">
          <i class="bi bi-list-ul"></i>
        </label>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  inject: ['mealList'],
  data () {
    return {
      search: '',
      layout: 'listLayout'
    }
  },
  methods: {
    emitSearch () {
      this.emitter.emit('filterSearch', this.search)
    },
    emitLayout () {
      this.emitter.emit('switchLayout', this.layout)
    }
  }
}
</script>

<style scoped>
.btn-check + .btn {
  color: #888;
  border: none;
}

.btn-check:checked + .btn {
  color: var(--bs-tertiary-bg);
  background-color: var(--bs-wine-red);
}
</style>
