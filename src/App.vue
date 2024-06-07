<script setup>
import { onMounted, computed, watch } from 'vue'
import Header from './components/Header.vue'
import { useStore } from 'vuex'

const store = useStore()

const cart = computed(() => store.getters.cartProduct)

watch(
  cart,
  () => {
    console.log(123)
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  if (localCart) {
    store.dispatch('initializeCartFromLocalStorage', JSON.parse(localCart))
  }
  // cart.value = localCart ? JSON.parse(localCart) : []
  console.log(JSON.parse(localCart))
})
</script>

<template>
  <Header />
  <router-view></router-view>
</template>

<style scoped></style>
