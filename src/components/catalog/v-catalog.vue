<template>
  <div class='v-catalog'>

    <v-notification
        :messages="messages"
    />


    <router-link :to="{name: 'cart', params: {cart_data: CART}}">
      <div class="v-catalog__link_to_cart">Cart: {{CART.length}}</div> 
    </router-link>
      <div class="filters">
     <v-select
          v-model="sortParameters"
          :items="sortOptions"
          item-text="name"

          
          @select="sort"
          return-object
          
      />
      <p>Сортировать</p>
      <select v-model="sortParameters" @change="sort($event)">
        <option v-for="sortOption in sortOptions" :key="sortOption.name" v-bind:value="sortOption">{{ sortOption.name }}</option>
      </select>
     <div class="range-slider">
        <input
            type="range"
            min="0"
            max="4000"
            step="10"
            v-model.number="minPrice"
            @change="setRangeSlider"
        >
        <input
            type="range"
            min="0"
            max="10000"
            step="10"
            v-model.number="maxPrice"
            @change="setRangeSlider"
        >
      </div>
     <div class="range-values">
        <p>Min: {{minPrice}}</p>
        <p>Max: {{maxPrice}}</p>
      </div>
    </div>
    <div class="v-catalog__list">
      <v-catalog-item
          v-for="product in filteredProducts"
          :key="product.article"
          :product_data="product"
          @addToCart="addToCart"
          @productClick="productClick"
      />
    </div>
    <v-pagination
      v-model="page"
      :length="totalPages"
      total-visible="10"
      @input="findProducts()">
    </v-pagination>
    <p>Размер страницы</p>
    <select v-model="pageSize" @change="changePageSize($event.target.value)">
      <option v-for="pageSizeOption in pageSizeOptions" v-bind:key="pageSizeOption">{{ pageSizeOption }}</option>
    </select>
  </div>
</template>

<script>
  import axios from 'axios' 
  import vCatalogItem from './v-catalog-item'
  import {mapActions, mapGetters} from 'vuex'
  import vSelect from '../v-select'
  import vNotification from '../notifications/v-notification'

  export default {
    name: "v-catalog",
    components: {
      vCatalogItem,
      vSelect,
      vNotification
    },
    props: {
      category: {
        type: String,
        default() {
          return 'new'
        }
      }
    },
    data() {
      return {
        sortOptions: [
          { name: 'Цена по возрастанию', code: 'price', direction: 'ASC' },
          { name: 'Цена по убыванию', code: 'price', direction: 'DESC' }
        ],
        sortParameters: { name: 'Цена по возрастанию', code: 'price', direction: 'ASC' },
        sortedProducts: [],
        page: 1,
        pageSize: 10,
        pageSizeOptions: [5, 10, 20, 40, 60, 100],
        totalPages: 1,
        minPrice: 0,
        maxPrice: 10000,
        messages: []
      }
    },
    computed: {
      
      ...mapGetters([
        'PRODUCTS',
        'CART',
        'IS_MOBILE',
        'IS_DESKTOP',
        'SEARCH_VALUE'
      ]),
      filteredProducts() {
          console.log(this.PRODUCTS)
          console.log('products')
          return this.PRODUCTS
      },
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
      ]),
      productClick(article) {
        this.$router.push( {name: 'product', query: { 'product': article }})
      },
      setRangeSlider() {
        if (this.minPrice > this.maxPrice) {
          let tmp = this.maxPrice;
          this.maxPrice = this.minPrice;
          this.minPrice = tmp;
        }
        this.findProducts()
      },
      sort(event) {
        console.log(event)
        let sortParams = event.target.value
        console.log(sortParams)
        this.sortParameters = event.target.value
        console.log(this.sortParameters)
      },
      changePageSize(newSize) {
        this.pageSize = newSize
        this.findProducts()
      },
      sortByCategories(category) {
        let vm = this;
        this.sortedProducts = [...this.PRODUCTS]
      },
      addToCart(data) {
        //this.ADD_TO_CART(data)
        var cart = this.CART
        var alreadyContains
        for (let item in cart) {
          if (item.id == data.id) {
            alreadyContains = true
          }
        }
        if (alreadyContains) {
          return;
        }

        let body = {
          productId: data.id,
          quantity: 1
        }

        let authData = this.$store.getters.GET_AUTH
        let config = {
          headers: {
            Authorization: 'Bearer ' + authData.token
          }
        }
        
        axios.post(this.$store.getters.HOST + '', body, config)
        .then(res => {
           let timeStamp = Date.now().toLocaleString();
            this.messages.unshift(
              {name: 'Товар добавлен в корзину', icon: 'check_circle', id: timeStamp}
            )
          console.log(res)
        })
        .catch(err => {
          console.error(err.response); 
        })
      },
      sortProductsBySearchValue(value) {
        this.sortedProducts = [...this.PRODUCTS]
        console.log('sorted')
        console.log(this.sortedProducts)
      },
      findProducts() {
        let parameters = {
          page: this.page,
          pageSize: this.pageSize,
          sortField: this.sortParameters.code,
          sortDirection: this.sortParameters.direction,
          category: this.category,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice
        }
        this.GET_PRODUCTS_FROM_API(parameters)
          .then((response) => {
            if (response.data) {
              console.log(response)
              this.totalPages = Math.ceil(response.data.totalNumber / this.pageSize)
              this.sortByCategories()
              this.sortProductsBySearchValue(this.SEARCH_VALUE)
            }
          })
    }
    },  
    watch: {
      SEARCH_VALUE() {
        this.sortProductsBySearchValue(this.SEARCH_VALUE);
      },
      '$route'() {
        this.findProducts()
      }
    },
    mounted() {
      this.findProducts()
    }
  }
</script>

<style lang="scss">
  .v-catalog {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    &__link_to_cart {
      position: fixed;
      top: 80px;
      right: 10px;
      padding: $padding*2;
      border: solid 1px #aeaeae;
      background: #ffffff;
    }
  }

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .range-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
  }

  .range-slider svg, .range-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }
</style>
