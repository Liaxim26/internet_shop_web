<template>
<header>
<div class="top-header">
	<div class="d-flex flex-column flex-md-row align-items-center bg-202020">
		<nav class="my-0 mr-md-auto font-weight-normal">
			<a class="p-2 text-white font-weight-light" href="">О компании</a>
			<a class="p-2 text-white font-weight-light" href="">Бренды</a>
			<a class="p-2 text-white font-weight-light" href="">Доставка</a>
			<a class="p-2 text-white font-weight-light" href="">Оплата</a>
			<a class="p-2 text-white font-weight-light" href="">Контакты</a>
		</nav>
    <router-link :to="'login'">
      <v-btn v-if="isNotLogin">Войти</v-btn>
    </router-link>
    <v-btn v-if="isLogin" @click="logout">Выйти</v-btn>
    <router-link :to="'register'">
      <v-btn>Регистрация</v-btn>
    </router-link>
	</div> 
</div>	
<div class="mid-header d-flex flex-column flex-md-row align-items-center">
  <div class="search">
    <div class="search-container">
      <form method="post" action="">
        <input type="text" placeholder="Поиск" name="search">
      </form>
    </div>
  </div>
  <div class="address v-shadow">
      <a class="p-2 text-dark" href="">Адреса магазинов</a>
  </div>
  <div class="logo">
    <a href=""><img src="../../assets/logo.jpg" alt="CloudsWorld"></a>
  </div>
  <div class="basket v-shadow">
    <a class="p-2 text-dark" href="">Корзина</a>
  </div>
  <div class="number">
    <h4>+7 (495) 485-15-51</h4>
    <p class="info">Интернет-магазин работает <br>с 07:00 до 23:00 без выходных</p>
  </div>
</div>
<div class="menu">
  <nav>
    <a class="text-dark font-weight-bold" href="">Скидки</a>
    <a class="text-dark font-weight-bold">
       <router-link :to="{name: 'catalog', params: {category: 'new'}}">
         Новинка
       </router-link>
    </a>
     <a class="text-dark font-weight-bold">
       <router-link :to="{name: 'catalog', params: {category: 'pod'}}">
         Pod-системы
       </router-link>
    </a>
    <a class="text-dark font-weight-bold">
       <router-link :to="{name: 'catalog', params: {category: 'liquid'}}">
        Жидкости
       </router-link>
    </a>
    <a class="text-dark font-weight-bold" href="">Вейпы</a>
    <a class="text-dark font-weight-bold" href="">Атомайзеры</a>
    <a class="text-dark font-weight-bold" href="">Аксессуары</a>
  </nav>
</div>
</header>

 <!-- <div class='v-header'>
    <router-link :to="{name: 'mainPage'}">
      <img src="../../assets/logo.png" alt="">
    </router-link>
    <div class="search-field">
      <input
          type="text"
          v-model="searchValue"
      >
      <button class="search_btn">
        <i class="material-icons" @click="search(searchValue)">search</i>
      </button>
      <button class="search_btn">
        <i class="material-icons" @click="clearSearchField">cancel</i>
      </button>
    </div>
    </div> -->
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "v-header",
    props: {},
    data() {
      return {
        searchValue: ''
      }
    },
    computed: {
      ...mapGetters([
        'SEARCH_VALUE'
      ]),
      isNotLogin() {
        let auth = this.$store.getters.GET_AUTH
        console.log('auth true ' + auth)
        return auth == null
      },
      isLogin() {
        let auth = this.$store.getters.GET_AUTH
        console.log('auth true ' + auth)
        return auth != null
      }
    },
    methods: {
      ...mapActions([
        'GET_SEARCH_VALUE_TO_VUEX'
      ]),
      loadCatalog(category){
        this.$router.push({name: 'catalog', params:{category: category} })
      },
      isLogged() {
        let auth = this.$store.getters.GET_AUTH
        console.log('auth true ' + auth)
        return auth != null
      },
      logout() {
        console.log('log out')
        this.$store.commit('SET_AUTH', null)
        console.log(this.$store.getters.GET_AUTH)
      },
      search(value) {
        this.GET_SEARCH_VALUE_TO_VUEX(value);
        if (this.$route.path !== '/catalog') {
          this.$router.push('/catalog')
        }
      },
      clearSearchField() {
        this.searchValue = ''
        this.GET_SEARCH_VALUE_TO_VUEX();
        if (this.$route.path !== '/catalog') {
          this.$router.push('/catalog')
        }
      }
    }
  }
</script>

<style lang="scss">
  .top-header{
    height: 50px;
    background-color: #202020;
    padding-left: 20px;
    padding-right: 20px;
  }
  .mid-header{
    height: 100px;
    box-shadow: 0 8px 3px -9px rgba(0,0,0,0.5);
    padding-bottom: 5px;
    padding-top: 5px;
  }
  .mid-header > div {
      /*margin-right: 3%;
      padding-top: 5px;*/
      float: left;
      width: 11%;
      padding: 10px;
      text-align: center;
      margin: 7.5px 3% 7.5px 5%;
  }
  .search{
    padding-top: 30px;
    padding-left: 20px;
  }
  .info{
    font-size: 11px;
  }
  .v-shadow{
    box-shadow: 0 8px 11px -9px rgba(0,0,0,0.2);
    padding-bottom: 5px;
  }
  /*.address{
    box-shadow: 0 8px 11px -9px rgba(0,0,0,0.2);
    padding-bottom: 5px;
  }
  .basket{
    box-shadow: 0 8px 11px -9px rgba(0,0,0,0.2);
    padding-bottom: 5px;	
  }*/
  section{
    padding-left: 33.5px;
    padding-right: 33.5px;
  }
  .menu > nav >a{	
   // float: left;
    width: 14.27%;
    padding: 10px;
    text-align: center;
    margin: 7.5px 0 7.5px 0;
  }
 /* .v-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #202020;
    padding: 16px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;

    img {
      width: 50px;
    }

    .search-field {
      padding: 16px;
      position: relative;
      right: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .search_btn {
      margin-left: 16px;
      background: transparent;
      border: none;
    }
  }*/
</style>
