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
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Registration form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="onRegistration" v-model="isFormValid">
                  <p style="padding-left: 30px; color: brown" v-if="errors && errors.username">{{ errors.username }}</p>
                  <v-text-field
                    input
                    id="username"
                    label="Username"
                    name="username"
                    type="text"
                    v-model="username"
                    :rules="[rules.reqired]"
                    :prepend-icon="'mdi-email'"
                  />
                  <p style="padding-left: 30px; color: brown" v-if="errors && errors.email">{{ errors.email }}</p>
                  <v-text-field
                    input
                    id="email"
                    label="Mail"
                    name="email"
                    type="email"
                    v-model="email"
                    :rules="[rules.reqired, rules.email]"
                    :prepend-icon="'mdi-email'"
                  />
                  <p style="padding-left: 30px; color: brown" v-if="errors && errors.password">{{ errors.password }}</p>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    counter="20"
                    v-model="password"
                    :rules="[rules.required]"
                    :prepend-icon="'mdi-lock'"
                  />
                  <v-text-field
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    
                    :rules="[rules.passwordsMatch, rules.required]"
                    v-model="confirmPassword"
                    :prepend-icon="'mdi-lock'"
                  />
                  <v-layout>
                      <v-spacer />
                      <v-btn color="primary" type="submit" :disabled="!isFormValid">Registration</v-btn>
                  </v-layout>
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
    name: "RegisterPage",
    data() {
      return {
        username: '',
        email : '',
        password  : '',
        confirmPassword : '',
        isFormValid : false,
        errors : null,
        rules: {
          required: value => !!value || 'Required.',
          //counter: value => value.length >= 8 && value.length <= 20 || 'Password\'s length must be between 8 and 20',
          passwordsMatch: value => value == this.password || 'Passwords do not match',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      };
    },


    methods:  {
      onRegistration() {
        this.errors = null
        console.log('valid form', this.isFormValid)
        console.log(this.email)
        console.log(this.password)
        let requestBody = {
          username: this.username,
          email: this.email,
          password: this.password
        }
        axios.post(this.$store.getters.HOST + 'register', requestBody)
        .then(registerResponse => {
          console.log(registerResponse)
        })
        .catch(registerEx => {
          //let failure = registerEx.data.message
          console.log(registerEx.response.data)
          this.errors = registerEx.response.data.errors
          console.error(registerEx.response.data.errors) 
        })
      }
    }    
  }
</script>