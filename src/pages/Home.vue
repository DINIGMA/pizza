<script setup>
import CardList from '@/components/CardList.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

// const items = ref([])

const store = useStore()

const pizza = computed(() => store.getters.getPizza)
const otherProduct = computed(() => store.getters.getOtherProduct)

console.log(pizza)
console.log(pizza.value)

const cart = computed(() => store.getters.cartProduct)

// const sortBy = ref('name')
// const sortByRadio = ref('')

const filters = reactive({
  sortBy: 'name',
  sortByRadio: ''
})

const updateFilters = () => {
  store.dispatch('updateFilters', filters)
}

const getPizzaType = () => {
  const typeSet = new Set(pizza.value.map((item) => item.type))
  return [...typeSet]
}

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

// const getItems = async () => {
//   try {
//     const params = {
//       sortBy: filters.sortBy,
//       category: ['pizza', 'snack', 'drink', 'sauce']
//     }

//     if (filters.sortByRadio && filters.sortByRadio != 'all') {
//       params.type = `*${filters.sortByRadio}*`
//       console.log(params)
//     }

//     const { data } = await axios.get(`https://b1f8182cac6670e1.mokky.dev/items`, {
//       params
//     })
//     console.log(items.value)
//     items.value = data
//   } catch (error) {
//     console.log(error)
//   }
// }

// const getPizzas = async () => {
//   try {
//     const params = {
//       sortBy: filters.sortBy
//     }

//     if (filters.sortByRadio && filters.sortByRadio != 'all') {
//       params.type = `*${filters.sortByRadio}*`
//       console.log(params)
//     }

//     const { data } = await axios.get(`https://b1f8182cac6670e1.mokky.dev/items?category=pizza`, {
//       params
//     })

//     pizzas.value = data
//     console.log(pizzas.value)
//   } catch (err) {
//     console.log(err)
//   }
// }
// const getOtherProduct = async () => {
//   try {
//     const params = {
//       sortBy: filters.sortBy,
//       category: ['snack', 'drink', 'sauce']
//     }

//     const { data } = await axios.get(`https://b1f8182cac6670e1.mokky.dev/items`, {
//       params
//     })

//     otherProducts.value = data
//     console.log(otherProducts.value)
//   } catch (err) {
//     console.log(err)
//   }
// }

// watch(store.getters.getFilters, console.log(1))
// watch(filters, getOtherProduct)

onMounted(async () => {
  // await getItems()
  // await getPizzas()
  await store.dispatch('getPizzas')
  await store.dispatch('getOtherProduct')
  console.log(pizza.value)
  console.log(cart.value)
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
    <div class="mb-12">
      <h2 class="font-bold text-3xl mb-6">Пицца</h2>
      <CardList :items="pizza" />
    </div>
    <div class="mb-12">
      <h2 class="font-bold text-3xl mb-6">Снеки</h2>
      <CardList :items="getOtherProductsByCategory('snack')" />
    </div>
    <div class="mb-12">
      <h2 class="font-bold text-3xl mb-6">Напитки</h2>
      <CardList :items="getOtherProductsByCategory('drink')" />
    </div>
    <div>
      <h2 class="font-bold text-3xl mb-6">Соусы</h2>
      <CardList :items="getOtherProductsByCategory('sauce')" />
    </div>
    <div>{{ cart }}</div>
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
