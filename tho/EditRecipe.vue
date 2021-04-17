<template>
    <v-app>
        <v-container fluid>
            <v-content>
                <v-row>
                    <v-progress-linear
                            v-show="this.recipeLoading"
                            color="blue"
                            indeterminate
                    />

                    <v-col :cols="6" offset="3" v-if="recipe">
                        <v-alert
                                v-if="errors.length > 0"
                                type="error"
                        >
                            <ul
                                    v-for="error in errors"
                                    v-bind:key="error"
                            >
                                <li>
                                    {{error}}
                                </li>
                            </ul>
                        </v-alert>

                        <v-img
                                v-if="recipe.pictureId"
                                :src="mainPictureLink"
                        />
                        <v-col cols="12">
                            <v-file-input
                                    v-model="selectedFile"
                                    v-if="!recipe.pictureId"
                                    label="Select image"
                                    accept="image/*"
                                    @change="uploadMain()"
                            >
                                Add picture
                            </v-file-input>
                        </v-col>

                        <v-btn
                                v-if="recipe.pictureId"
                                color="error"
                                @click="removeMainImage()"
                        >
                            Remove image
                        </v-btn>

                        <v-text-field
                                v-model="recipe.name"
                                counter=250
                                required
                                label="Name"
                        />

                        <v-row>
                            <v-col cols="2">
                                <v-text-field
                                        v-model="recipe.calories"
                                        counter=4
                                        required
                                        label="Calories"
                                        type="number"
                                />
                            </v-col>

                            <v-col cols="2">
                                <v-text-field
                                        v-model="recipe.proteins"
                                        counter=4
                                        required
                                        label="Proteins"
                                        type="number"
                                />
                            </v-col>


                            <v-col cols="2">
                                <v-text-field
                                        v-model="recipe.carbohydrates"
                                        counter=4
                                        required
                                        label="Carbohydrates"
                                        type="number"
                                />
                            </v-col>

                            <v-col cols="2">
                                <v-text-field
                                        v-model="recipe.fats"
                                        counter=4
                                        required
                                        label="Fats"
                                        type="number"
                                />
                            </v-col>

                            <v-col cols="2">
                                <v-text-field
                                        v-model="recipe.cookingTime"
                                        counter=4
                                        required
                                        label="Cooking time"
                                        type="number"
                                />
                            </v-col>

                            <v-col cols="2">
                                <v-text-field
                                        v-model="recipe.price"
                                        counter=5
                                        required
                                        label="Price"
                                        type="number"
                                />
                            </v-col>

                        </v-row>

                        <v-select
                                v-model="recipe.cookingMethods"
                                :items="availableCookingMethods"
                                hint="Select cooking methods"
                                persistent-hint
                                multiple
                        />

                        <v-select
                                v-model="recipe.cuisine"
                                :items="availableCuisines"
                                hint="Select cuisine"
                                persistent-hint
                        />

                        <v-combobox
                                v-model="recipe.tags"
                                :loading="tagsLoading"
                                :items="tagsItems"
                                :search-input.sync="tagsSync"
                                cache-items
                                hint="Input tags"
                                persistent-hint
                                multiple
                                chips
                                hide-selected
                                clearable
                                deletable-chips
                        />

                        <v-combobox
                                v-model="recipe.ingredients"
                                :loading="ingredientsLoading"
                                :items="ingredientsItems"
                                :search-input.sync="ingredientsSync"
                                item-text="name"
                                item-value="id"
                                cache-items
                                hint="Input ingredients"
                                persistent-hint
                                multiple
                                chips
                                hide-selected
                                clearable
                                deletable-chips
                        />

                        <v-row v-for="ingredient in recipe.ingredients" v-bind:key="ingredient.id">
                            <v-col cols="4">
                                <v-text-field
                                        v-model="ingredient.name"
                                        disabled
                                />
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                        v-model="ingredient.valueType"
                                        hint="Value type"
                                        counter="16"
                                        persistent-hint
                                />
                            </v-col>
                            <v-col cols-4>
                                <v-text-field
                                        v-model="ingredient.value"
                                        hint="Value"
                                        persistent-hint
                                />
                            </v-col>
                        </v-row>
                        <v-card v-for="(step, index) in steps" v-bind:key="step.id" style="margin-top: 10px">
                            <v-card-title>
                                Step {{index + 1}}
                            </v-card-title>
                            <v-img
                                    v-if="step.picture"
                                    :src="hostUrl.concat('pictures/').concat(step.picture)"
                            />
                            <v-col cols="12">
                                <v-file-input
                                        v-model="step.selectedFile"
                                        v-if="!step.picture"
                                        label="Select image"
                                        accept="image/*"
                                        @change="upload(index)"
                                >
                                    Add picture
                                </v-file-input>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                        v-model="step.description"
                                        auto-grow
                                        hint="Description"
                                        persistent-hint
                                        solo
                                />
                            </v-col>
                            <v-col cols="3">
                                <v-btn
                                        v-if="step.picture"
                                        color="error"
                                        @click="removeImage(index)"
                                >
                                    Remove image
                                </v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn
                                        color="error"
                                        @click="removeStep(index)"
                                >
                                    Remove step
                                </v-btn>
                            </v-col>

                        </v-card>

                        <v-btn
                                @click="addStep()"
                                style="margin-top: 10px"
                        >
                            Add step
                        </v-btn>

                        <v-btn
                                @click="process()"
                                block
                                color="primary"
                                style="margin-top: 50px"
                        >
                            {{btnText}}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-content>
        </v-container>
    </v-app>
</template>

<script>
    import axios from 'axios'

    export default {
        props: ["recipeId"],
        data() {
            return {
                recipeLoading: false,
                recipeStepsLoading: false,
                recipe: null,
                steps: null,
                availableCookingMethods: [],
                availableCuisines: [],
                tagsItems: [],
                tagsLoading: false,
                tagsSync: null,
                ingredientsItems: [],
                ingredientsLoading: false,
                ingredientsSync: null,
                btnText: "",
                action: null,
                actionLoading: false,
                errors: [],
                selectedFile: null,
                mainPictureLink: null,
            }
        },
        methods: {
            loadRecipe: function (rid) {
                this.recipeLoading = true;
                this.recipeStepsLoading = true;

                axios.get(this.$store.getters.getHostUrl + '/recipes/' + rid, {
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    this.recipe = value.data;
                    if (value.data._links.picture) {
                        this.mainPictureLink = value.data._links.picture.href
                    }
                }).catch(reason => {
                    console.log(reason);
                }).finally(() => {
                    this.recipeLoading = false;
                });

                axios.get(this.$store.getters.getHostUrl + '/recipes/' + rid + '/steps', {
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    this.steps = value.data._embedded.recipeStepResourceList;
                }).catch(reason => {
                    console.log(reason);
                }).finally(() => {
                    this.recipeStepsLoading = false;
                });
            },
            setAvailableCookingMethods: function () {
                axios.get(this.$store.getters.getHostUrl + '/recipes/cookingMethods').then(value => {
                    this.availableCookingMethods = value.data._embedded.stringList;
                }).catch(reason => {
                    console.log(reason);
                })
            },
            setAvailableCuisines: function () {
                axios.get(this.$store.getters.getHostUrl + '/recipes/cuisines').then(value => {
                    this.availableCuisines = value.data._embedded.stringList;
                }).catch(reason => {
                    console.log(reason);
                })
            },
            searchTags: function (name) {
                this.tagsLoading = true;

                axios.get(this.$store.getters.getHostUrl + '/tags?name=' + name, {
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    this.tagsItems = value.data._embedded.tagResourceList.map(e => e.name);
                }).catch(reason => {
                    console.log(reason);
                }).finally(() => {
                    this.tagsLoading = false;
                })
            },
            searchIngredients: function (name) {
                this.ingredientsLoading = true;

                axios.get(this.$store.getters.getHostUrl + '/ingredients?name=' + name, {
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    this.ingredientsItems = value.data._embedded.ingredientResourceList;
                }).catch(reason => {
                    console.log(reason);
                }).finally(() => {
                    this.ingredientsLoading = false;
                })
            },
            validate() {
                this.errors = [];

                if (this.recipe.name.length > 250) {
                    this.errors.push("Name cannot contain more than 250 characters");
                }

                if (this.recipe.name.length === 0) {
                    this.errors.push("Name cannot be empty");
                }

                if (this.recipe.calories > 1000) {
                    this.errors.push("Calories cannot be more than 1000");
                }

                if (this.recipe.calories < 1) {
                    this.errors.push("Calories cannot be less than 1");
                }


                if (this.recipe.fats < 1) {
                    this.errors.push("Fats cannot be less than 1");
                }

                if (this.recipe.fats > 99) {
                    this.errors.push("Fats cannot be more than 99");
                }

                if (this.recipe.proteins < 1) {
                    this.errors.push("Proteins cannot be less than 1");
                }

                if (this.recipe.proteins > 99) {
                    this.errors.push("Proteins cannot be more than 99");
                }

                if (this.recipe.carbohydrates < 1) {
                    this.errors.push("Carbohydrates cannot be less than 1");
                }

                if (this.recipe.carbohydrates > 99) {
                    this.errors.push("Carbohydrates cannot be more than 99");
                }

                if (this.recipe.cookingTime > 1440) {
                    this.errors.push("Cooking time cannot be more than 1440 minutes");
                }

                if (this.recipe.cookingTime < 1) {
                    this.errors.push("Cooking time cannot be less than 1 minutes");
                }

                if (this.recipe.price > 10000) {
                    this.errors.push("Price cannot be more than 10000 rubles");
                }

                if (this.recipe.price < 1) {
                    this.errors.push("Price cannot be less than 1 ruble");
                }

                if (this.recipe.cookingMethods.length < 1) {
                    this.errors.push("Recipe must contain at least 1 cooking method");
                }

                if (this.recipe.cuisine === "") {
                    this.errors.push("Recipe cuisine must be provided");
                }

                if (this.recipe.ingredients.length === 0) {
                    this.errors.push("Recipe must contain at least 1 ingredient");
                }

                this.recipe.ingredients.forEach(function(ingr) {
                    if (ingr.value === null || ingr.value === "" || !ingr.hasOwnProperty("value")) {
                        this.errors.push(ingr.name + " must contain value");
                    }

                    if (ingr.valueType === null || ingr.valueType === "" || !ingr.hasOwnProperty("valueType")) {
                        this.errors.push(ingr.name + " must contain value type");
                    }
                }, this);

                if (this.steps.length === 0) {
                    this.errors.push("Recipe must contain at least 1 step");
                } else {
                    this.steps.forEach(function(step, i) {
                        if (step.description === null && step.picture === null) {
                            this.errors.push("Step " + (i+1) + " must contain at least description or picture");
                        }
                    }, this);
                }



                return this.errors.length === 0;
            },
            process() {
                if (!this.validate())
                    return;

                if (this.action === "update") {
                    this.updateRecipe();
                } else {
                    this.createRecipe();
                }
            },
            createRecipe() {
                this.actionLoading = true;

                axios.post(this.$store.getters.getHostUrl + '/recipes/', {
                    info: this.recipe,
                    steps: this.steps
                },{
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    let newRecipeId = value.data.id;
                    this.$router.push("/recipe/" + newRecipeId);
                }).catch(reason => {
                    console.log(reason);
                }).finally(() => {
                    this.actionLoading = false;
                })
            },
            updateRecipe() {
                this.actionLoading = true;

                axios.put(this.$store.getters.getHostUrl + '/recipes/' + this.recipeId, {
                    info: this.recipe,
                    steps: this.steps
                },{
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    value;
                    this.$router.push("/recipe/" + this.recipeId);
                }).catch(reason => {
                    console.log(reason);
                }).finally(() => {
                    this.actionLoading = false;
                })
            },
            addStep() {
                this.steps.push({description: null, picture: null})
            },
            upload(index) {
                let formData = new FormData();
                formData.append("file", this.steps[index].selectedFile);

                axios.post(this.$store.getters.getHostUrl + '/pictures/', formData, {
                    auth: this.$store.getters.getAuth,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(value => {
                    this.steps[index].picture = value.data.id
                }).catch(reason => {
                    console.log(reason)
                })
            },
            uploadMain() {
                let formData = new FormData();
                formData.append("file", this.selectedFile);

                axios.post(this.$store.getters.getHostUrl + '/pictures/', formData, {
                    auth: this.$store.getters.getAuth,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(value => {
                    this.recipe.pictureId = value.data.id;
                    this.mainPictureLink = this.$store.getters.getHostUrl + '/pictures/' + value.data.id;
                }).catch(reason => {
                    console.log(reason)
                })
            },
            removeMainImage() {
                this.recipe.pictureId = null;
            },
            removeImage(index) {
                this.steps[index].picture = null;
                this.selectedFile = null;
            },
            removeStep(index) {
                if (confirm("Are you sure?")) {
                    this.steps.splice(index, 1);
                }
            }
        },
        watch: {
            tagsSync (val) {
                val && val !== this.recipe.tags && this.searchTags(val);
            },
            ingredientsSync (val) {
                val && val !== this.recipe.ingredients && this.searchIngredients(val)
            }
        },
        computed: {
            hostUrl: function() {
                return this.$store.getters.getHostUrl + "/";
            }
        },
        mounted() {
            if (!this.$store.getters.isLogin) {
                this.$router.push("/login");
                return;
            }

            if (this.recipeId && this.recipeId !== "new" && this.recipeId !== undefined) {
                this.loadRecipe(this.recipeId);
                this.btnText = "Update";
                this.action = "update";
            } else {
                this.recipe = {
                    name: "",
                    calories: null,
                    fats: null,
                    carbohydrates: null,
                    proteins: null,
                    cookingTime: null,
                    price: null,
                    cookingMethods: [],
                    cuisine: "",
                    tags: [],
                    ingredients: [],
                    pictureId: null,
                };
                this.btnText = "Create";
                this.action = "create";
                this.steps = [];
                this.recipeLoading = false;
                this.recipeStepsLoading = false;
            }

            this.setAvailableCookingMethods();
            this.setAvailableCuisines();
        }
    }
</script>