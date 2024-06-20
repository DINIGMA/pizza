<script setup>
import DrawerModal from '@/components/DrawerModal.vue'
import { ref, watch, watchEffect } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { isBasketPage } from '../main'

const store = useStore()

const totalPrice = computed(() => store.getters.cartPrice)

const isFirstRequest = computed(() => store.getters.getIsFirstRequest)

const hover = ref(false)

const isNotification = ref(false)

let timerId

const viewCart = () => {
  console.log(isFirstRequest.value)
  if (!isFirstRequest.value) {
    console.log(isFirstRequest.value)
    if (timerId) {
      hover.value = false
      clearTimeout(timerId)
    }
    isNotification.value = true
    console.log('notify')

    timerId = setTimeout(() => (isNotification.value = false), 5000)
    // setTimeout(() => (isNotification.value = false), 5000)
  }
}

const closeCart = () => {
  hover.value = false
}

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

    <ul class="flex gap-9 text-xl font-medium">
      <router-link to="/#pizza"><li>Пицца</li></router-link>
      <router-link to="/#snack"><li>Закуски</li></router-link>
      <router-link to="/#drink"><li>Напитки</li></router-link>
      <router-link to="/#sauce"><li>Соусы</li></router-link>
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
          @click="closeCart"
          >Корзина</router-link
        >
        <transition name="fade">
          <DrawerModal
            v-if="(hover & (totalPrice != 0) || isNotification) & !isBasketPage"
            @close-cart="closeCart"
          />
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
