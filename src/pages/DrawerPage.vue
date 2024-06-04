<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import DrawerItemList from '@/components/DrawerItemList.vue'

const store = useStore()

const cartItems = computed(() => store.getters.cartProduct)

const cartPrice = computed(() => store.getters.cartPrice)
</script>

<template>
  <div class="px-10">
    <h2 class="font-bold text-5xl mb-10">Корзина</h2>
    <DrawerItemList :items="cartItems" />

    <div class="flex justify-between">
      <router-link
        to="/drawer"
        class="text-xl text-white rounded-full bg-orange-500 px-4 pt-1 pb-2 transition ease-in hover:bg-orange-400"
        >Оформить Заказ</router-link
      >
      <span class="text-3xl font-semibold">Итого: {{ cartPrice }} руб.</span>
    </div>
  </div>
</template>

<style scoped></style>
