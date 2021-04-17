<template>
    <v-app>
        <v-container fluid>
            <v-content>
                <v-row>
                    <v-col cols=6 offset=3>
                        <v-progress-linear
                                v-show="this.recipeLoading"
                                color="blue"
                                indeterminate
                        />

                        <v-layout v-if="!recipe && !recipeLoading" justify-center>Recipe was not found</v-layout>

                        <v-card v-if="recipe">
                            <v-img
                                    v-if="recipe.pictureId"
                                    :src="recipe._links.picture.href"
                            />

                            <v-card-title class="display-1">{{recipe.name}}</v-card-title>
                            <v-card-subtitle>
                                <v-rating
                                        v-if="recipe.rating > 0"
                                        :value="recipe.rating"
                                        dense
                                        readonly
                                        half-increments
                                />
                            </v-card-subtitle>

                            <v-alert
                                    v-if="recipe.isEditedClone"
                                    type="warning"
                            >
                                You have edited this recipe. Other users can only see the previous version.
                            </v-alert>
                            
                            <v-card-text>
                                <div class="headline">Ingredients:</div>
                                <ul
                                        class="body-1"
                                        v-for="ingredient in recipe.ingredients"
                                        v-bind:key="ingredient.id"
                                >
                                    <li>{{ingredient.name}}, {{ingredient.value}} {{ingredient.valueType}}</li>
                                </ul>

                                <div class="headline">Info:</div>
                                <ul class="body-1">
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
                                        v-if="recipe._links.update"
                                        @click="$router.push('/recipe/' + recipe.id + '/edit')"
                                >
                                    Edit
                                </v-btn>

                                <v-btn
                                        v-if="recipe._links.approve"
                                        @click="requestForApproval(recipe.id)"
                                >
                                    Request for approval
                                </v-btn>

                                <v-btn
                                        v-if="recipe._links.owner"
                                        @click="$router.push('/user/' + recipe.owner)"
                                >
                                    View recipe owner's profile
                                </v-btn>

                                <v-btn
                                        v-if="recipe._links.remove"
                                        @click="removeRecipe(recipe.id)"
                                >
                                    Delete
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
                            <v-card-title class="headline">
                                Step {{index + 1}}
                            </v-card-title>
                            <v-img
                                    v-if="step.picture"
                                    :src="step._links.picture.href"
                            >

                            </v-img>

                            <v-card-text
                                    class="body-1"
                                    v-if="step.description"
                            >
                                {{step.description}}
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row v-if="recipe && (recipe._links.add_review || reviewEditing)">
                    <v-col cols=6 offset=3>
                        <v-card class="px-2">
                            <v-card-title v-if="recipe._links.add_review">Add review</v-card-title>
                            <v-card-title v-if="reviewEditing">Edit review</v-card-title>
                            <v-container>
                                <span v-if="errors && errors.rating" class="mx-4" style="color: brown">{{ errors.rating }}</span>
                                <v-rating v-model="ratingValue" class="mx-3"></v-rating>
                            </v-container>
                            <v-container>
                                <span v-if="errors && errors.reviewText" class="mx-4" style="color: brown">{{ errors.reviewText }}</span>
                                <v-textarea v-model="reviewText" outlined class="mx-4"></v-textarea>
                            </v-container>
                            <v-layout justify-end>
                                <v-btn class="mb-5" v-if="recipe._links.add_review" @click="addReview(recipe.id)">Add review</v-btn>
                                <v-btn class="mx-5" v-if="reviewEditing" @click="setEditing(null)">Close</v-btn>
                                <v-btn class="mb-5" v-if="reviewEditing" @click="updateReview(ownReview)">Save</v-btn>
                            </v-layout>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row v-if="reviewsLoaded && recipe">
                    <v-col cols=6 offset=3>
                        <v-card>
                            <v-card-title>Reviews ({{ reviews.length }} total)</v-card-title>
                                <v-card v-for="review in reviews" v-bind:key="review.id">
                                    <v-card-title style="cursor: pointer">
                                        <v-icon>mdi-account</v-icon>
                                        <router-link :to="getUserUrl(review)" style="text-decoration: none">
                                            {{ isLogin && review.user.username ? review.user.username : 'Unnamed' }}
                                        </router-link>
                                        <v-layout justify-end>
                                            <v-btn v-if="review._links.update" @click="setEditing(review)">Edit</v-btn>
                                            <v-btn v-if="review._links.delete" class="ml-4" @click="deleteReview(review)">Delete</v-btn>
                                        </v-layout>
                                    </v-card-title>
                                    <v-card-text>
                                        {{ review.reviewText }}
                                    </v-card-text>
                                    <v-card-subtitle>
                                        <v-layout>
                                            <v-rating
                                            v-if="review.rating > 0"
                                            :value="review.rating"
                                            dense
                                            readonly
                                            half-increments
                                            />
                                            <v-layout justify-end>{{ review.created_on }}</v-layout>
                                        </v-layout>
                                    </v-card-subtitle>
                                </v-card>
                        </v-card>
                    </v-col>
                </v-row>

            </v-content>
        </v-container>
    </v-app>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "RecipePage",
        props: ["recipeId"],
        data() {
            return {
                recipeLoading: false,
                recipeStepsLoading: false,
                recipe: null,
                steps: null,
                reviews: null,
                reviewEditing: null,
                ratingValue: null,
                reviewText: null,
                ownReview: null,
                errors: null,
                reviewsLoaded: false
            }
        },
        methods: {
            loadRecipe: function (rid) {
                this.recipeLoading = true;
                this.recipeStepsLoading = true;

                axios.get(this.$store.getters.getHostUrl + '/recipes/' + rid,
                    {auth: this.$store.getters.isLogin ? this.$store.getters.getAuth : null})
                .then(value => {
                    this.recipe = value.data;
                    if (this.recipe._links.reviews) {
                        this.loadReviews(this.recipe._links.reviews.href);
                    } else {
                        this.reviews = [];
                    }
                }).catch(reason => {
                    console.log(reason);
                }).finally(() => {
                    this.recipeLoading = false;
                });
                    

                axios.get(this.$store.getters.getHostUrl + '/recipes/' + rid + '/steps',
                    {auth: this.$store.getters.isLogin ? this.$store.getters.getAuth : null})
                .then(value => {
                    this.steps = value.data._embedded.recipeStepResourceList;
                }).catch(reason => {
                    console.log(reason);
                }).finally(() => {
                    this.recipeStepsLoading = false;
                });
                
                
            },

            loadReviews: function(reviewsLink) {
                axios.get(reviewsLink,
                    {auth: this.$store.getters.isLogin ? this.$store.getters.getAuth : null})
                .then(res => {
                    if (res.data._embedded) {
                        console.log('reviews are found')
                        console.log(res.data._embedded.reviewResourceList)
                        this.reviews = res.data._embedded.reviewResourceList;
                        if (this.$store.getters.isLogin) {
                            let updatedReviews = [];
                            this.reviews.forEach(review => {
                                axios.get(review._links.user.href, {auth: this.$store.getters.isLogin ? this.$store.getters.getAuth : null})
                                .then(res => {
                                    review.user = res.data;
                                    updatedReviews.push(review);
                                })
                                .catch(err => {
                                    console.error('err' + err); 
                                })
                                if (review._links.update) {
                                    this.ownReview = review;
                                }
                            });
                            this.reviews = updatedReviews;
                        }
                        this.reviewsLoaded = true;
                    } else {
                        this.reviews = null;
                        console.log('reviews not found')
                    }
                    console.log(this.reviews);
                })
                .catch(err => {
                    console.error(err); 
                })
            },

            getUserUrl: function(review) {
                return this.$store.getters.isLogin ? '/user/' + review.user.id : "#";
            },

            setEditing: function(review) {
                if (review) {
                    this.ratingValue = review.rating;
                    this.reviewText = review.reviewText;
                    this.reviewEditing = true;
                } else {
                    this.reviewEditing = false;
                } 
            },

            addReview: function() {
                this.errors = null;
                axios.post(this.recipe._links.add_review.href, {reviewText: this.reviewText, rating: this.ratingValue},
                    {auth: this.$store.getters.getAuth})
                .then(res => {
                    console.log(res);
                    this.loadRecipe(this.recipe.id);
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                    console.log(this.errors);
                })
            },

            updateReview: function(review) {
                this.errors = null;
                axios.put(review._links.update.href, {reviewText: this.reviewText, rating: this.ratingValue},
                    {auth: this.$store.getters.getAuth})
                .then(res => {
                    console.log(res);
                    this.loadRecipe(this.recipe.id);
                    this.setEditing(null);
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                    console.log(this.errors);
                })
            },

            deleteReview: function(review) {
                axios.delete(review._links.delete.href, {auth: this.$store.getters.getAuth})
                .then(res => {
                    console.log(res)
                    this.reviewText = null
                    this.ratingValue = null
                    this.loadRecipe(this.recipe.id)
                })
                .catch(err => {
                    console.error(err.response); 
                })
            },
            
            requestForApproval: function(rid) {
                this.recipeLoading = true;
                if (!this.$store.getters.isLogin) {
                    return;
                }

                axios.put(this.$store.getters.getHostUrl + '/recipes/' + rid + '/requestForApproval', {},{
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    value;
                    this.loadRecipe(rid);
                }).catch(reason => {
                    console.log(reason);
                }).finally(() => {
                    this.recipeLoading = false;
                });
            },
            removeRecipe: function(rid) {
                this.recipeLoading = true;
                if (!this.$store.getters.isLogin) {
                    return;
                }

                axios.delete(this.$store.getters.getHostUrl + '/recipes/' + rid, {
                    auth: this.$store.getters.getAuth
                }).then(value => {
                    value;
                    this.loadRecipe(rid);
                }).catch(reason => {
                    console.log(reason);
                }).finally(() => {
                    this.recipeLoading = false;
                });
            }
        },
        computed: {
            hostUrl: function() {
                return this.$store.getters.getHostUrl + "/";
            },
            isLogin: function() {
                return this.$store.getters.isLogin;
            }
        },
        mounted() {
            this.loadRecipe(this.recipeId);
        }
    }
</script>

<style scoped>

</style>