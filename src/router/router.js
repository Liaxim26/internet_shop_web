import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/catalog/v-catalog'
import vCart from '../components/cart/v-cart'
import vMainPage from '../components/main-page/v-main-page'
import vProductPage from '../components/catalog/v-product-page'
import Register from '../components/user/Register'
import Profile from '../components/user/Profile'
import Login from '../components/user/Login'

Vue.use(Router);

let router = new Router({
  routes: [
    {

      path: '/',
      name: 'mainPage',
      component: vMainPage
    },
    {
      path: '/catalog/:category',
      name: 'catalog',
      component: vCatalog,
      props: true
    },
    {
      path: '/product',
      name: 'product',
      component: vProductPage
    },
    {
      path: '/cart',
      name: 'cart',
      component: vCart,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
  ]
})

export default router;
