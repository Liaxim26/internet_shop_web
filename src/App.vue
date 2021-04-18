<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item nav-link">О компании</li>
        <li class="nav-item nav-link">Бренды</li>
        <li class="nav-item nav-link">Доставка</li>
        <li class="nav-item nav-link">Оплата</li>
        <li class="nav-item nav-link">Контакты</li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            Регистрация
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            Вход
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            Профиль
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            Выход
          </a>
        </li>
      </div>
    </nav>
  
    <div>
      <router-link :to="{name: 'mainPage'}">
        <img src="./assets/logo.jpg" alt="logo"> 
      </router-link>
    </div>  

    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="navbar-nav">
        <a class="nav-item nav-link">Скидки</a>
        <a class="nav-item">
          <router-link :to="{name: 'catalog', params: {category: 'new'}}" class="nav-link">
            <font-awesome-icon icon="home" />Новинка
          </router-link>
        </a>
        <a class="nav-item">
          <router-link :to="{name: 'catalog', params: {category: 'pod'}}" class="nav-link">
            <font-awesome-icon icon="home" />Pod-системы
          </router-link>
        </a>
        <a class="nav-item">
          <router-link :to="{name: 'catalog', params: {category: 'liquid'}}" class="nav-link">
            <font-awesome-icon icon="home" />Жидкости
          </router-link>
        </a>
        <a class="nav-item nav-link">Вейпы</a>
        <a class="nav-item nav-link">Атомайзеры</a>
        <a class="nav-item nav-link">Аксессуары</a>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>

  <!-- <template>
  <div id="app">
    <v-main-wrapper />
  </div>
</template>

<script>
  import vMainWrapper from './components/v-main-wrapper'
  import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {
    vMainWrapper
  },
  computed: {
    ...mapGetters([
      'IS_MOBILE',
      'IS_DESKTOP'
    ])
  },
  methods: {
    ...mapActions([
      'SET_MOBILE',
      'SET_DESKTOP'
    ]),
  },
  mounted() {
    let vm = this;
    window.addEventListener('resize', function () {
      if (window.innerWidth > 767) {
        vm.SET_DESKTOP()
        console.log('Desktop',vm.IS_DESKTOP)
      } else {
        vm.SET_MOBILE()
        console.log('Mobile',vm.IS_MOBILE)
      }
    })
  }
}
</script>-->

</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 160px;*/
}
@import url('../node_modules/vuetify/dist/vuetify.min.css');

</style> 