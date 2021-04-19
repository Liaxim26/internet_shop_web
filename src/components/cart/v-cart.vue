<template>
  <div class='v-cart'>
    <router-link :to="{name: 'catalog'}">
      <div class="v-catalog__link_to_cart">Back to Catalog</div>
    </router-link>
    <h1>Cart</h1>
    <p v-if="!CART.length">There are no products in cart...</p>
    <v-cart-item
        v-for="item in CART"
        :key="item.product.id"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(item)"
        @increment="increment(item)"
        @decrement="decrement(item)"
    />
    <div class="v-cart__total">
      <p class="total__name">Total:</p>
      <p>{{cartTotalCost | toFix | formattedPrice}}</p>
    </div>
  </div>
</template>

<script>
  import vCartItem from './v-cart-item'
  import CartService from '../../cart.service'
  import toFix from "../../filters/toFix";
  import formattedPrice from "../../filters/price-format";
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "v-cart",
    components: {
      vCartItem
    },
    props: {
      
    },
    data() {
      return {
        cart_data: this.CART
      }
    },
    filters: {
      formattedPrice,
      toFix
    },
    computed: {
      ...mapGetters([
        'CART'
      ]),
      cartTotalCost() {
        let result = []

        if (this.CART.length) {
          for (let item of this.CART) {
            result.push(item.product.price * item.quantity)
          }

          result = result.reduce(function (sum, el) {
            return sum + el;
          })
          return result;
        } else {
          return 0
        }
      }
    },
    methods: {
      ...mapActions([
        'DELETE_FROM_CART',
        'INCREMENT_CART_ITEM',
        'DECREMENT_CART_ITEM',
        'LOAD_CART'
      ]),
      increment(item) {
        this.INCREMENT_CART_ITEM(item)
      },
      decrement(item) {
        this.DECREMENT_CART_ITEM(item)
      },
      deleteFromCart(item) {
        this.DELETE_FROM_CART(item)
      },
      findItems() {
        var userId = this.$store.state.auth.user.userId
        console.log(userId)

        if (userId) {
          this.LOAD_CART(userId)
        }
      }
    },
    watch: {
      '$route'() {
        this.findItems()
      }
    },
    mounted() {
      this.findItems()
    }
  }
</script>

<style lang="scss">
  .v-cart {
    margin-bottom: 100px;
    &__total {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: $padding*2 $padding*3;
      display: flex;
      justify-content: center;
      background: $green-bg;
      color: #ffffff;
      font-size: 20px;
    }

    .total__name {
      margin-right: $margin*2;
    }
  }
</style>
