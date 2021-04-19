import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://rest-api:8085/api/';

class CartService {
  loadCart(userId) {
    let url = API_URL + 'users/' + userId + '/cart'
    return axios.get(url, { headers: authHeader() })
    // .then(response => {
    //   response
    // })
  }

  addItem(userId, product) {
    let url = API_URL + 'users/' + userId + '/cart'
    let cart = this.getCart()
    console.log(product)
    console.log('add prod')
    if (!this.hasItemsWithProduct(cart, product.id)) {
      console.log('requesting')
      return axios.post(url, { productId: product.id, quantity: 1 }, { headers: authHeader() })
      .then((_response) => {
        let cartItem = { userId: userId, product: product, quantity: 1 }
        cart.push(cartItem)
        localStorage.setItem('cart', JSON.stringify(cart))
        return cartItem
      })
    } else {
      return null
    }
  }

  getItemWithProduct(productId) {
    let cart = this.getCart()
    return this.fisrtItemWithProduct(cart, productId)
  }

  fisrtItemWithProduct(cart, productId) {
    console.log(cart)
    let filtered = cart.filter(item => item.product.id == productId)
    console.log(filtered)
    if (filtered.length > 0) {
      return filtered[0]
    } else {
      return null
    }
  }

  hasItemsWithProduct(cart, productId) {
    return this.fisrtItemWithProduct(cart, productId) != null
  }

  updateQuantity(userId, productId, newQuantity) {
    console.log(userId + ' ' + productId + ' ' + newQuantity)
    let url = API_URL + 'users/' + userId + '/cart/' + productId
    return axios.put(url, { quantity: newQuantity }, { headers: authHeader() })
  }

  removeItem(userId, productId) {
    let url = API_URL + 'users/' + userId + '/cart/' + productId
    return axios.delete(url, { headers: authHeader() })
  }

  getCart() {
    let cart = localStorage.getItem('cart')
    if (cart == null) {
      return []
    } else {
      return JSON.parse(cart)
    }
  }
}

export default new CartService();
