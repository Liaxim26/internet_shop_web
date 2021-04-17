<template>
    <v-app>
        <v-container fluid>
            <v-content>
                <v-row>
                    <v-col cols="6" offset="3">
                        <v-card
                                v-for="recipe in recipes"
                                v-bind:key="recipe.id"
                                style="margin-top: 10px"
                        >
                            <v-card-title>
                                {{recipe.name}}
                            </v-card-title>

                            <v-card-text>
                                User ID: {{recipe.owner}}
                                <br>
                                State: {{recipe.state}}
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                        text
                                        @click="goToRecipe(recipe.id)"
                                >
                                    Show
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-content>
        </v-container>
    </v-app>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                recipes: []
            }
        },
        computed: {

        },
        methods: {
            getRecipes() {
                axios.get(this.$store.getters.getHostUrl + '/moderator/recipes', {
                    auth: this.$store.getters.getAuth
                })
                .then(result => {
                    console.log(result["data"]);

                    if (result.data["_embedded"]) {
                        this.recipes = result.data["_embedded"]["recipeResourceList"];
                    }
                }).catch(reason => {
                    console.log(reason);
                })
            },
            goToRecipe: function(rid) {
                this.$router.push({path: '/moderator/recipe/' + rid});
            }
        },
        mounted () {
            if (!this.$store.getters.isLogin) {
                this.$router.push("/login");
                return;
            }
            this.getRecipes();
        }
    }
</script>