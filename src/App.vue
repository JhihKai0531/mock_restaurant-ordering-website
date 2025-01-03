<template>
  <MainNavBar></MainNavBar>
  <router-view :diningHours="diningHours" />
</template>

<script>
import MainNavBar from '@/components/MainNavBar.vue'

export default {
  components: {
    MainNavBar
  },
  data () {
    return {
      categoryList: [],
      mealList: [],
      dateTime: '',
      tableNumber: { value: '' },
      guestsCount: { value: 1 },
      cartData: [],
      orderHistory: [],
      paymentStatus: { value: '' },
      diningFinished: { value: false }
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
      handler (newValue, oldValue) {
        if (newValue.value === 'payOnSite' || newValue.value === 'succeed') {
          this.diningFinished.value = true
        }
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

          // 取得食物價格之模擬資料
          const mealPriceData = await this.parseCSV()
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
        } catch (err) {
          console.error(err)
        }
      })()
    },
    calcDateTime () {
      this.dateTime = new Date()
    },
    async parseCSV () {
      const response = await fetch('/meal-price.csv')
      const csvText = await response.text()
      const rows = csvText.split('\n').map(row => Number(row))
      return rows
    }
  },
  created () {
    this.getData()
    this.calcDateTime()
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
