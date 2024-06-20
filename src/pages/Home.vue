<script setup>
import CardList from '@/components/CardList.vue'
import CounterForm from '@/components/CounterForm.vue'
import Loading from '@/components/Loading.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const store = useStore()

const pizza = computed(() => store.getters.getPizza)
const otherProduct = computed(() => store.getters.getOtherProduct)
const isLoading = computed(() => store.getters.getLoading)

const filters = reactive({
  sortBy: 'name',
  sortByRadio: ''
})

const updateFilters = () => {
  console.log(111)
  store.dispatch('updateFilters', filters)
}

// const getPizzaType = () => {
//   const typeSet = new Set(pizza.value.map((item) => item.type))
//   return [...typeSet]
// }

// const changeSelect = (event) => {
//   filters.sortBy = event.target.value
// }

// const changeSelectStore = (event) => {
//   store.commit('setSortByFilters', event.target.value)
//   console.log(store.getters.getFilters)
// }

// const handleRadioChange = (event) => {
//   filters.sortByRadio = event.target.value
//   console.log(filters.sortByRadio)
// }

const getOtherProductsByCategory = (category) => {
  return otherProduct.value.filter((item) => item.category === category)
}

onMounted(async () => {
  await Promise.all([store.dispatch('getPizzas'), store.dispatch('getOtherProduct')])
})
</script>

<template>
  <div class="px-10">
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-10">
        <div>
          <input
            @change="updateFilters"
            type="radio"
            name="pizza"
            id="all"
            value="all"
            v-model="filters.sortByRadio"
          />
          <label for="all" class="border-solid border rounded-2xl p-10">Все</label>
        </div>
        <div>
          <input
            @change="updateFilters"
            v-model="filters.sortByRadio"
            type="radio"
            name="pizza"
            id="meat"
            value="meat"
          />
          <label for="meat" class="border-solid border rounded-2xl p-10">Мясная</label>
        </div>

        <div>
          <input
            @change="updateFilters"
            v-model="filters.sortByRadio"
            type="radio"
            name="pizza"
            id="vegan"
            value="vegan"
          />
          <label for="vegan" class="border-solid border rounded-2xl p-10">Веганская</label>
        </div>
        <div>
          <input
            @change="updateFilters"
            v-model="filters.sortByRadio"
            type="radio"
            name="pizza"
            id="spicy"
            value="spicy"
          />
          <label for="spicy" class="border-solid border rounded-2xl p-10">Острая</label>
        </div>
        <div>
          <input
            @change="updateFilters"
            type="radio"
            name="pizza"
            id="sea"
            value="sea"
            v-model="filters.sortByRadio"
          />
          <label for="sea" class="border-solid border rounded-2xl p-10">С морепродуктами</label>
        </div>
      </div>
      <select
        @change="updateFilters"
        v-model="filters.sortBy"
        name=""
        id=""
        class="py-2 px-3 border border-stone-600 rounded-xl outline-none"
      >
        <option value="name">По названию</option>
        <option value="price">По цене (дешевле)</option>
        <option value="-price">По цене (дороже)</option>
      </select>
    </div>
    <div class="mb-12" v-auto-animate id="pizza">
      <h2 class="font-bold text-3xl mb-6">Пицца</h2>
      <CardList v-if="!isLoading" :items="pizza" />
      <Loading v-else />
    </div>
    <div class="mb-12" v-auto-animate id="snack">
      <h2 class="font-bold text-3xl mb-6">Снеки</h2>
      <CardList v-if="!isLoading" :items="getOtherProductsByCategory('snack')" />
      <Loading v-else />
    </div>
    <div class="mb-12" v-auto-animate id="drink">
      <h2 class="font-bold text-3xl mb-6">Напитки</h2>
      <CardList v-if="!isLoading" :items="getOtherProductsByCategory('drink')" />
      <Loading v-else />
    </div>
    <div v-auto-animate id="sauce">
      <h2 class="font-bold text-3xl mb-6">Соусы</h2>
      <CardList v-if="!isLoading" :items="getOtherProductsByCategory('sauce')" />
      <Loading v-else />
    </div>
  </div>
</template>

<style scoped>
input[type='radio'] {
  display: none;
}

input[type='radio'] + label {
  user-select: none;
  display: inline-block;
  margin: -2px;
  padding: 10px 30px;
  margin-bottom: 0;
  font-size: 20px;
  line-height: 20px;
  color: white;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-color: rgb(255, 136, 50);
  transition: 0.4s;
}

input[type='radio']:checked + label {
  background-image: none;
  outline: 0;
  background-color: #000000;
}
</style>
