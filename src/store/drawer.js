export const drawer = {
  state: () => ({
    cart: [
      {
        id: 1,
        name: 'margarita'
      }
    ]
  }),
  getters: {
    cartProduct: (state) => {
      state.cart
    }
  },

  mutations: {
    addToCart(state, product) {
      state.cart.push(product)
    }
  },

  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product)
    }
  }
}
