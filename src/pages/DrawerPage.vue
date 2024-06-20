<script setup>
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import DrawerItemList from '@/components/DrawerItemList.vue'
import OrderForm from '@/components/OrderForm.vue'

const store = useStore()

const cartItems = computed(() => store.getters.cartProduct)

const cartPrice = computed(() => store.getters.cartPrice)

const orderId = computed(() => store.getters.getOrderId)

const isCreatingOrder = ref(false)

const OrderCreated = ref(false)

const postFormData = async (data) => {
  store.dispatch('createOrder', data)
  OrderCreated.value = true
}
</script>

<template>
  <div class="px-10">
    <h2 class="font-bold text-5xl mb-10">Корзина</h2>
    <div v-if="cartPrice > 0">
      <DrawerItemList :items="cartItems" />

      <div class="flex justify-between">
        <button
          class="text-xl text-white rounded-full bg-orange-500 px-4 pt-1 pb-2 transition ease-in hover:bg-orange-400"
          v-if="!isCreatingOrder"
          @click="isCreatingOrder = true"
        >
          Оформить Заказ
        </button>
        <h2 class="text-4xl font-semibold mb-7" v-else>Оформление заказа</h2>

        <span class="text-3xl font-semibold">Итого: {{ cartPrice }}&#8381;</span>
      </div>
      <OrderForm @postFormData="postFormData" :price="cartPrice" v-if="isCreatingOrder"></OrderForm>
    </div>
    <div v-else>
      <div v-if="!OrderCreated">
        <p class="text-2xl mb-7">Корзина пустая:(</p>
        <router-link
          class="text-xl text-white rounded-full bg-orange-500 px-4 pt-1 pb-2 transition ease-in hover:bg-orange-400"
          to="/"
          >Смотреть пиццы</router-link
        >
      </div>
      <div v-else>
        <p class="text-2xl mb-7">
          Ваш заказ №{{ orderId }} оформен, Ожидайте звонка для подтверждения
        </p>
        <router-link
          class="text-xl text-white rounded-full bg-orange-500 px-4 pt-1 pb-2 transition ease-in hover:bg-orange-400"
          to="/"
          >Смотреть пиццы</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
