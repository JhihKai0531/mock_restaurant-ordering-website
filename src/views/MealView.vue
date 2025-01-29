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

<script>
export default {
  props: ['category'],
  inject: ['mealList'],
  data () {
    return {
      listIsHidden: [],
      layout: 'listLayout',
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
    },
    layoutClasses () {
      return this[this.layout]
    }
  },
  methods: {
    filterSearch (search) {
      const strMeals = this.mealsOfType.map(item => item.strMeal)
      const mapping = strMeals.map(str => !str.toUpperCase().includes(search.toUpperCase()))
      this.listIsHidden.splice(0, this.listIsHidden.length, ...mapping)
    },
    switchLayout (layout) {
      this.layout = layout
    }
  },
  created () {
    this.emitter.on('filterSearch', this.filterSearch)
    this.emitter.on('switchLayout', this.switchLayout)
  }
}
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
