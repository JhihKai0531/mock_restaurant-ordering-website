<template>
  <div class="container-fluid">

    <!-- 整張商品列表都在這個row中 -->
    <div class="row row-cols-1" :class="layoutClasses.rowCols">

      <!-- 將每個商品裝在一個col內 -->
      <div v-for="(meal, index) in mealsOfType" :key="meal.idMeal" :class="{'d-none': listIsHidden[index]}">
        <div class="col mb-3"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
          :title="meal.strMeal"
          @click="$emit('selectProduct', meal)"
        >
          <!-- 商品項目內的網格系統 -->
          <div class="row" :class="layoutClasses.innerRow">
            <div class="" :class="layoutClasses.imgCol">
              <img :src="meal.strMealThumb" class="img-fluid rounded" :alt="meal.strMeal">
            </div>

            <div class="d-flex flex-column justify-content-between" :class="layoutClasses.textCol">
              <h5 class="line-clamp">{{ meal.strMeal }}</h5>
              <p class="mb-0">{{ `NT$ ${meal.price}` }}</p>
            </div>
          </div>
        </div>

        <!-- 分隔線 -->
        <hr>

      </div>

    </div>

    <div v-if="listIsHidden.every(val => val) && listIsHidden.length">
      <h2 class="text-center text-body-tertiary mt-3">沒有找到商品</h2>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const emitter = inject('emitter')
const router = useRouter()

const props = defineProps(['category'])

// 渲染出商品
const mealList = inject('mealList')

const mealsOfType = computed(() => {
  return mealList.value.filter(item => item.category === props.category)
})

// 如果沒有匹配的類別（例如路徑為'/Bee'），就重新導向
watchEffect(() => {
  if (!mealsOfType.value.length) router.replace('/Beef')
})

// 切換版面
const layout = ref('listLayout')

const layoutSet = ref({
  squareLayout: {
    rowCols: ['row-cols-md-3', 'row-cols-sm-2', 'gx-5'],
    innerRow: ['flex-column', 'align-items-center', 'gx-0', 'gy-3', 'mt-0'],
    imgCol: ['col-8'],
    textCol: ['col-12']
  },
  listLayout: {
    rowCols: ['row-cols-md-2'],
    innerRow: ['gx-3'],
    imgCol: ['col-4'],
    textCol: ['col-8']
  }
})

const layoutClasses = computed(() => layoutSet.value[layout.value])

function switchLayout (str) {
  layout.value = str
}

emitter.on('switchLayout', switchLayout)

// 搜尋商品
// 使用display: none隱藏列表，而不是v-show顯示列表，因為陣列裡面一開始沒有資料
const listIsHidden = ref([])

function filterSearch (search) {
  const strMeals = mealsOfType.value.map(item => item.strMeal)
  const mapping = strMeals.map(str => !str.toUpperCase().includes(search.toUpperCase()))
  listIsHidden.value.splice(0, listIsHidden.value.length, ...mapping)
}

emitter.on('filterSearch', filterSearch)
</script>

<style scoped>
[data-bs-toggle="modal"] {
  cursor: pointer;

  &:hover {
    background-color: rgb(0 0 0 / 0.04);
    box-shadow: 0 0 0 6px rgb(0 0 0 / 0.04);
    transition: background-color 200ms, box-shadow 200ms;
  }
}

/* 解決方案來源：https://stackoverflow.com/questions/33058004/applying-an-ellipsis-to-multiline-text */
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
