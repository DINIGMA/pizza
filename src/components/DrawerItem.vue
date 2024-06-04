<script setup>
import { useStore } from 'vuex'
import CounterForm from './CounterForm.vue'
const props = defineProps({
  id: Number,
  name: String,
  imageUrl: String,
  price: Number,
  pizzaSize: String,
  doughType: String,
  counterItem: Number,
  cartItem: Object,
  deleteFromCart: Function
})
</script>

<template>
  <div class="cart-item mb-10">
    <div class="flex gap-7">
      <img :src="imageUrl" alt="" width="150" height="150" />
      <div class="grow-0 w-80">
        <div class="mr-10">
          <p class="text-2xl">{{ name }}</p>
          <div>
            <p class="inline text-sm mr-2" v-if="props.doughType == 'traditional'">Трад. тесто</p>
            <p v-else class="inline text-sm mr-2">Тонкое тесто</p>
            <p class="inline text-sm">{{ pizzaSize }} см.</p>
            <span class="block">{{ props.counterItem }}x</span>
          </div>
        </div>
      </div>
    </div>

    <div><CounterForm :product="cartItem"></CounterForm></div>
    <div class="flex gap-2">
      <span class="text-xl">{{ price * counterItem }}&#8381;</span>
      <img src="/pizza/close.svg" width="30" height="30" alt="" @click="deleteFromCart" />
    </div>
  </div>
  <!-- <div class="flex gap-x-10 justify-start items-center mb-3">
    <div>
      <img :src="imageUrl" alt="" width="150" height="150" />
    </div>
    <div class="flex justify-between grow">
      <div class="mr-10">
        <p class="text-2xl">{{ name }}</p>
        <div>
          <p class="inline text-sm mr-2" v-if="props.doughType == 'traditional'">Трад. тесто</p>
          <p v-else class="inline text-sm mr-2">Тонкое тесто</p>
          <p class="inline text-sm">{{ pizzaSize }} см.</p>
          <span class="block">{{ props.counterItem }}x</span>
        </div>
      </div>
      <div class="mr-10">
        <CounterForm :product="cartItem"></CounterForm>
      </div>
      <div class="flex gap-3 justify-center">
        <span class="text-xl">{{ price * counterItem }}&#8381;</span>
        <img src="/pizza/close.svg" width="50" height="50" alt="" @click="deleteFromCart" />
      </div>
    </div>
  </div> -->
</template>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
