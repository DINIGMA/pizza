import axios from 'axios'

export const fetchPizza = {
  state: () => ({
    pizzas: [],
    otherProducts: [],
    filters: {
      sortBy: 'name',
      sortByRadio: ''
    }
  }),
  getters: {
    getPizza: (state) => state.pizzas,
    getOtherProduct: (state) => state.otherProducts,
    getFilters: (state) => state.filters
  },
  mutations: {
    setPizza(state, pizzas) {
      state.pizzas = pizzas
    },
    setOtherProduct(state, otherProducts) {
      state.otherProducts = otherProducts
    },
    setSortByFilters(state, sortBy) {
      state.filters.sortBy = sortBy
    },
    setSortByRadioFilters(state, sortByRadio) {
      state.filters.sortByRadio = sortByRadio
    },

    setFilters(state, filters) {
      state.filters = filters
    }
  },
  actions: {
    async getPizzas({ state, commit, dispatch }) {
      try {
        const params = {
          sortBy: state.filters.sortBy
        }

        if (state.filters.sortByRadio && state.filters.sortByRadio != 'all') {
          params.type = `*${state.filters.sortByRadio}*`
        }

        const { data } = await axios.get(
          `https://b1f8182cac6670e1.mokky.dev/items?category=pizza`,
          {
            params
          }
        )
        commit('setPizza', data)
      } catch (err) {
        console.log(err)
      }
    },
    async getOtherProduct({ state, commit, dispatch }) {
      try {
        const params = {
          sortBy: state.filters.sortBy,
          category: ['snack', 'drink', 'sauce']
        }

        const { data } = await axios.get(`https://b1f8182cac6670e1.mokky.dev/items`, {
          params
        })

        commit('setOtherProduct', data)
      } catch (err) {
        console.log(err)
      }
    },
    updateFilters({ commit, dispatch, state }, filter) {
      commit('setFilters', filter)
      dispatch('getPizzas')
      dispatch('getOtherProduct')
    }
  }
}
