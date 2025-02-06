<template>
  <MainNavBar></MainNavBar>
  <router-view :diningHours="diningHours" />
</template>

<script setup>
import { computed, provide, ref, watch } from 'vue'
import MainNavBar from '@/components/application/MainNavBar.vue'
import mealPrice from '@/assets/meal-price.json'

// 類別與餐點清單
const categoryList = ref(JSON.parse(sessionStorage.getItem('categoryList')) || [])
const mealList = ref(JSON.parse(sessionStorage.getItem('mealList')) || [])

if (!mealList.value.length) {
  getData()
}

provide('categoryList', categoryList)
provide('mealList', mealList)

// 這裡串接的是TheMealDB.com的食譜API，雖然本專案本身需要的是餐廳的食物餐點資料，但可以借用此API的一些欄位使用。
async function getData () {
  try {
    // 取得食物種類
    const responseCategory = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')).json()
    categoryList.value.splice(0, categoryList.value.length, ...responseCategory.meals.map(obj => obj.strCategory))
    // console.log('餐點類別建立完成。種類：', categoryList.value)
    sessionStorage.setItem('categoryList', JSON.stringify(categoryList.value))

    // 取得食物價格之模擬資料
    const mealPriceData = mealPrice
    let index = 0
    // console.log('mealPriceData:', mealPriceData)

    // 依據每個種類，分別請求對應的食物清單
    for (const category of categoryList.value) {
      const responseMeal = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)).json()
      responseMeal.meals.forEach(mealObject => {
        mealObject.category = category
        mealObject.price = mealPriceData[index]
        mealList.value.push(mealObject)
        index++
      })
    }
    // console.log('餐點清單建立完成。前十項：', mealList.value.slice(0, 10))
    sessionStorage.setItem('mealList', JSON.stringify(mealList.value))
  } catch (err) {
    console.error(err)
  }
}

// 桌號
const tableNumber = ref(JSON.parse(sessionStorage.getItem('tableNumber')) || '')
provide('tableNumber', tableNumber)
watch(tableNumber, (newVal) => {
  sessionStorage.setItem('tableNumber', JSON.stringify(newVal))
})

// 用餐人數
const guestsCount = ref(JSON.parse(sessionStorage.getItem('guestsCount')) || 1)
provide('guestsCount', guestsCount)
watch(
  guestsCount,
  (newVal) => {
    sessionStorage.setItem('guestsCount', JSON.stringify(newVal))
  },
  { immediate: true }
)

// 購物車
const cartData = ref(JSON.parse(sessionStorage.getItem('cartData')) || [])
provide('cartData', cartData)
watch(
  cartData,
  (newVal) => {
    sessionStorage.setItem('cartData', JSON.stringify(newVal))
  },
  { deep: true }
)

// 訂單紀錄
const orderHistory = ref(JSON.parse(sessionStorage.getItem('orderHistory')) || [])
provide('orderHistory', orderHistory)
watch(
  orderHistory,
  (newVal) => {
    sessionStorage.setItem('orderHistory', JSON.stringify(newVal))
  },
  { deep: true }
)

// 付款狀態
const paymentStatus = ref(JSON.parse(sessionStorage.getItem('paymentStatus')) || '')
// 是否用餐完成
const diningFinished = ref(JSON.parse(sessionStorage.getItem('diningFinished')) || false)

provide('paymentStatus', paymentStatus)
watch(paymentStatus, (newVal) => {
  sessionStorage.setItem('paymentStatus', JSON.stringify(newVal))
  if (newVal === 'payOnSite' || newVal === 'succeed') {
    diningFinished.value = true // 依賴diningFinished
  }
})

provide('diningFinished', diningFinished)
watch(diningFinished, (newVal) => {
  sessionStorage.setItem('diningFinished', JSON.stringify(newVal))
})

// 當前時間（應用程式啟動時）
const dateTime = ref(new Date())
const diningHours = computed(() => {
  const hour = dateTime.value.getHours()
  if (hour >= 11 && hour < 14) {
    return ['中午用餐時間：11:00~14:30', '最後點餐時間：14:00']
  } else if (hour >= 17 && hour < 21) {
    return ['晚上用餐時間：17:00~21:00', '最後點餐時間：20:30']
  } else {
    return ['休息中', '']
  }
})
</script>

<style lang="scss">
@import "./scss/all.scss";
$bootstrap-icons-font-dir: "~bootstrap-icons/font/fonts";
@import "~bootstrap-icons/font/bootstrap-icons.scss";

body {
  padding-bottom: calc(var(--reserve-space-panel, 0px) + var(--reserve-space-totop, 0px));
}

body:has(.fixed-bottom) {
  --reserve-space-panel: 60px;
}

body:has(#toTopBtn) {
  --reserve-space-totop: 45px;
}

.modal-sm-unresponsive {
  max-width: 300px;
  margin-right: auto;
  margin-left: auto;
}

.modal {
  .form-check-input:checked {
    background-color: var(--bs-honey-gold);
    border-color: var(--bs-honey-gold);
  }

  textarea {
    resize: none;
  }
}
</style>
