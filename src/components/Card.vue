<script setup>
import { useStore } from 'vuex'
defineProps({
  id: Number,
  name: String,
  compound: String,
  imageUrl: String,
  price: Number,
  category: String
})

const store = useStore()

const addToCart = (product) => {
  console.log(111)
  store.dispatch('addToCart', product)
}
</script>

<template>
  <div class="flex flex-col">
    <img :src="imageUrl" alt="" width="350" class="m-auto mb-5" />
    <h2 class="mb-3 font-bold text-2xl">{{ name }}</h2>
    <p class="mb-3 leading-5 h-9">
      {{ compound }}
    </p>
    <div v-if="category === 'pizza'" class="flex gap-x-2 items-center mb-3">
      <div>
        <input type="radio" :name="`size_${id}`" :id="`small_${id}`" value="sea" />
        <label :for="`small_${id}`" class="border-solid border rounded-2xl p-2">25 см.</label>
      </div>
      <div>
        <input type="radio" :name="`size_${id}`" :id="`medium_${id}`" value="sea" />
        <label :for="`medium_${id}`" class="border-solid border rounded-2xl p-2">30 см.</label>
      </div>
      <div>
        <input type="radio" :name="`size_${id}`" :id="`large_${id}`" value="sea" />
        <label :for="`large_${id}`" class="border-solid border rounded-2xl p-2">35 см.</label>
      </div>
    </div>
    <div v-if="category === 'pizza'" class="flex gap-x-2 mb-3">
      <div>
        <input type="radio" :name="`dough_${id}`" :id="`traditional_${id}`" value="sea" />
        <label :for="`traditional_${id}`" class="border-solid border rounded-2xl p-2"
          >Традиционное тесто</label
        >
      </div>
      <div>
        <input type="radio" :name="`dough_${id}`" :id="`thin_${id}`" value="sea" />
        <label :for="`thin_${id}`" class="border-solid border rounded-2xl p-2">Тонкое тесто</label>
      </div>
    </div>
    <div class="flex items-center gap-x-5">
      <span class="font-bold text-xl">{{ price }} ₽</span>
      <button
        class="text-white border border-solid border-orange-400 bg-orange-400 rounded-xl px-3 py-1 transition ease-in hover:bg-orange-500"
        @click="
          addToCart({
            id: id,
            name: name
          })
        "
      >
        В корзину
      </button>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 14px;
  font-weight: 200;
}
input[type='radio'] {
  display: none;
}

input[type='radio'] + label {
  user-select: none;
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  color: white;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-color: rgb(255, 136, 50);
  transition: 0.3s;
}

input[type='radio']:checked + label {
  background-image: none;
  outline: 0;
  background-color: #000000;
}
</style>
