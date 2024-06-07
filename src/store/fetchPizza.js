import axios from 'axios'

export const fetchPizza = {
  state: () => ({
    pizzas: [],
    otherProducts: [],
    filters: {
      sortBy: 'name',
      sortByRadio: ''
    },
    isFirstRequest: true,
    pizzaTypes: [],
    isLoading: false
  }),
  getters: {
    getPizza: (state) => state.pizzas,
    getOtherProduct: (state) => state.otherProducts,
    getFilters: (state) => state.filters,
    getPizzaTypes: (state) => state.pizzaTypes,
    getLoading: (state) => state.isLoading,
    getIsFirstRequest: (state) => state.isFirstRequest
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
    },
    setPizzaTypes(state, pizzaTypes) {
      state.pizzaTypes = pizzaTypes
    },
    setFirstRequest(state, isFirstRequest) {
      state.isFirstRequest = isFirstRequest
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    async getPizzas({ state, commit, dispatch }) {
      try {
        if (state.isFirstRequest) {
          commit('setLoading', true)
        }

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

        if (state.isFirstRequest) {
          // const pizzaType = [...new Set(data.map((item) => item.type))]
          commit('setPizzaTypes', [...new Set(data.map((item) => item.type))])
        }
      } catch (err) {
        console.log(err)
      } finally {
        commit('setFirstRequest', false)
        commit('setLoading', false)
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
