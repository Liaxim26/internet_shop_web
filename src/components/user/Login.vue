<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="3">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="onLogin" v-model="isFormValid">
                  <v-text-field
                    input
                    id="login"
                    label="Login"
                    name="login"
                    v-model="login"
                    :prepend-icon="'mdi-email'"
                    type="email"
                    :rules="[rules.required]"
                    required
                  />
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    :prepend-icon="'mdi-lock'"
                    type="password"
                    :rules="[rules.required]"
                    required
                  />
                  <div class="d-flex">
                      <div v-if="authErr" class="ma-2" style="color:#b11b1b">
                        Wrong email or password
                      </div>
                      <v-layout>
                        <v-spacer />
                        <v-btn
                          color="primary"
                          type="submit"
                          :loading="load"
                          :disabled="load || !isFormValid"
                          >
                              Log in
                        </v-btn>
                      </v-layout>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
    name: 'LoginPage',
    data() {
        return {
        login : '',
        password  : '',
        authErr : false,
        load : false,
        isFormValid : false,
        rules: {
          required: value => !!value || 'Required.'
        }}
    },
    methods:  {
        onLogin() {
            console.log("login " + this.login)
            console.log("password " + this.password)
            this.load = true
            console.log('load', this.load)
            axios.post(this.$store.getters.HOST + 'login', {
                    login: this.login,
                    password: this.password
            })
            .then(response => {
                console.log(response)
                this.$store.commit('SET_AUTH', response.data.token)
                let authData = this.$store.getters.GET_AUTH
                console.log(authData)
            })
            .catch(ex => {
                console.error('onauth ex: ', ex)
                this.authErr = true
            })
            .finally(() => {
              this.load = false
              console.log('load', this.load)
            })
        }
    }
}
</script>