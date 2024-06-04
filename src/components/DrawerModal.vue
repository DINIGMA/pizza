<script setup>
import CartList from './CartList.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const cartItems = computed(() => store.getters.cartProduct)

const cartPrice = computed(() => store.getters.cartPrice)

const allDeleteFromCart = () => {
  store.dispatch('allDeleteFromCart')
}
</script>

<template>
  <div
    class="drawer-modal absolute top-10 right-1 flex flex-col rounded-md bg-white border-2 border-orange-400 px-10 py-5 shadow-xl z-30"
  >
    <div class="flex justify-between mb-8">
      <h2>Ваш заказ:</h2>
      <button @click="allDeleteFromCart" class="transition ease-in hover:text-orange-300">
        Отчистить корзину
      </button>
    </div>

    <CartList v-if="cartPrice" :items="cartItems" />
    <div v-else class="mb-10">
      <h2 class="font-semibold text-center text-2xl">Корзина пустая:(</h2>
    </div>

    <hr />
    <div class="flex justify-between items-center">
      <span>Итого: {{ cartPrice }} руб.</span>
      <!-- <button
        class="py-3 px-5 border-2 border-solid border-orange-300 rounded-xl font-semibold transition ease-in hover:opacity-80"
      >
        В корзину
      </button> -->
      <router-link
        to="/drawer"
        class="py-3 px-5 border-2 border-solid border-orange-300 rounded-xl font-semibold transition ease-in hover:opacity-80"
        >В корзину</router-link
      >
    </div>
  </div>
</template>

<style scoped>
hr {
  margin-bottom: 10px;
  border: none;
  background-color: rgba(128, 128, 128, 0.5);
  color: rgba(128, 128, 128, 0.5);
  height: 1px;
}
.drawer-modal {
  width: 28rem;
}
</style>
