export const drawer = {
  state: () => ({
    cart: []
  }),
  getters: {
    cartProduct: (state) => state.cart,
    cartPrice: (state, getters) => {
      return getters.cartProduct.reduce((total, item) => {
        return total + item.price * item.counterItem
      }, 0)
    }
  },

  mutations: {
    addToCart(state, product) {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        compound: product.compound,
        pizzaSize: product.pizzaSize,
        doughType: product.doughType,
        counterItem: 1
      })
    },
    deleteCartItem(state, product) {
      const deleteItem = state.cart.find(
        (item) =>
          item.id == product.id &&
          item.doughType == product.doughType &&
          item.pizzaSize == product.pizzaSize
      )
      state.cart.splice(state.cart.indexOf(deleteItem), 1)
    },
    allDeleteFromCart(state) {
      state.cart = []
    },
    incrementCounter(state, product) {
      const cartItem = state.cart.find(
        (item) =>
          item.id === product.id &&
          item.doughType == product.doughType &&
          item.pizzaSize == product.pizzaSize
      )
      cartItem.counterItem++
    },
    decrementCounter(state, product) {
      const cartItem = state.cart.find(
        (item) =>
          item.id === product.id &&
          item.doughType == product.doughType &&
          item.pizzaSize == product.pizzaSize
      )
      cartItem.counterItem--
    }
  },

  actions: {
    addToCart({ commit, state }, product) {
      const cartItem = state.cart.find(
        (item) =>
          item.id === product.id &&
          item.doughType == product.doughType &&
          item.pizzaSize == product.pizzaSize
      )
      console.log(product)
      if (!cartItem) {
        commit('addToCart', product)
      } else {
        commit('incrementCounter', cartItem)
      }
    },
    deleteFromCart({ commit }, product) {
      commit('deleteCartItem', product)
    },
    allDeleteFromCart({ commit }) {
      commit('allDeleteFromCart')
    },
    incrementCartItem({ commit }, product) {
      commit('incrementCounter', product)
    },
    decrementCartItem({ commit, state }, product) {
      const cartItem = state.cart.find(
        (item) =>
          item.id === product.id &&
          item.doughType == product.doughType &&
          item.pizzaSize == product.pizzaSize
      )
      if (cartItem.counterItem > 1) commit('decrementCounter', product)
      else {
        commit('deleteCartItem', product)
      }
    }
  }
}
