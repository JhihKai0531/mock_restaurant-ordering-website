<template>
  <nav class="navbar navbar-expand-lg bg-warning-subtle">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><span class="lead">肉之家</span><span class="fs-6" style="color: rgb(207 160 13);">異國料理</span></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view :diningHours="diningHours" />
</template>

<script>
import setMenuJson from '@/assets/set_menu.json'
import 'bootstrap'

export default {
  data () {
    return {
      categoryList: [],
      mealList: [],
      setMenuList: [],
      dateTime: '',
      tableNumber: '',
      guestsCount: ''
    }
  },
  computed: {
    diningHours () {
      if (this.dateTime.getHours() >= 11 && this.dateTime.getHours() < 14) {
        return '中午用餐時間：11:00~14:00'
      } else if (this.dateTime.getHours() >= 17 && this.dateTime.getHours() < 21) {
        return '晚上用餐時間：17:00~21:00'
      } else {
        return '休息中'
      }
    }
  },
  provide () {
    return {
      categoryList: this.categoryList,
      mealList: this.mealList,
      setMenuList: this.setMenuList
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
          // console.log('list of categories:', this.categoryList)
          console.log('餐點類別建立完成。種類：', this.categoryList)

          // 依據每個種類，分別請求對應的食物清單
          for (const category of this.categoryList) {
            const responseMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            const jsonMeal = await responseMeal.json()
            jsonMeal.meals.forEach(mealObject => {
              mealObject.category = category
              mealObject.price = Math.floor(Math.random() * (425 - 50)) + 50 // 因為API本身沒有食物單價，這裡手動生成隨機價錢。
              this.mealList.push(mealObject)
            })
          }
          // console.log('list of meals:', this.mealList)
          console.log('餐點清單建立完成。前十項：', this.mealList.slice(0, 10))

          // 取得套餐資料，套餐資料為本地建立
          setMenuJson.forEach(set => {
            this.setMenuList.push(set)
          })
          // console.log('list of set menus:', this.setMenuList)
          console.log('套餐列表建立完成。套餐：', this.setMenuList)
        } catch (err) {
          console.error(err)
        }
      })()
    },
    calcDateTime () {
      this.dateTime = new Date()
    }
  },
  created () {
    this.getData()
    this.calcDateTime()
  }
}
</script>

<style lang="scss">
@import 'Bootstrap';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
