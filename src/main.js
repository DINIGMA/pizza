import { createApp } from 'vue'
import store from './store'
import axios from 'axios'
import './assets/main.css'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import DrawerPage from './pages/DrawerPage.vue'

const app = createApp(App)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/drawer',
    name: 'Drawer',
    component: DrawerPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

let isBasketPage = false

router.beforeEach((to, from, next) => {
  if (to.name === 'Drawer') {
    isBasketPage = true
  } else {
    isBasketPage = false
  }
  next()
})

app.use(autoAnimatePlugin)
app.use(router)
app.use(store)
app.mount('#app')

export { isBasketPage }
