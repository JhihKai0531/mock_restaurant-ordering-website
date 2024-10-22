<template>
  <div class="container" v-if="category">
    <div class="row row-cols-1 row-cols-md-2 g-4 p-3">
      <div class="col" v-for="meal in mealsOfType" :key="meal.idMeal">
        <div class="card bg-warning bg-gradient overflow-hidden" style="--bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));">
          <div class="row g-0">
            <div class="col-4"><img :src="meal.strMealThumb" class="img-fluid shadow-sm" style="--bs-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);" :alt="meal.strMeal"></div>
            <div class="col-8">
              <div class="card-body">
                <h5 class="card-title">{{ meal.strMeal }}</h5>
                <p class="card-text">{{ `NT$ ${meal.price}` }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="h2 text-center py-4 text-light" style="height: 80vh; background-color: #888;">請選擇餐點類別</p>
</template>

<script>
export default {
  props: ['category'],
  inject: ['mealList'],
  computed: {
    mealsOfType () {
      return this.mealList.filter(item => {
        return item.category === this.category
      })
    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style scoped>

</style>
