<script setup>
import DrawerModal from '@/components/DrawerModal.vue'
import { ref, watch, watchEffect } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { isBasketPage } from '../main'

const store = useStore()

const totalPrice = computed(() => store.getters.cartPrice)

const hover = ref(false)

const isNotification = ref(false)

let timerId

const viewCart = () => {
  if (timerId) {
    hover.value = false
    clearTimeout(timerId)
  }
  isNotification.value = true
  console.log('notify')

  timerId = setTimeout(() => (isNotification.value = false), 5000)
  // setTimeout(() => (isNotification.value = false), 5000)
}

const closeCart = () => {
  console.log(121212)
  hover.value = false
}

watchEffect(() => {
  if (isBasketPage) {
    console.log(1111212)
    closeCart()
  }
})

watch(totalPrice, viewCart)
</script>

<template>
  <header class="mb-10 flex justify-between items-center p-5">
    <div class="flex items-center">
      <router-link to="/"><img src="/logo.jpg" alt="" class="w-28" /></router-link>

      <div>
        <h1 class="text-2xl">Пицца</h1>
        <p class="text-slate-500">Лучшая пицца в мире</p>
      </div>
    </div>

    <ul class="flex gap-8 text-xl">
      <li>Пицца</li>
      <li>Закуски</li>
      <li>Напитки</li>
      <li>Соусы</li>
    </ul>

    <div class="flex items-end gap-4">
      <a class="font-medium" href="#">Профиль</a>
      <span class="font-bold">{{ totalPrice }} руб.</span>
      <div
        @mouseover="(hover = true), (isNotification = false)"
        @mouseleave="hover = false"
        class="relative flex flex-col drawer"
      >
        <router-link
          to="/drawer"
          class="text-xl text-white rounded-full bg-orange-500 px-4 pt-1 pb-2 transition ease-in hover:bg-orange-400"
          >Корзина</router-link
        >
        <transition name="fade">
          <DrawerModal v-if="(hover & (totalPrice != 0) || isNotification) & !isBasketPage" />
        </transition>
      </div>
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
