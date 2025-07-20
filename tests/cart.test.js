import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ProductWindow from '../src/components/menu-page/ProductWindow.vue'
import EditWindow from '../src/components/cart-page/EditWindow.vue'

// helper function to create a meal item
const baseMeal = { strMeal: 'Test Meal', price: 100 }

describe('cart operations', () => {
  it('adds an item to the cart', () => {
    const cartData = ref([])
    const wrapper = mount(ProductWindow, {
      props: { mealPropped: baseMeal },
      global: { provide: { cartData, diningFinished: ref(false) } },
    })

    wrapper.vm.userSettings.count = 1
    wrapper.vm.addToCart()

    expect(cartData.value.length).toBe(1)
    expect(cartData.value[0].mealObject.strMeal).toBe('Test Meal')
  })

  it('edits an item in the cart', () => {
    const cartItem = {
      mealObject: baseMeal,
      setMenuObject: { setMenuId: 'No', setMenuPrice: 0 },
      spicyObject: { value: 'no' },
      extraObject: { value: false, price: 0, name: '' },
      notes: '',
      count: 1,
      subtotal: 100,
      dateTime: 1,
    }
    const cartData = ref([cartItem])
    const wrapper = mount(EditWindow, {
      props: { cartItemPropped: { mealItem: baseMeal, options: { setMenuRadio: 'No', spicy: 'no', extra: false, notes: '', count: 1 }, dateTime: 1 } },
      global: { provide: { cartData, emitter: { on: () => {}, off: () => {}, emit: () => {} } } },
    })

    wrapper.vm.userEditing.count = 2
    wrapper.vm.finishEditing()

    expect(cartData.value[0].count).toBe(2)
  })

  it('deletes an item from the cart', () => {
    const cartItem = {
      mealObject: baseMeal,
      setMenuObject: { setMenuId: 'No', setMenuPrice: 0 },
      spicyObject: { value: 'no' },
      extraObject: { value: false, price: 0, name: '' },
      notes: '',
      count: 1,
      subtotal: 100,
      dateTime: 1,
    }
    const cartData = ref([cartItem])
    const wrapper = mount(EditWindow, {
      props: { cartItemPropped: { mealItem: baseMeal, options: cartItem, dateTime: 1 } },
      global: { provide: { cartData, emitter: { on: () => {}, off: () => {}, emit: () => {} } } },
    })

    wrapper.vm.deleteCartItem()

    expect(cartData.value.length).toBe(0)
  })
})
