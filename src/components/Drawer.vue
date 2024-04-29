<script setup></script>

<template>
  <div
    class="absolute top-10 right-1 flex flex-col rounded-md bg-white border-2 border-orange-400 px-10 py-5 w-96 shadow-xl z-30"
  >
    <div class="flex justify-between mb-8">
      <h2>Ваш заказ:</h2>
      <button class="transition ease-in hover:text-orange-300">Отчистить корзину</button>
    </div>
    <div class="flex justify-between items-start mb-3">
      <div class="flex items-start gap-5">
        <img src="/pizza/2.png" alt="" width="60" height="60" />
        <p class="text-xl">Мясная</p>
      </div>
      <div class="flex gap-3">
        <span class="text-xl">299р.</span>
        <img src="/pizza/close.svg" alt="" />
      </div>
    </div>
    <hr />
    <div class="flex justify-between items-center">
      <span>Итого: 1200 руб.</span>
      <button
        class="py-3 px-5 border-2 border-solid border-orange-300 rounded-xl font-semibold transition ease-in hover:opacity-80"
      >
        В корзину
      </button>
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
</style>
