<template>
  <MainNavBar></MainNavBar>
  <router-view :diningHours="diningHours" />
</template>

<script>
import MainNavBar from '@/components/application/MainNavBar.vue'
import mealPrice from '@/assets/meal-price.json'

export default {
  components: {
    MainNavBar
  },
  data () {
    return {
      categoryList: JSON.parse(sessionStorage.getItem('categoryList')) || [],
      mealList: JSON.parse(sessionStorage.getItem('mealList')) || [],
      dateTime: '',
      tableNumber: JSON.parse(sessionStorage.getItem('tableNumber')) || { value: '' },
      guestsCount: JSON.parse(sessionStorage.getItem('guestsCount')) || { value: 1 },
      cartData: JSON.parse(sessionStorage.getItem('cartData')) || [],
      orderHistory: JSON.parse(sessionStorage.getItem('orderHistory')) || [],
      paymentStatus: JSON.parse(sessionStorage.getItem('paymentStatus')) || { value: '' },
      diningFinished: JSON.parse(sessionStorage.getItem('diningFinished')) || { value: false }
    }
  },
  computed: {
    diningHours () {
      if (this.dateTime.getHours() >= 11 && this.dateTime.getHours() < 14) {
        return ['中午用餐時間：11:00~14:30', '最後點餐時間：14:00']
      } else if (this.dateTime.getHours() >= 17 && this.dateTime.getHours() < 21) {
        return ['晚上用餐時間：17:00~21:00', '最後點餐時間：20:30']
      } else {
        return ['休息中', '']
      }
    }
  },
  watch: {
    paymentStatus: {
      deep: true,
      handler (newValue) {
        sessionStorage.setItem('paymentStatus', JSON.stringify(newValue))
        if (newValue.value === 'payOnSite' || newValue.value === 'succeed') {
          this.diningFinished.value = true
        }
      }
    },
    cartData: {
      deep: true,
      handler (newValue) {
        sessionStorage.setItem('cartData', JSON.stringify(newValue))
      }
    },
    orderHistory: {
      deep: true,
      handler (newValue) {
        sessionStorage.setItem('orderHistory', JSON.stringify(newValue))
      }
    },
    tableNumber: {
      deep: true,
      handler (newValue) {
        sessionStorage.setItem('tableNumber', JSON.stringify(newValue))
      }
    },
    guestsCount: {
      deep: true,
      handler (newValue) {
        sessionStorage.setItem('guestsCount', JSON.stringify(newValue))
      }
    },
    diningFinished: {
      deep: true,
      handler (newValue) {
        sessionStorage.setItem('diningFinished', JSON.stringify(newValue))
      }
    }
  },
  provide () {
    return {
      categoryList: this.categoryList,
      mealList: this.mealList,
      cartData: this.cartData,
      guestsCount: this.guestsCount,
      tableNumber: this.tableNumber,
      orderHistory: this.orderHistory,
      paymentStatus: this.paymentStatus,
      diningFinished: this.diningFinished
    }
  },
  methods: {
    getData () {
      // 這裡串接的是TheMealDB.com的食譜API，雖然本專案本身需要的是餐廳的食物餐點資料，但可以借用此API的一些欄位使用。
      (async () => {
        try {
          // 取得食物種類
          const responseCategory = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
          const jsonCategory = await responseCategory.json()
          jsonCategory.meals.forEach(category => {
            this.categoryList.push(category.strCategory)
          })
          // console.log('餐點類別建立完成。種類：', this.categoryList)
          sessionStorage.setItem('categoryList', JSON.stringify(this.categoryList))

          // 取得食物價格之模擬資料
          const mealPriceData = mealPrice
          let index = 0
          // console.log('mealPriceData:', mealPriceData)

          // 依據每個種類，分別請求對應的食物清單
          for (const category of this.categoryList) {
            const responseMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            const jsonMeal = await responseMeal.json()

            jsonMeal.meals.forEach(mealObject => {
              mealObject.category = category
              mealObject.price = mealPriceData[index]
              this.mealList.push(mealObject)
              index++
            })
          }
          // console.log('餐點清單建立完成。前十項：', this.mealList.slice(0, 10))
          sessionStorage.setItem('mealList', JSON.stringify(this.mealList))
        } catch (err) {
          console.error(err)
        }
      })()
    }
  },
  created () {
    // 如果菜單裡面已經有資料了，就不再進行請求
    if (!this.mealList.length) {
      this.getData()
    }

    this.dateTime = new Date()
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
$bootstrap-icons-font-dir: "~bootstrap-icons/font/fonts";
@import "~bootstrap-icons/font/bootstrap-icons.scss";

body:has(.fixed-bottom) {
  padding-bottom: 60px;
}

:root {
  --color-822C41: #822C41;
  --color-F5B841: #F5B841;
  --color-FFEAC0: #FFEAC0;
  --color-898989: #898989;
  --color-6A041D: #6A041D;
  --color-AB7915: #AB7915;
}

.text-bg-822C41 {
  color: #FFF;
  background-color: var(--color-822C41);
}

.bg-FFEAC0 {
  background-color: var(--color-FFEAC0) !important;
}

.custom-link {
  color: #ab7915;
}

.btn-FFEAC0 {
  --bs-btn-color: #6A041D;
  --bs-btn-bg: #FFEAC0;
  --bs-btn-border-color: #FFEAC0;
  --bs-btn-hover-color: #6A041D;
  --bs-btn-hover-bg: #edd9b2;
  --bs-btn-hover-border-color: #edd9b2;
  --bs-btn-focus-shadow-rgb: 11, 172, 204;
  --bs-btn-active-color: #6A041D;
  --bs-btn-active-bg: #edd9b2;
  --bs-btn-active-border-color: #edd9b2;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #6A041D;
  --bs-btn-disabled-bg: #FFEAC0;
  --bs-btn-disabled-border-color: #FFEAC0;
}

.btn-6A041D {
  --bs-btn-color: #FFF;
  --bs-btn-bg: #6A041D;
  --bs-btn-border-color: #6A041D;
  --bs-btn-hover-color: #FFF;
  --bs-btn-hover-bg: #840b29;
  --bs-btn-hover-border-color: #840b29;
  --bs-btn-focus-shadow-rgb: 11, 172, 204;
  --bs-btn-active-color: #FFF;
  --bs-btn-active-bg: #840b29;
  --bs-btn-active-border-color: #840b29;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #FFF;
  --bs-btn-disabled-bg: #6A041D;
  --bs-btn-disabled-border-color: #6A041D;
}

.btn-822C41 {
  --bs-btn-color: #FFF;
  --bs-btn-bg: #822C41;
  --bs-btn-border-color: #822c41;
  --bs-btn-hover-color: #FFF;
  --bs-btn-hover-bg: #6a2d3d;
  --bs-btn-hover-border-color: #6a2d3d;
  --bs-btn-focus-shadow-rgb: 11, 172, 204;
  --bs-btn-active-color: #FFF;
  --bs-btn-active-bg: #6a2d3d;
  --bs-btn-active-border-color: #6a2d3d;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #FFF;
  --bs-btn-disabled-bg: #822C41;
  --bs-btn-disabled-border-color: #822C41;
}

.btn-outline-6A041D {
  --bs-btn-color: #6A041D;
  --bs-btn-border-color: #6A041D;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #6A041D;
  --bs-btn-hover-border-color: #6A041D;
  --bs-btn-focus-shadow-rgb: 13, 110, 253;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #6A041D;
  --bs-btn-active-border-color: #6A041D;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #6A041D;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #6A041D;
  --bs-gradient: none;
}

.btn-outline-AB7915 {
  --bs-btn-color: #AB7915;
  --bs-btn-border-color: #AB7915;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #AB7915;
  --bs-btn-hover-border-color: #AB7915;
  --bs-btn-focus-shadow-rgb: 13, 110, 253;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #AB7915;
  --bs-btn-active-border-color: #AB7915;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #AB7915;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #AB7915;
  --bs-gradient: none;
}

.btn-outline-822C41 {
  --bs-btn-color: #822C41;
  --bs-btn-border-color: #822C41;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #822C41;
  --bs-btn-hover-border-color: #822C41;
  --bs-btn-focus-shadow-rgb: 13, 110, 253;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #822C41;
  --bs-btn-active-border-color: #822C41;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #822C41;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #822C41;
  --bs-gradient: none;
}
</style>
