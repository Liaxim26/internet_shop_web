import axios from "axios";

export default {
  GET_PRODUCTS_FROM_API({commit}, parameters) {
    return axios.get("http://rest-api:8085/api/products", {
      params: parameters
    })
      .then((response) => {
        console.log(response.data.products)
        commit('SET_PRODUCTS_TO_STATE', response.data.products);
        return response;
      })
      .catch((error) => {
        console.log(error)
        return error;
      })
  }
}