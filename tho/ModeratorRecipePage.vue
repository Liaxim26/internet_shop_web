<template>
    <v-app>
        <v-container fluid>
            <v-content>
                <v-row>
                    <v-col :cols="columns" :offset="offset">
                        <v-progress-linear
                                v-show="this.recipeLoading"
                                color="blue"
                                indeterminate
                        />

                        <v-card v-if="recipe">
                            <v-card-title>{{recipe.name}}</v-card-title>

                            <v-alert
                                    v-if="recipe.isEditedClone"
                                    type="info"
                            >
                                This is edited copy of the recipe
                            </v-alert>

                            <v-img
                                    v-if="recipe.pictureId"
                                    :src="recipe._links.picture.href"
                            />

                            <v-card-text>
                                Ingredients:
                                <ul
                                        v-for="ingredient in recipe.ingredients"
                                        v-bind:key="ingredient.id"
                                >
                                    <li>{{ingredient.name}}, {{ingredient.value}} {{ingredient.valueType}}</li>
                                </ul>

                                Info:
                                <ul>
                                    <li>
                                        Calories: {{recipe.calories}}
                                    </li>
                                    <li>
                                        Proteins: {{recipe.proteins}}
                                    </li>
                                    <li>
                                        Carbohydrates: {{recipe.carbohydrates}}
                                    </li>
                                    <li>
                                        Fats: {{recipe.fats}}
                                    </li>
                                    <li>
                                        Price: {{recipe.price}}
                                    </li>
                                    <li>
                                        Cooking time: {{recipe.cookingTime}} minutes
                                    </li>
                                    <li>
                                        Cooking methods:
                                        <v-chip-group

                                        >
                                            <v-chip
                                                    v-for="method in recipe.cookingMethods"
                                                    v-bind:key="method"
                                                    label
                                            >
                                                {{method}}
                                            </v-chip>
                                        </v-chip-group>
                                    </li>
                                    <li>
                                        Cuisine: {{recipe.cuisine}}
                                    </li>

                                    <li>
                                        Tags:
                                        <v-chip-group

                                        >
                                            <v-chip
                                                    v-for="tag in recipe.tags"
                                                    v-bind:key="tag"
                                                    label
                                            >
                                                {{tag}}
                                            </v-chip>
                                        </v-chip-group>
                                    </li>

                                    <li v-if="recipe.state">
                                        State: {{recipe.state}}
                                    </li>
                                </ul>

                                <v-btn
                                        v-if="recipe._links.approve"
                                        @click="approve()"
                                >
                                    Approve recipe
                                </v-btn>

                                <v-btn
                                        v-if="recipe._links.decline"
                                        @click="decline()"
                                >
                                    Decline recipe
                                </v-btn>

                                <v-btn
                                        v-if="recipe._links.cloneChanges"
                                        @click="cloneChanges()"
                                >
                                    Clone changes
                                </v-btn>
                            </v-card-text>
                        </v-card>
                        <v-progress-linear
                                v-show="this.recipeStepsLoading"
                                color="blue"
                                indeterminate
                        >

                        </v-progress-linear>

                        <v-card
                                v-for="(step, index) in steps"
                                v-bind:key="step.id"
                                style="margin-top: 10px"
                        >
                            <v-card-title>
                                Step {{index + 1}}
                            </v-card-title>
                            <v-img
                                    v-if="step.picture"
                                    :src="step._links.picture.href"
                            >

                            </v-img>

                            <v-card-text
                                    v-if="step.description"
                            >
                                {{step.description}}
                            </v-card-text>

                        </v-card>
                    </v-col>

                    <v-col v-if="hasClone" cols=4 offset=2>
                        <v-card v-if="recipeOriginal">
                            <v-card-title>{{recipeOriginal.name}}</v-card-title>
                            <v-alert
                                    v-if="recipe.isEditedClone"
                                    type="info"
                            >
                                This is original version of the recipe
                            </v-alert>

                            <v-img
                                    v-if="recipeOriginal.pictureId"
                                    :src="recipeOriginal._links.picture.href"
                            />

                            <v-card-text>
                                Ingredients:
                                <ul
                                        v-for="ingredient in recipeOriginal.ingredients"
                                        v-bind:key="ingredient.id"
                                >
                                    <li>{{ingredient.name}}, {{ingredient.value}} {{ingredient.valueType}}</li>
                                </ul>

                                Info:
                                <ul>
                                    <li>
                                        Calories: {{recipeOriginal.calories}}
                                    </li>
                                    <li>
                                        Proteins: {{recipeOriginal.proteins}}
                                    </li>
                                    <li>
                                        Carbohydrates: {{recipeOriginal.carbohydrates}}
                                    </li>
                                    <li>
                                        Fats: {{recipeOriginal.fats}}
                                    </li>
                                    <li>
                                        Price: {{recipeOriginal.price}}
                                    </li>
                                    <li>
                                        Cooking time: {{recipeOriginal.cookingTime}} minutes
                                    </li>
                                    <li>
                                        Cooking methods:
                                        <v-chip-group

                                        >
                                            <v-chip
                                                    v-for="method in recipeOriginal.cookingMethods"
                                                    v-bind:key="method"
                                                    label
                                            >
                                                {{method}}
                                            </v-chip>
                                        </v-chip-group>
                                    </li>
                                    <li>
                                        Cuisine: {{recipeOriginal.cuisine}}
                                    </li>

                                    <li>
                                        Tags:
                                        <v-chip-group

                                        >
                                            <v-chip
                                                    v-for="tag in recipeOriginal.tags"
                                                    v-bind:key="tag"
                                                    label
                                            >
                                                {{tag}}
                                            </v-chip>
                                        </v-chip-group>
                                    </li>

                                    <li v-if="recipeOriginal.state">
                                        State: {{recipeOriginal.state}}
                                    </li>
                                </ul>

                            </v-card-text>
                        </v-card>


                        <v-card
                                v-for="(step, index) in originalSteps"
                                v-bind:key="step.id"
                                style="margin-top: 10px"
                        >
                            <v-card-title>
                                Step {{index + 1}}
                            </v-card-title>
                            <v-img
                                    v-if="step.picture"
                                    :src="step._links.picture.href"
                            >

                            </v-img>

                            <v-card-text
                                    v-if="step.description"
                            >
                                {{step.description}}
                            </v-card-text>

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
        props: ["recipeId"],
        data() {
            return {
                recipe: null,
                recipeLoading: false,
                recipeStepsLoading: false,
                recipeOriginal: null,
                hasClone: false,
                steps: [],
                originalSteps: [],
                columns: 6,
                offset: 3
            }
        },
        computed: {

        },
        methods: {
            loadRecipe() {
                this.recipeLoading = true;
                axios.get(this.$store.getters.getHostUrl + '/recipes/' + this.recipeId, {
                    auth: this.$store.getters.getAuth
                })
                    .then(result => {
                        if (result.data["id"]) {
                            this.recipe = result.data;
                            console.log(this.recipe);

                            if (this.recipe["isEditedClone"]) {
                                this.loadOriginal(result.data["id"]);
                            }

                            axios.get(this.$store.getters.getHostUrl + '/recipes/' + this.recipeId + '/steps', {
                                auth: this.$store.getters.getAuth
                            }).then(value => {
                                this.steps = value.data._embedded.recipeStepResourceList;
                            }).catch(reason => {
                                console.log(reason);
                            }).finally(() => {
                                this.recipeStepsLoading = false;
                            });
                        }

                        this.recipeLoading = false;
                    }).catch(reason => {
                    console.log(reason);
                })
            },

            loadOriginal(id) {
                this.recipeLoading = true;
                console.log("Loading original recipe...");

                axios.get(this.$store.getters.getHostUrl + '/moderator/recipes/' + id, {
                    auth: this.$store.getters.getAuth
                })
                    .then(result => {
                        console.log(result["data"]);

                        if (result.data["id"]) {
                            this.recipeOriginal = result.data;
                            this.hasClone = true;
                            this.columns = 4;
                            this.offset = 1;
                        }

                        axios.get(this.$store.getters.getHostUrl + '/moderator/recipes/' + id + '/steps', {
                            auth: this.$store.getters.getAuth
                        }).then(value => {
                            this.originalSteps = value.data._embedded.recipeStepResourceList;
                        }).catch(reason => {
                            console.log(reason);
                        }).finally(() => {
                            this.recipeStepsLoading = false;
                        });

                        this.recipeLoading = false;
                    }).catch(reason => {
                    console.log(reason);
                })
            },
            decline() {
                axios.post(this.recipe._links.decline.href,{},{
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    value;
                    this.$router.push("/moderator")
                }).catch(reason => {
                    alert("Rejected");
                    console.log(reason);
                })
            },
            approve() {
                axios.post(this.recipe._links.approve.href,{},{
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    value;
                    this.$router.push("/moderator")
                }).catch(reason => {
                    alert("Rejected");
                    console.log(reason);
                })
            },
            cloneChanges() {
                axios.post(this.recipe._links.cloneChanges.href,{},{
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    value;
                    this.$router.push("/moderator")
                }).catch(reason => {
                    alert("Rejected");
                    console.log(reason);
                })
            }
        },
        mounted () {
            this.loadRecipe(this.recipeId);
        }
    }
</script>
