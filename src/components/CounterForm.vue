<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  product: Object
})

const store = useStore()

const cart = computed(() => store.getters.cartProduct)

const cartItem = cart.value.find(
  (item) =>
    item.id == props.product.id &&
    item.doughType == props.product.doughType &&
    item.pizzaSize == props.product.pizzaSize
)

const incrementCartItem = (product) => {
  store.dispatch('incrementCartItem', product)
}

const decrementCartItem = (product) => {
  store.dispatch('decrementCartItem', product)
}
</script>

<template>
  <div class="counter-form">
    <button
      @click="decrementCartItem(product)"
      class="bg-orange-400 transition ease-in hover:bg-orange-500"
    >
      -
    </button>
    <div class="counter-form__text inline-block mr-3 ml-3 text-center">
      <span class="text-sm">{{ cartItem.counterItem }}</span>
    </div>

    <button
      @click="incrementCartItem(product)"
      class="bg-orange-400 transition ease-in hover:bg-orange-500"
    >
      +
    </button>
  </div>
</template>

<style scoped>
button {
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 30px;
  text-align: center;
}

.counter-form {
}

.counter-form__text {
  width: 16px;
}
</style>
