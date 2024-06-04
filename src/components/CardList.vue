<script setup>
import Card from '@/components/Card.vue'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
defineProps({
  items: Array
})
</script>

<template>
  <div class="grid grid-cols-4 gap-x-4 gap-y-8" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :compound="item.compound"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :category="item.category"
      :item="item"
    />
  </div>
</template>

<style></style>
