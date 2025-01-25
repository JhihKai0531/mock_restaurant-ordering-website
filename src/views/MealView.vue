<template>
  <div class="container-fluid">

    <!-- 整張商品列表都在這個row中 -->
    <div class="row row-cols-1 row-cols-md-2">

      <!-- 將每張卡片裝在一個col內 -->
      <div v-for="(meal, index) in mealsOfType" :key="meal.idMeal" :class="{'d-none': listIsHidden[index]}">
        <div class="col mb-3"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
          :title="meal.strMeal"
          @click="$emit('selectProduct', meal)"
        >
          <!-- 卡片內的網格系統 -->
          <div class="row gx-3">
            <div class="col-4">
              <img :src="meal.strMealThumb" class="img-fluid rounded" :alt="meal.strMeal">
            </div>

            <div class="col-8 d-flex flex-column justify-content-between">
              <h5 class="line-clamp">{{ meal.strMeal }}</h5>
              <p class="mb-0">{{ `NT$ ${meal.price}` }}</p>
            </div>
          </div>
        </div>
        <hr>
      </div>

    </div>

    <div v-if="listIsHidden.every(val => val) && listIsHidden.length">
      <h2 class="text-center text-body-tertiary mt-3">沒有找到商品</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ['category'],
  inject: ['mealList'],
  data () {
    return {
      listIsHidden: []
    }
  },
  computed: {
    mealsOfType () {
      const filtered = this.mealList.filter(item => {
        return item.category === this.category
      })

      // 如果意外地沒有匹配的類別，就重新導向
      if (!filtered.length) {
        this.$router.replace('/Beef')
      }

      return filtered
    }
  },
  methods: {
    filterSearch (search) {
      const strMeals = this.mealsOfType.map(item => item.strMeal)
      const mapping = strMeals.map(str => !str.toUpperCase().includes(search.toUpperCase()))
      this.listIsHidden.splice(0, this.listIsHidden.length, ...mapping)
    }
  },
  created () {
    this.emitter.on('filterSearch', this.filterSearch)
  }
}
</script>

<style scoped>
[data-bs-toggle="modal"] {
  cursor: pointer;

  &:hover {
    background-color: rgb(0 0 0 / 0.04);
    box-shadow: 0 0 0 6px rgb(0 0 0 / 0.04);
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
