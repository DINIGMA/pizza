import { createStore } from 'vuex'
import { fetchPizza } from './fetchPizza'
import { drawer } from './drawer'

export default createStore({
  modules: { fetchPizza, drawer }
})
