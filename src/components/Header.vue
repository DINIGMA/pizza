<template>
  <header class="mb-10 flex justify-between items-center p-5">
    <div class="flex items-center">
      <img src="/logo.jpg" alt="" class="w-28" />
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
      <span class="font-bold">2000 руб.</span>
      <div
        @mouseover="hover = true"
        @mouseleave="hover = false"
        class="relative flex flex-col drawer"
      >
        <button
          class="text-xl text-white rounded-full bg-orange-500 px-4 pt-1 pb-2 transition ease-in hover:bg-orange-400"
        >
          Корзина
        </button>
        <transition name="fade">
          <drawer v-if="hover" />
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import Drawer from '@/components/Drawer.vue'
import { ref } from 'vue'

const hover = ref(false)
</script>

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
