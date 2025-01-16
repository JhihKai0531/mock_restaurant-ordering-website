<template>
  <MainNavBar></MainNavBar>
  <router-view :diningHours="diningHours" />
</template>

<script>
import MainNavBar from '@/components/MainNavBar.vue'
import mealPrice from '@/assets/meal-price.json'

export default {
  components: {
    MainNavBar
  },
  data () {
    return {
      categoryList: JSON.parse(localStorage.getItem('categoryList')) || [],
      mealList: JSON.parse(localStorage.getItem('mealList')) || [],
      dateTime: '',
      tableNumber: JSON.parse(localStorage.getItem('tableNumber')) || { value: '' },
      guestsCount: JSON.parse(localStorage.getItem('guestsCount')) || { value: 1 },
      cartData: JSON.parse(localStorage.getItem('cartData')) || [],
      orderHistory: JSON.parse(localStorage.getItem('orderHistory')) || [],
      paymentStatus: JSON.parse(localStorage.getItem('paymentStatus')) || { value: '' },
      diningFinished: JSON.parse(localStorage.getItem('diningFinished')) || { value: false }
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
        localStorage.setItem('paymentStatus', JSON.stringify(newValue))
        if (newValue.value === 'payOnSite' || newValue.value === 'succeed') {
          this.diningFinished.value = true
        }
      }
    },
    cartData: {
      deep: true,
      handler (newValue) {
        localStorage.setItem('cartData', JSON.stringify(newValue))
      }
    },
    orderHistory: {
      deep: true,
      handler (newValue) {
        localStorage.setItem('orderHistory', JSON.stringify(newValue))
      }
    },
    tableNumber: {
      deep: true,
      handler (newValue) {
        localStorage.setItem('tableNumber', JSON.stringify(newValue))
      }
    },
    guestsCount: {
      deep: true,
      handler (newValue) {
        localStorage.setItem('guestsCount', JSON.stringify(newValue))
      }
    },
    diningFinished: {
      deep: true,
      handler (newValue) {
        localStorage.setItem('diningFinished', JSON.stringify(newValue))
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
          localStorage.setItem('categoryList', JSON.stringify(this.categoryList))

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
          localStorage.setItem('mealList', JSON.stringify(this.mealList))
        } catch (err) {
          console.error(err)
        }
      })()
    },
    recordLeaveTime () {
      localStorage.setItem('leaveTime', new Date().getTime())
    }
  },
  beforeCreate () {
    // 如果最後離開的時間，距離再次進入網頁超過3個小時，則重置資料
    const current = new Date().getTime()
    const lastLeft = Number(localStorage.getItem('leaveTime')) || 0
    const threeHours = 1000 * 60 * 60 * 3

    if (current - lastLeft > threeHours) {
      localStorage.clear()
    }
  },
  created () {
    // 如果菜單裡面已經有資料了，就不再進行請求
    if (!this.mealList.length) {
      this.getData()
    }

    this.dateTime = new Date()
  },
  mounted () {
    window.addEventListener('beforeunload', this.recordLeaveTime)
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
</style>
