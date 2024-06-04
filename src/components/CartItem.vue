<script setup>
import { useStore } from 'vuex'
const props = defineProps({
  id: Number,
  name: String,
  imageUrl: String,
  price: Number,
  pizzaSize: String,
  doughType: String,
  counterItem: Number,
  deleteFromCart: Function
})
</script>

<template>
  <div class="flex gap-x-10 justify-between items-start mb-3">
    <div class="flex items-start gap-5">
      <img :src="imageUrl" alt="" width="70" height="70" />
      <div>
        <p class="text-xl">{{ name }}</p>
        <div>
          <p class="inline text-sm mr-2" v-if="props.doughType == 'traditional'">Трад. тесто</p>
          <p v-else class="inline text-sm mr-2">Тонкое тесто</p>
          <p class="inline text-sm w-1/2">{{ pizzaSize }} см.</p>
          <span class="block">{{ props.counterItem }}x</span>
        </div>
      </div>
    </div>
    <div class="flex gap-3">
      <span class="text-xl">{{ price * counterItem }}&#8381;</span>
      <img src="/pizza/close.svg" alt="" @click="deleteFromCart" />
    </div>
  </div>
</template>

<style scoped></style>
