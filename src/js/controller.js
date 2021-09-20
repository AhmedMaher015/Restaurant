import 'regenerator-runtime/runtime';
import 'core-js/stable';
import {
  loadRecipes,
  loadRecipe,
  loadCategories,
  loadSearchResults,
  loadProfileLogin,
  loadProfileSignup,
  loadOrders,
  state,
} from './model.js';

import recipeView from './views/recipeView.js';
import categoriesView from './views/categoriesView.js';
import recipesView from './views/recipesView.js';
import searchView from './views/searchView.js';

const controlRecipes = async function () {
  // load all recipes
  await loadRecipes();

  // render all recipes
  recipesView.renderRecipes(state.recipes);

  // render popular recipes
  recipesView.renderPopular(state.popular);

  // add event to recipes
  recipesView.addHandler(controlRecipe);

  // load categories
  await loadCategories();

  // render Categories
  categoriesView.renderCategorys(state.categories);
};

controlRecipes();

const controlRecipe = async function (e) {
  const id = e.target.closest('.card').id;
  // get recipe
  await loadRecipe(id);

  // render recipe
  recipeView.renderRecipe(state.recipe);

  // show modal
  recipeView.showRecipeModal();
};

const controlSearch = function (searchWord) {
  if (!searchWord) return;

  // load search results
  loadSearchResults(searchWord);

  // render search results
  searchView.renderSearchResults(state.search.results);

  searchView.addHandlerToCardsSearch(controlRecipe);
};

const init = function () {
  searchView.addHandler(controlSearch);
};
init();
