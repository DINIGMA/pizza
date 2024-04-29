import { createApp } from 'vue'
import store from './store'
import axios from 'axios'
import './assets/main.css'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'

const app = createApp(App)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(autoAnimatePlugin)
app.use(router)
app.use(store)
app.mount('#app')
