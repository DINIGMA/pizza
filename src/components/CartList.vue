<script setup>
import CartItem from './CartItem.vue'
import { useStore } from 'vuex'

const store = useStore()

defineProps({
  items: Array
})

const removeFromCart = (item) => {
  store.dispatch('deleteFromCart', item)
}
</script>

<template>
  <div v-auto-animate>
    <CartItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :pizzaSize="item.pizzaSize"
      :doughType="item.doughType"
      :counterItem="item.counterItem"
      :deleteFromCart="() => removeFromCart(item)"
    />
  </div>
</template>

<style scoped></style>
