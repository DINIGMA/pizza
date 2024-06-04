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
  <div>
    <button
      @click="decrementCartItem(product)"
      class="bg-orange-400 transition ease-in hover:bg-orange-500"
    >
      -
    </button>
    <span class="text-sm mr-2 ml-2">{{ cartItem.counterItem }}</span>
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
</style>
