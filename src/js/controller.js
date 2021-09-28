import 'regenerator-runtime/runtime';
import 'core-js/stable';
import {
  loadRecipes,
  loadRecipe,
  loadCategories,
  loadSearchResults,
  loadProfile,
  loadOrders,
  editProfile,
  state,
  changeProfilePassword,
} from './model.js';
import * as config from './config.js';
import * as helpers from './helpers.js';
import recipeView from './views/recipeView.js';
import categoriesView from './views/categoriesView.js';
import recipesView from './views/recipesView.js';
import searchView from './views/searchView.js';
import loginView from './views/loginView.js';
import signupView from './views/signupView.js';
import toggleFormsView from './views/toggleFormsView.js';
import loggedView from './views/loggedView.js';
import cartView from './views/cartView.js';
import favoriteView from './views/favoriteView.js';
import profileView from './views/profileView.js';
import { async } from 'regenerator-runtime/runtime';

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

const controlLogin = async function (userInfo) {
  try {
    const res = await fetch(config.API_URL_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    // store on state
    loadProfile(data);

    location.reload();
  } catch (err) {
    loginView.showError(err.message);
  }
};

const controlSignup = async function (userInfo) {
  try {
    const res = await fetch(config.API_URL_SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    const data = await res.json();
    if (data.status === 'fail') throw new Error(data.message);
    // store on state
    loadProfile(data);

    location.reload();
  } catch (err) {
    console.log(err.message);
    signupView.showError(err.message);
  }
};

const controlCarts = async function () {
  // get carts Ids
  const cartIds = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cartIds && cartIds.length === 0) return;

  // clear carts
  cartView.clear();

  // render carts
  cartIds.forEach(async id => {
    const recipe = await loadRecipe(id);
    cartView.renderCart(recipe);
  });
};

const controlFavorites = async function () {
  // get carts Ids
  const favoriteIds = JSON.parse(localStorage.getItem('favorite')) || [];

  if (!favoriteIds && favoriteIds.length === 0) return;

  // clear carts
  favoriteView.clear();

  // render carts
  favoriteIds.forEach(async id => {
    const recipe = await loadRecipe(id);
    favoriteView.renderFavorite(recipe);
  });
};

const controlProfile = function () {
  // render profile
  profileView.renderProfile();

  try {
    // edit profile
    profileView.addHandlerEditProfile(editProfile);
    // change password
    profileView.addHandlerChangePassword(changeProfilePassword);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  // add handler to login
  loginView.addHandler(controlLogin);
  // add handler to signup
  signupView.addHandler(controlSignup);
  // add handler to switch between login and signup
  toggleFormsView.addHandler();
  // add handler to search
  searchView.addHandler(controlSearch);
  // add handler to cart icon
  cartView.addHandler(controlCarts);
  // add handler to favorite icon
  favoriteView.addHandler(controlFavorites);
  // add handler to profile icon
  profileView.addHandler(controlProfile);
};

// check if user logged
loggedView.userLoggedActions();

// load recipes
controlRecipes();

// add handlers
init();
