<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="1" md="8">
          <v-card width="80%" style="padding: 20px">
            <v-container>
              <v-toolbar-title>{{ currentUser.username }}</v-toolbar-title>
              <p style="padding-left: 30px; color: blue" v-if="success">Saved successfully</p>
              <p/>
              <v-text-field label="Name" v-model="currentUser.fullName"></v-text-field>
              <v-text-field label="Phone number" v-model="currentUser.phoneNumber"></v-text-field>
              <v-btn color="primary" @click="save">Save</v-btn>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
import authHeader from '../../auth-header'

export default {
  name: 'Profile',
  data() {
    return {
      currentUser: {},
      success: null,

      rules: {
        required: value => !!value || "Required."
      },
      errors: null
    }
  },
  methods: {
    save() {
      axios.put(this.$store.getters.HOST + 'users/' + this.authData.userId, {
        fullName: this.currentUser.fullName,
        phoneNumber: this.currentUser.phoneNumber
      }, {
        headers: authHeader()
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err.response); 
      })
    }
  },
  computed: {
    authData() {
      console.log(this.$store.state.auth.user.userId)
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.authData) {
      //this.$router.push('/login');
    }

    console.log(authHeader())
    axios.get(this.$store.getters.HOST + 'users/' + this.authData.userId, {
      headers: authHeader()
      })
    .then(res => {
      console.log(res)
      this.currentUser = res.data
    })
    .catch(err => {
      console.error(err); 
    })
  }
};
</script>