<template>
    <v-app>
        <v-container fluid>
            <v-content>
                <v-row>
                    <v-col
                            :cols=3
                    >
                        <v-expansion-panels accordion multiple>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Name
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-text-field counter=128 clearable v-model="searchName" placeholder="Search by name">
                                    </v-text-field>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Calories
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-range-slider
                                            :min="searchCaloriesMin"
                                            :max="searchCaloriesMax"
                                            thumb-label="always"
                                            thumb-size="30"
                                            v-model="searchCaloriesSliderRange"
                                    >
                                        <template v-slot:prepend>
                                            <v-text-field
                                                    placeholder="0"
                                                    v-model="searchCaloriesSliderRange[0]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="min"
                                                    :rules="[rules.caloriesMinValue, rules.caloriesMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                        <template v-slot:append>
                                            <v-text-field
                                                    placeholder="1000"
                                                    v-model="searchCaloriesSliderRange[1]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="max"
                                                    :rules="[rules.caloriesMinValue, rules.caloriesMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                    </v-range-slider>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Fats
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-range-slider
                                            :min="searchFatsMin"
                                            :max="searchFatsMax"
                                            thumb-label="always"
                                            thumb-size="30"
                                            v-model="searchFatsSliderRange"
                                    >
                                        <template v-slot:prepend>
                                            <v-text-field
                                                    placeholder="0"
                                                    v-model="searchFatsSliderRange[0]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="min"
                                                    :rules="[rules.fatsMinValue, rules.fatsMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                        <template v-slot:append>
                                            <v-text-field
                                                    placeholder="100"
                                                    v-model="searchFatsSliderRange[1]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="max"
                                                    :rules="[rules.fatsMinValue, rules.fatsMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                    </v-range-slider>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Proteins
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-range-slider
                                            :min="searchProteinsMin"
                                            :max="searchProteinsMax"
                                            thumb-label="always"
                                            thumb-size="30"
                                            v-model="searchProteinsSliderRange"
                                    >
                                        <template v-slot:prepend>
                                            <v-text-field
                                                    placeholder="0"
                                                    v-model="searchProteinsSliderRange[0]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="min"
                                                    :rules="[rules.proteinsMinValue, rules.proteinsMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                        <template v-slot:append>
                                            <v-text-field
                                                    placeholder="100"
                                                    v-model="searchProteinsSliderRange[1]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="max"
                                                    :rules="[rules.proteinsMinValue, rules.proteinsMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                    </v-range-slider>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Carbohydrates
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-range-slider
                                            :min="searchCarbohydratesMin"
                                            :max="searchCarbohydratesMax"
                                            thumb-label="always"
                                            thumb-size="30"
                                            v-model="searchCarbohydratesSliderRange"
                                    >
                                        <template v-slot:prepend>
                                            <v-text-field
                                                    placeholder="0"
                                                    v-model="searchCarbohydratesSliderRange[0]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="min"
                                                    :rules="[rules.carbohydratesMinValue, rules.carbohydratesMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                        <template v-slot:append>
                                            <v-text-field
                                                    placeholder="100"
                                                    v-model="searchCarbohydratesSliderRange[1]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="max"
                                                    :rules="[rules.carbohydratesMinValue, rules.carbohydratesMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                    </v-range-slider>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Price
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-range-slider
                                            :min="searchPriceMin"
                                            :max="searchPriceMax"
                                            thumb-label="always"
                                            thumb-size="30"
                                            v-model="searchPriceSliderRange"
                                    >
                                        <template v-slot:prepend>
                                            <v-text-field
                                                    placeholder="0"
                                                    v-model="searchPriceSliderRange[0]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="min"
                                                    :rules="[rules.priceMinValue, rules.priceMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                        <template v-slot:append>
                                            <v-text-field
                                                    placeholder="1000"
                                                    v-model="searchPriceSliderRange[1]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="max"
                                                    :rules="[rules.priceMinValue, rules.priceMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                    </v-range-slider>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Rating
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-range-slider
                                            :min="searchRatingMin"
                                            :max="searchRatingMax"
                                            thumb-label="always"
                                            thumb-size="30"
                                            v-model="searchRatingSliderRange"
                                            step=0.1
                                    >
                                        <template v-slot:prepend>
                                            <v-text-field
                                                    placeholder="0"
                                                    v-model="searchRatingSliderRange[0]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    step="0.1"
                                                    label="min"
                                                    :rules="[rules.ratingMinValue, rules.ratingMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                        <template v-slot:append>
                                            <v-text-field
                                                    placeholder="1000"
                                                    v-model="searchRatingSliderRange[1]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    step="0.1"
                                                    label="max"
                                                    :rules="[rules.ratingMinValue, rules.ratingMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                    </v-range-slider>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Cooking time
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-range-slider
                                            :min="searchCookingTimeMin"
                                            :max="searchCookingTimeMax"
                                            thumb-label="always"
                                            thumb-size="30"
                                            v-model="searchCookingTimeSliderRange"
                                    >
                                        <template v-slot:prepend>
                                            <v-text-field
                                                    placeholder="0"
                                                    v-model="searchCookingTimeSliderRange[0]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="min"
                                                    :rules="[rules.cookingTimeMinValue, rules.cookingTimeMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                        <template v-slot:append>
                                            <v-text-field
                                                    placeholder="1440"
                                                    v-model="searchCookingTimeSliderRange[1]"
                                                    class="mt-0 pt-0"
                                                    type="number"
                                                    label="max"
                                                    :rules="[rules.cookingTimeMinValue, rules.cookingTimeMaxValue]"
                                                    style="width: 50px"
                                            >
                                            </v-text-field>
                                        </template>
                                    </v-range-slider>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Cooking methods
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-select
                                            v-model="searchSelectedCookingMethods"
                                            :items="searchAvailableCookingMethods"
                                            multiple
                                            hint="Select cooking methodss"
                                            persistent-hint
                                    />
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Cuisines
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-select
                                            v-model="searchSelectedCuisines"
                                            :items="searchAvailableCuisines"
                                            multiple
                                            hint="Select cuisines"
                                            persistent-hint
                                    />
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Tags
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-combobox
                                            v-model="searchIncludeTags"
                                            :loading="includeTagsLoading"
                                            :items="includeTagsItems"
                                            :search-input.sync="includeTagsSync"
                                            cache-items
                                            hint="Input tags to include"
                                            persistent-hint
                                            multiple
                                            chips
                                            hide-selected
                                            clearable
                                            deletable-chips
                                    />

                  <v-combobox
                    v-model="searchExcludeTags"
                    :loading="excludeTagsLoading"
                    :items="excludeTagsItems"
                    :search-input.sync="excludeTagsSync"
                    cache-items
                    hint="Input tags to exclude"
                    persistent-hint
                    multiple
                    chips
                    hide-selected
                    clearable
                    deletable-chips
                  ></v-combobox>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>Ingredients</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-combobox
                    v-model="searchIncludeIngredients"
                    :loading="includeIngredientsLoading"
                    :items="includeIngredientsItems"
                    :search-input.sync="includeIngredientsSync"
                    item-text="name"
                    item-value="id"
                    cache-items
                    hint="Input ingredients to include"
                    persistent-hint
                    multiple
                    chips
                    hide-selected
                    clearable
                    deletable-chips
                  ></v-combobox>
                  <v-combobox
                    v-model="searchExcludeIngredients"
                    :loading="excludeIngredientsLoading"
                    :items="excludeIngredientsItems"
                    :search-input.sync="excludeIngredientsSync"
                    cache-items
                    item-text="name"
                    item-value="id"
                    hint="Input ingredients to exclude"
                    persistent-hint
                    multiple
                    chips
                    hide-selected
                    clearable
                    deletable-chips
                  ></v-combobox>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-btn
              block
              :loading="searchLoading"
              color="primary"
              style="margin-top: 10px"
              :disabled="searchLoading"
              @click="performSearch()"
            >Search</v-btn>
          </v-col>
          <v-col cols="6" offset="1">
            <v-card v-for="recipe in recipes" v-bind:key="recipe.id" style="margin-bottom: 10px">
                <v-img
                        v-if="recipe.pictureId"
                        :src="recipe._links.picture.href"
                />
              <v-card-title style="cursor: pointer" @click="goToRecipe(recipe.id)">{{recipe.name}}</v-card-title>
              <v-card-subtitle>
                <v-rating
                  v-if="recipe.rating > 0"
                  :value="recipe.rating"
                  dense
                  readonly
                  half-increments
                />
              </v-card-subtitle>
              <v-card-text>
                <v-icon>mdi-cash</v-icon>

                {{recipe.price}}
                <v-icon>mdi-account</v-icon>
                User ID: {{recipe.owner}}
              </v-card-text>
              <v-card-actions>
                <v-btn text @click="goToRecipe(recipe.id)">Show</v-btn>
              </v-card-actions>
            </v-card>
            <v-pagination
              v-if="pageInfo != null"
              v-model="currentPage"
              :length="pageInfo.totalPages"
              @input="searchRecipes(currentPage)"
              :loading="searchLoading"
              :disabled="searchLoading"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
const querystring = require("querystring");

export default {
  data() {
    return {
      searchName: "",
      searchCaloriesMin: 0,
      searchCaloriesMax: 1000,
      searchCaloriesSliderRange: [0, 1000],
      searchFatsMin: 0,
      searchFatsMax: 100,
      searchFatsSliderRange: [0, 100],
      searchProteinsMin: 0,
      searchProteinsMax: 100,
      searchProteinsSliderRange: [0, 100],
      searchCarbohydratesMin: 0,
      searchCarbohydratesMax: 100,
      searchCarbohydratesSliderRange: [0, 100],
      searchPriceMin: 0,
      searchPriceMax: 1000,
      searchPriceSliderRange: [0, 1000],
      searchRatingMin: 0,
      searchRatingMax: 5,
      searchRatingSliderRange: [0, 5],
      searchCookingTimeMin: 0,
      searchCookingTimeMax: 1440,
      searchCookingTimeSliderRange: [0, 1440],
      searchAvailableCookingMethods: [],
      searchSelectedCookingMethods: [],
      searchAvailableCuisines: [],
      searchSelectedCuisines: [],
      searchIncludeTags: [],
      includeTagsLoading: false,
      includeTagsItems: [],
      includeTagsSync: null,
      searchExcludeTags: [],
      excludeTagsLoading: false,
      excludeTagsItems: [],
      excludeTagsSync: null,
      searchIncludeIngredients: [],
      includeIngredientsLoading: false,
      includeIngredientsItems: [],
      includeIngredientsSync: null,
      searchExcludeIngredients: [],
      excludeIngredientsLoading: false,
      excludeIngredientsItems: [],
      excludeIngredientsSync: null,
      searchLoading: null,
      rules: {
        caloriesMinValue: value => value >= 0 || ">=0",
        caloriesMaxValue: value => value <= 1000 || "=<1000",
        fatsMinValue: value => value >= 0 || ">=0",
        fatsMaxValue: value => value <= 100 || "<=100",
        proteinsMinValue: value => value >= 0 || ">=0",
        proteinsMaxValue: value => value <= 100 || "<=100",
        carbohydratesMinValue: value => value >= 0 || ">=0",
        carbohydratesMaxValue: value => value <= 100 || "<=100",
        priceMinValue: value => value >= 0 || ">=0",
        priceMaxValue: value => value <= 1000 || "<=100",
        ratingMinValue: value => value >= 0 || ">=0",
        ratingMaxValue: value => value <= 5 || "<=5",
        cookingTimeMinValue: value => value >= 0 || ">=0",
        cookingTimeMaxValue: value => value <= 1440 || "<=1440"
      },
      criteria: null,
      recipes: [],
      pageInfo: null,
      currentPage: 1
    };
  },
  methods: {
    setAvailableCookingMethods: function() {
      axios
        .get(this.$store.getters.getHostUrl + "/recipes/cookingMethods")
        .then(value => {
          this.searchAvailableCookingMethods = value.data._embedded.stringList;
        })
        .catch(reason => {
          console.log(reason);
        });
    },
    setAvailableCuisines: function() {
      axios
        .get(this.$store.getters.getHostUrl + "/recipes/cuisines")
        .then(value => {
          this.searchAvailableCuisines = value.data._embedded.stringList;
        })
        .catch(reason => {
          console.log(reason);
        });
    },
    searchTags: function(name, dest) {
      this.includeTagsLoading = true;

      axios
        .get(this.$store.getters.getHostUrl + "/tags?name=" + name)
        .then(value => {
          if (dest === "inc") {
            this.includeTagsItems = value.data._embedded.tagResourceList.map(
              e => e.name
            );
          } else {
            this.excludeTagsItems = value.data._embedded.tagResourceList.map(
              e => e.name
            );
          }
        })
        .catch(reason => {
          console.log(reason);
        })
        .finally(() => {
          this.includeTagsLoading = false;
        });
    },
    searchIngredients: function(name, dest) {
      this.includeIngredientsLoading = true;

      console.log(this.$store.getters.isLogin);

      axios
        .get(this.$store.getters.getHostUrl + "/ingredients?name=" + name)
        .then(value => {
          if (dest === "inc") {
            this.includeIngredientsItems =
              value.data._embedded.ingredientResourceList;
          } else {
            this.excludeIngredientsItems =
              value.data._embedded.ingredientResourceList;
          }
        })
        .catch(reason => {
          console.log(reason);
        })
        .finally(() => {
          this.includeIngredientsLoading = false;
        });
    },
    fillCriteria: function() {
      let criteria = {
        caloriesMin: this.searchCaloriesSliderRange[0],
        caloriesMax: this.searchCaloriesSliderRange[1],
        fatsMin: this.searchFatsSliderRange[0],
        fatsMax: this.searchFatsSliderRange[1],
        carbohydratesMin: this.searchCarbohydratesSliderRange[0],
        carbohydratesMax: this.searchCarbohydratesSliderRange[1],
        proteinsMin: this.searchProteinsSliderRange[0],
        proteinsMax: this.searchProteinsSliderRange[1],
        ratingMin: this.searchRatingSliderRange[0],
        ratingMax: this.searchRatingSliderRange[1],
        cookingMethods:
          this.searchSelectedCookingMethods.size === 0
            ? null
            : this.searchSelectedCookingMethods,
        cookingTimeMin: this.searchCookingTimeSliderRange[0],
        cookingTimeMax: this.searchCookingTimeSliderRange[1],
        priceMin: this.searchPriceSliderRange[0],
        priceMax: this.searchPriceSliderRange[1],
        includeTags:
          this.searchIncludeTags.size === 0 ? null : this.searchIncludeTags,
        excludeTags:
          this.searchExcludeTags.size === 0 ? null : this.searchExcludeTags,
        includeIngredients:
          this.searchIncludeIngredients.size === 0
            ? null
            : this.searchIncludeIngredients.map(e => e.id),
        excludeIngredients:
          this.searchExcludeIngredients.size === 0
            ? null
            : this.searchExcludeIngredients.map(e => e.id),
        cuisines:
          this.searchSelectedCuisines.size === 0
            ? null
            : this.searchSelectedCuisines
      };

      if (this.searchName.length > 0) {
        criteria.name = this.searchName;
      }

      this.criteria = criteria;
    },
    searchRecipes: function(page) {
      this.searchLoading = true;

      let query = querystring.stringify(this.criteria);

      if (page) {
        query += "&page=" + (page - 1);
      }

      query += "&size=3";
      console.log(query);

      axios
        .get(this.$store.getters.getHostUrl + "/recipes/search?" + query)
        .then(value => {
          this.recipes = value.data._embedded.recipeResourceList;
          this.pageInfo = value.data.page;
          this.currentPage = this.pageInfo.number + 1;
          console.log(value.data);
        })
        .catch(reason => {
          console.log(reason);
        })
        .finally(() => {
          this.searchLoading = false;
        });
    },
    performSearch: function() {
      this.fillCriteria();
      this.searchRecipes();
    },
    goToRecipe: function(rid) {
      this.$router.push({ path: "/recipe/" + rid });
    }
  },
  watch: {
    includeTagsSync(val) {
      val && val !== this.searchIncludeTags && this.searchTags(val, "inc");
    },
    excludeTagsSync(val) {
      val && val !== this.searchExcludeTags && this.searchTags(val, "excl");
    },
    includeIngredientsSync(val) {
      val &&
        val !== this.searchIncludeIngredients &&
        this.searchIngredients(val, "inc");
    },
    excludeIngredientsSync(val) {
      val &&
        val !== this.searchExcludeIngredients &&
        this.searchIngredients(val, "excl");
    }
  },
  computed: {},
  mounted() {
    this.setAvailableCookingMethods();
    this.setAvailableCuisines();
    this.performSearch();
  }
};
</script>