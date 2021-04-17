<template>
  <v-app>
    <v-content v-if="accessError == null">
      <v-container>
        <v-toolbar-title><b>Profile</b></v-toolbar-title>
        <v-col col="6">
          <v-card width="500">
            <v-card-text class="body-1 black--text">
              <div>
                <b>Username</b>
                : {{ userInfo.username }}
              </div>
              <div>
                <b>User ID</b>
                : {{ userInfo.id }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-container>
      <v-container>
        <v-col col="6">
          <v-progress-linear v-show="this.recipeLoading" color="blue" indeterminate />
        </v-col>
      </v-container>
      <v-container v-if="recipes.length != 0">
        <v-toolbar-title><b>Recipes</b></v-toolbar-title>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="recipe in recipes" :key="recipe.name" xs2>
              <v-card max-width="300px">
                <v-img
                        height="200px"
                        v-if="recipe.pictureId"
                        :src="recipe._links.picture.href"
                />
                <v-img
                        height="200px"
                        v-else
                        src="http://hel.krvd.ru/noimage.jpg"
                />
                <v-card-title>{{ recipe.name }}</v-card-title>
                <v-card-actions class="my-2">
                  <v-spacer />
                  <v-btn color="primary" text @click="toRecipe(recipe)">Show</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
    </v-content>
    <v-content v-else>
      <v-layout>{{ accessError }}</v-layout>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userInfo: {},
      recipes: [],
      accessError: null,
      recipeLoading: false
    };
  },
  methods: {
    toRecipe(value) {
      this.$router.push("/recipe/" + value.id);
    }
  },
  mounted() {
    this.recipeLoading = true;
    console.log(this.$route.params.id);
    axios
      .get(this.$store.getters.getHostUrl + "/users/" + this.$route.params.id, {
        auth: this.$store.getters.getAuth
      })
      .then(userResult => {
        this.userInfo = userResult.data;
        console.log("user info", this.userInfo);
        axios
          .get(this.userInfo._links.recipes.href, {
            auth: this.$store.getters.getAuth
          })
          .then(recipeResult => {
            this.recipes =
              Object.entries(recipeResult.data).length == 0
                ? []
                : recipeResult.data._embedded.recipeResourceList;
            console.log("recipes", this.recipes);
          })
          .catch(recipeEx => {
            console.error("recipe error: ", recipeEx.response.data.message);
          })
          .finally(() => {
            this.recipeLoading = false;
          });
      })
      .catch(userEx => {
        console.error("user error: ", userEx.response.data.message);
        this.accessError = userEx.response.data.message;
      });
  }
};
</script>