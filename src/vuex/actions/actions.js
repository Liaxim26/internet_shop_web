import CartService from '../../service/cart.service'

export default {
  ADD_TO_CART({commit}, cartItem) {
    console.log(cartItem)
    return CartService.addItem(cartItem.userId, cartItem.product)
      .then((response) => {
        commit('ADD_ITEM', cartItem);
      })
  },
  LOAD_CART({commit}, userId) {
    return CartService.loadCart(userId)
    .then(response => {
      console.log(response)
      commit('SET_CART_ITEMS', response.data)
    })
  },
  SET_CART({commit}, cart) {
    commit('SET_CART_ITEMS', cart)
  },
  INCREMENT_CART_ITEM({commit}, cartItem) {
    return CartService.updateQuantity(cartItem.userId, cartItem.product.id, cartItem.quantity + 1)
    .then(response => commit('INCREMENT', cartItem))
  },
  DECREMENT_CART_ITEM({commit}, cartItem) {
    return CartService.updateQuantity(cartItem.userId, cartItem.product.id, cartItem.quantity + 1)
    .then(response => commit('DECREMENT', cartItem))
  },
  DELETE_FROM_CART({commit}, cartItem) {
    return CartService.removeItem(cartItem.userId, cartItem.product.id)
    .then(response => commit('REMOVE_ITEM', cartItem))
  }
}
