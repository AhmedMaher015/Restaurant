import '../../node_modules/regenerator-runtime/runtime';
import '../../node_modules/core-js/stable';
import {
  loadRecipes,
  loadRecipe,
  loadCategories,
  loadSearchResults,
  loadProfile,
  loadOrders,
  loadCarts,
  loadFavorits,
  state,
  editProfile,
  changeProfilePassword,
  deleteEmail,
} from './model.js';
import * as config from './config.js';
import * as helpers from './helpers.js';
import recipeView from './views/recipeView.js';
import categoriesView from './views/categoriesView.js';
import paginationView from './views/paginationView';
import recipesView from './views/recipesView.js';
import searchView from './views/searchView.js';
import loginView from './views/loginView.js';
import signupView from './views/signupView.js';
import toggleFormsView from './views/toggleFormsView.js';
import loggedView from './views/loggedView.js';
import cartView from './views/cartView.js';
import favoriteView from './views/favoriteView.js';
import profileView from './views/profileView.js';
import orderView from './views/orderView.js';
import orderResultView from './views/orderResultView.js';
import ordersView from './views/ordersView.js';
import orderCancelView from './views/orderCancelView.js';
// import { async } from 'regenerator-runtime/runtime';

const LIMIT = 6;
const controlRecipes = async function () {
  // load all recipes
  const docsCount = await loadRecipes(LIMIT);
  // render all recipes
  recipesView.renderRecipes(state.recipes);

  // render popular recipes
  recipesView.renderPopular(state.popular);

  // add event to recipes
  recipesView.addHandler(controlRecipe);

  // load categories
  await loadCategories();

  // render Categories
  categoriesView.renderCategorys(state.categories.list);

  // add Handler to categories btns
  categoriesView.addHandler(controlCategories);

  // render pagination
  paginationView.renderPagination(LIMIT, docsCount);

  // add event to pagination btns
  paginationView.addHandlerPagination(controlPagination);
};

const controlCategories = async function (categoryName) {
  state.categories.target = categoryName;
  const docsCount = await loadRecipes(LIMIT);
  // render all category list
  recipesView.renderRecipes(state.recipes);

  // add event to recipes
  recipesView.addHandler(controlRecipe);

  // render pagination
  paginationView.renderPagination(LIMIT, docsCount);

  // add event to pagination btns
  paginationView.addHandlerPagination(controlPagination);
};
const controlPagination = async function (page) {
  // load all recipes
  const docsCount = await loadRecipes(LIMIT, page);
  // render all recipes
  recipesView.renderRecipes(state.recipes);
  // add event to recipes
  recipesView.addHandler(controlRecipe);
  // render pagination
  paginationView.renderPagination(LIMIT, docsCount);
  // add event to pagination btns
  paginationView.addHandlerPagination(controlPagination);
};

const controlRecipe = async function (e) {
  const id = e.target.closest('.card').id;
  // get recipe
  await loadRecipe(id);

  // render recipe
  recipeView.renderRecipe(state.recipe);

  // show modal
  recipeView.showRecipeModal();

  if (!helpers.IsUserLogged()) {
    recipeView.addHandlerNoUserLogged(signupView.showModal);
    return;
  }
  // add handler order recipe
  recipeView.addHandlerOrderRecipe(orderView.showModal);
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
    // if (!res.ok) throw new Error('Please , Try after some minutes');
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
  loadCarts().then(carts => cartView.renderCarts(carts));
};

const controlFavorites = async function () {
  // render favorites
  loadFavorits().then(favorites => favoriteView.renderFavorite(favorites));
};

const controlProfile = function () {
  // render profile
  profileView.renderProfile();
  profileView.addHandlerDeleteEmail(controlDeleteEmail);
  try {
    // edit profile
    profileView.addHandlerEditProfile(editProfile);
  } catch (err) {
    console.error(err);
    profileView.renderEditProfileError(err.message);
  }
  try {
    // change password
    profileView.addHandlerChangePassword(changeProfilePassword);
  } catch (err) {
    console.error(err);
    profileView.renderChangePasswordError(err.message);
  }
};

const controlDeleteEmail = () => {
  deleteEmail();
  loggedView.userSignout();
};

const showOrderModal = function () {
  // store carts on local storage
  cartView.storeOrders();
  // show order modal
  orderView.showModal();
};

const controlOrder = async function (orderInfo) {
  const profile = JSON.parse(localStorage.getItem('user'));
  try {
    const data = await helpers.getJson(config.API_URL_ORDERS, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${profile.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderInfo),
    });
    // close order
    orderView.closeModal();

    // reset cart
    cartView.resetCart();

    // show order result
    orderResultView.showModal();
    // render order result
    orderResultView.renderResultOrder(data.data);
  } catch (err) {
    console.error(err);
    orderView.renderError(err.message);
  }
};

const makeSpecialOrder = function () {
  // show order modal
  orderView.showModal();
};

const controlOrders = async function () {
  // get orders
  const orders = await loadOrders();

  // render orders
  ordersView.renderOrders(orders);

  // add handlers to cancel order
  ordersView.addHandlerRemove(controlOrderCancel);
};

const controlOrderCancel = async function (orderId) {
  const token = JSON.parse(localStorage.getItem('user')).token;
  // show order cancel modal
  orderCancelView.showModal();
  try {
    const data = await helpers.getJson(
      `https://panda-restaurant.herokuapp.com/api/v1/orders/cancelOrder/${orderId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    orderCancelView.renderSuccess();
  } catch (err) {
    orderCancelView.renderError(err.message);
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
  // add handler to order now btn
  cartView.addHandlerOrderNow(showOrderModal);
  // add handler to favorite icon
  favoriteView.addHandler(controlFavorites);
  // add handler to profile icon
  profileView.addHandler(controlProfile);
  // add handler to order btn
  orderView.addHandler(controlOrder);
  // add handler to orders btn click
  ordersView.addHandler(controlOrders);
};

// check if user logged
loggedView.userLoggedActions();

// load recipes
controlRecipes();

// add handlers
init();

// (async () => {
//   const carts = await loadCarts();
//   console.log(carts);
// })();
// // console.log(loadCarts());
// loadCarts().then(recipes => console.log(recipes));
