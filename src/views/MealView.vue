<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 g-4 p-3">
      <div v-for="meal in mealsOfType" :key="meal.idMeal" class="col">
        <div class="card bg-warning bg-gradient overflow-hidden"
          style="--bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
          :title="meal.strMeal"
          @click="$emit('selectProduct', meal)"
        >
          <div class="row g-0">
            <div class="col-4">
              <img :src="meal.strMealThumb" class="img-fluid shadow-sm" style="--bs-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);" :alt="meal.strMeal">
            </div>
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
</template>

<script>
export default {
  props: ['category'],
  inject: ['mealList'],
  computed: {
    mealsOfType () {
      const filtered = this.mealList.filter(item => {
        return item.category === this.category
      })
      if (!filtered.length) {
        this.$router.replace('/Beef')
      }
      return filtered
    }
  }
}
</script>

<style scoped>
.card[data-bs-toggle="modal"] {
  cursor: pointer;
}
</style>
