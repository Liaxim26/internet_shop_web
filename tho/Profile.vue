<template>
  <v-app>
    <v-content v-if="isLogin">
      <v-container>
        <v-toolbar-title><b>Profile</b></v-toolbar-title>
        <v-layout>
          <v-col col="6">
            <v-card width="500">
              <v-spacer />
              <v-card-text class="body-1 black--text">
                <div>
                  <b>Username</b>
                  : {{ userInfo.username }}
                </div>
                <div>
                  <b>E-Mail</b>
                  : {{ userInfo.email }}
                </div>
                <div>
                  <b>ID</b>
                  : {{ userInfo.id }}
                </div>
                <div>
                  <b>Gender</b>
                  : {{ userInfo.gender }}
                </div>
                <div>
                  <b>Height</b>
                  : {{ userInfo.height }}
                </div>
                <div>
                  <b>Weight</b>
                  : {{ userInfo.weight }}
                </div>
                <div>
                  <b>Birthday</b>
                  : {{ userInfo.birthday }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="toEdit" color="primary">Edit Profile</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-layout>
      </v-container>
      <v-container v-if="recipes.length != 0">
        <v-toolbar-title><b>My Recipes</b></v-toolbar-title>
        <v-col col="6">
          <v-progress-linear v-show="this.recipeLoading" color="blue" indeterminate />
        </v-col>
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
      <div v-if="!this.recipeLoading && !hasRecipe" class="title black--text" align-center>
        <v-col offset="1">You have no recipe.</v-col>
      </div>
    </v-content>
    <div v-else class="display-1 black--text" align="center">No data for unauthorized users</div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userInfo: {},
      recipes: {},
      recipeLoading: false,
      hasRecipe: false
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    toEdit() {
      this.$router.push("/profile/edit");
    },
    toRecipe(value) {
      this.$router.push("/recipe/" + value.id);
    }
  },
  mounted() {
    this.recipeLoading = true;
    console.log(this.$store.getters.getAuth);
    if (this.$store.getters.getAuth === null) {
      return;
    }
    console.log("profile started");
    console.log(this.$store.getters.getUser._links);
    this.userInfo = this.$store.getters.getUser;
    axios
      .get(this.$store.getters.getUser._links.recipes.href, {
        auth: this.$store.getters.getAuth
      })
      .then(res => {
        if (res.data._embedded) {
          this.recipes = res.data._embedded.recipeResourceList;
          this.hasRecipe = true;
        } else {
          this.recipes = [];
          this.hasRecipe = false;
        }
        console.log("recipes");
        console.log(this.recipes)
      })
      .catch(() => {
        console.error("recipes not accessed");
      })
      .finally(() => {
        this.recipeLoading = false;
      });
  }
};
</script>