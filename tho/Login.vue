<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="3"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="onLogin" v-model="isFormValid">
                  <v-text-field
                    input
                    id="email"
                    label="Mail"
                    name="email"
                    v-model="email"
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
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
        email : '',
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
            console.log("email " + this.email)
            console.log("password " + this.password)
            this.load = true
            console.log('load', this.load)
            axios.get(this.$store.getters.getHostUrl, {
                auth: {
                    username: this.email,
                    password: this.password
            }})
            .then(result => {
                let userAuth = {
                    username: this.email,
                    password: this.password
                }
                this.$store.commit('setAuth', userAuth)
                axios.get(result.data._links.me.href, {auth: userAuth})
                .then(userResult => {
                    let user = userResult.data
                    this.$store.commit('setUser', user)
                    this.$store.commit('setLogin')
                    this.$store.commit('setRoles')
                    this.$router.push('/profile')
                    console.log(userAuth)
                })
                .catch(userEx => {
                    console.error('user ex: ', userEx); 
                })
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