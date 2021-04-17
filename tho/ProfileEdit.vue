<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="1" md="8">
          <v-card v-if="isLogin" width="80%" style="padding: 20px">
            <v-container>
              <v-toolbar-title>Profile</v-toolbar-title>
              <p
                style="padding-left: 30px; color: brown"
                v-if="errors && errors.username"
              >{{ errors.username }}</p>
              <p style="padding-left: 30px; color: blue" v-if="infoSuccess">Saved successfully</p>
              <v-text-field label="Name" v-model="userInfo.username"></v-text-field>
              <p
                style="padding-left: 30px; color: brown"
                v-if="errors && errors.gender"
              >{{ errors.email }}</p>
              <v-select
                dense
                solo
                v-model="userInfo.gender"
                menu-props="auto"
                :items="genders"
                :value="userInfo.gender"
              ></v-select>
              <p
                style="padding-left: 30px; color: brown"
                v-if="errors && errors.height"
              >{{ errors.height }}</p>
              <v-text-field label="Height" v-model="userInfo.height"></v-text-field>
              <p
                style="padding-left: 30px; color: brown"
                v-if="errors && errors.weight"
              >{{ errors.weight }}</p>
              <v-text-field label="Weight" v-model="userInfo.weight"></v-text-field>
              <p
                style="padding-left: 30px; color: brown"
                v-if="errors && errors.birthday"
              >{{ errors.birthday }}</p>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="userInfo.birthday"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    :value="userInfo.birthday"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" format="dd" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-btn color="primary" @click="SaveInfo()">Save</v-btn>
            </v-container>
            <v-container>
              <v-toolbar-title>Email</v-toolbar-title>
              <p
                style="padding-left: 30px; color: brown"
                v-if="errors && errors.email"
              >{{ errors.email }}</p>
              <p style="padding-left: 30px; color: blue" v-if="emailSuccess">Saved successfully</p>
              <v-text-field label="Email" v-model="userEmail"></v-text-field>
              <v-btn color="primary" @click="SaveEmail()">Save</v-btn>
            </v-container>
            <v-container>
              <v-form @submit.prevent="SavePassword" v-model="isPasswordFormValid">
                <v-toolbar-title>Password</v-toolbar-title>
                <p
                  style="padding-left: 30px; color: brown"
                  v-if="errors && errors.password"
                >{{ errors.password }}</p>
                <p style="padding-left: 30px; color: blue" v-if="passwordSuccess">Saved successfully</p>
                <v-text-field 
                label="New password" 
                id="password" 
                type="password"
                v-model="userPassword" 
                :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  label="Confirm your new password"
                  type="password"
                  v-model="userPasswordConfirm"
                  :rules="[rules.required, rules.passwordsMatch]"
                ></v-text-field>
                <v-btn color="primary" type="submit" :disabled="!isPasswordFormValid">Save</v-btn>
              </v-form>
            </v-container>
          </v-card>
          <div v-else>No data for unauthorized users</div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      userInfo: {
        username: null,
        gender: null,
        height: null,
        weight: null,
        birthday: null
      },
      userEmail: null,
      userPassword: null,
      userPasswordConfirm: null,
      infoSuccess: null,
      emailSuccess: null,
      passwordSuccess: null,
      menu: null,
      date: null,
      isPasswordFormValid: false,
      datePickerShow: false,
      genders: ["MALE", "FEMALE", "UNKNOWN"],
      rules: {
        required: value => !!value || "Required.",
        passwordsMatch: value =>
          value == this.userPassword || "Passwords do not match"
      },
      errors: null
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    SaveInfo() {
      this.errors = null;
      this.infoSuccess = null;
      this.emailSuccess = null;
      this.passwordSuccess = null;
      console.log(this.userInfo.birthday);
      this.userInfo.birthday = this.date ? moment(this.date).format("DD.MM.YYYY") : this.date;
      console.log(this.userInfo.birthday);
      console.log(this.userInfo);
      console.log(this.$store.getters.getUser._links.update.href);
      axios
        .patch(this.$store.getters.getUser._links.update.href, this.userInfo, {
          auth: this.$store.getters.getAuth
        })
        .then(updateResult => {
          this.infoSuccess = true;
          console.log("temp info");
          console.log(this.userInfo);
          console.log("update result");
          console.log(updateResult.data);
          this.$store.commit("setUser", updateResult.data);
          console.log("store user");
          console.log(this.$store.getters.getUser);
        })
        .catch(updateEx => {
          this.errors = updateEx.response.data.errors;
          console.log(this.errors);
          console.log(updateEx.response.data);
        });
    },
    SavePassword() {
      this.errors = null;
      this.infoSuccess = null;
      this.emailSuccess = null;
      this.passwordSuccess = null;
      console.log(this.userPassword);
      axios
        .patch(
          this.$store.getters.getUser._links.update.href,
          { password: this.userPassword },
          { auth: this.$store.getters.getAuth }
        )
        .then(updateResult => {
          this.passwordSuccess = true;
          let oldAuth = this.$store.getters.getAuth;
          oldAuth.password = this.userPassword;
          this.$store.commit("setAuth", oldAuth);

          console.log("update result");
          console.log(updateResult.data);
          this.$store.commit("setUser", updateResult.data);

          console.log("store user");
          console.log(this.$store.getters.getUser);
        })
        .catch(updateEx => {
          this.errors = updateEx.response.data.errors;
          console.log(this.errors);
          console.log(updateEx.response.data);
        });
    },
    SaveEmail() {
      this.errors = null;
      this.infoSuccess = null;
      this.emailSuccess = null;
      this.passwordSuccess = null;
      console.log(this.userEmail);
      axios
        .patch(
          this.$store.getters.getUser._links.update.href,
          { email: this.userEmail },
          { auth: this.$store.getters.getAuth }
        )
        .then(updateResult => {
          this.emailSuccess = true;
          let oldAuth = this.$store.getters.getAuth;
          oldAuth.username = this.userEmail;
          this.$store.commit("setAuth", oldAuth);

          console.log("update result");
          console.log(updateResult.data);
          this.$store.commit("setUser", updateResult.data);

          console.log("store user");
          console.log(this.$store.getters.getUser);
        })
        .catch(updateEx => {
          this.errors = updateEx.response.data.errors;
          console.log(this.errors);
          console.log(updateEx.response.data);
        });
    }
  },
  mounted() {
    if (this.$store.getters.getAuth === null) {
      return;
    }
    console.log("user info");
    console.log(this.$store.getters.getUser);
    let user = this.$store.getters.getUser;
    this.userInfo.username = user.username;
    this.userInfo.height = user.height;
    this.userInfo.weight = user.weight;
    this.userInfo.gender = user.gender;
    this.userInfo.birthday = user.birthday;
    this.userEmail = user.email;
  }
};
</script>