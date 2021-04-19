import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import commonActions from '../vuex/actions/actions'
import apiRequests from '../vuex/actions/api-requests'
import mutations from "../vuex/mutations/mutations"
import getters from "../vuex/getters/getters";

const actions = {...commonActions, ...apiRequests}

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    products: [],
    host: 'http://rest-api:8085/api/',
    cart: []
  },
  modules: {
    auth
  },
  mutations,
  actions,
  getters,
});

export default store;
