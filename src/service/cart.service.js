import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://rest-api:8085/api/';

class CartService {
  loadCart(userId) {
    let url = API_URL + 'users/' + userId + '/cart'
    return axios.get(url, { headers: authHeader() })
  }

  addItem(userId, product) {
    let url = API_URL + 'users/' + userId + '/cart'
    return axios.post(url, { productId: product.id, quantity: 1 }, { headers: authHeader() })
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

}

export default new CartService();
