export default {
  SET_PRODUCTS_TO_STATE: (state, products) => {
    state.products = products;
  },
  ADD_ITEM: (state, cartItem) => {
    state.cart.push(cartItem)
  },
  SET_CART_ITEMS: (state, cart) => {
    state.cart = cart
  },
  REMOVE_ITEM: (state, cartItem) => {
    state.cart = state.cart.filter((item) => item.product.id != cartItem.product.id)
  },
  INCREMENT: (state, cartItem) => {
    let item = state.cart.filter((item) => item.product.id == cartItem.product.id)
    item[0].quantity += 1
  },
  DECREMENT: (state, cartItem) => {
    let item = state.cart.filter((item) => item.product.id == cartItem.product.id)
    item[0].quantity -= 1
  },
  SET_AUTH: (state, authData) => {
    state.authData = authData
    localStorage.setItem('userId', authData.userId)
    localStorage.setItem('token', authData.token)
  }
}
