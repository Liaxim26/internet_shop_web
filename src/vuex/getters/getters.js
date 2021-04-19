export default  {
  SEARCH_VALUE(state) {
    return state.searchValue;
  },
  IS_MOBILE(state) {
    return state.isMobile;
  },
  IS_DESKTOP(state) {
    return state.isDesktop;
  },
  USER_ID(state) {
    return state.auth.user.user_id;
  },
  PRODUCTS(state) {
    console.log(state)
    return state.products;
  },
  CART(state) {
    return state.cart;
  },
  GET_AUTH(state) {
    return state.authData;
  },
  HOST(state) {
    return state.host;
  }
}
