import * as helpers from './helpers.js';
import * as config from './config.js';
import { async } from 'regenerator-runtime';

export const state = {
  recipe: {
    id: '',
    name: '',
    category: '',
    cookingTime: '',
    price: '',
    ingredients: '',
  },
  categories: [],
  recipes: [],
  popular: [],
  favoriteList: [],
  cartlist: [],
  orderslist: [],
  search: {
    target: '',
    results: [],
  },
  profile: {
    name: '',
    email: '',
    photo: '',
    token: '',
  },
};

export const loadRecipes = async function () {
  try {
    const data = await helpers.getJson(config.API_URL_RECIPES, {
      headers: {},
      method: 'GET',
    });
    state.recipes = [...data.data.data];
    state.popular = state.recipes.slice(0, 4);
  } catch (err) {
    throw err;
  }

  //   console.log(state);
};

export const loadRecipe = async function (id) {
  try {
    const data = await helpers.getJson(`${config.API_URL_RECIPES}?_id=${id}`, {
      headers: {},
      method: 'GET',
    });
    const [recipe] = data.data.data;
    state.recipe = {
      id: recipe._id,
      name: recipe.name,
      category: recipe.category,
      cookingTime: recipe.cookingTime,
      price: recipe.price,
      imageCover: recipe.imageCover,
      ingredients: recipe.ingredients,
    };
    return state.recipe;
    // console.log(state.recipe);
  } catch (err) {
    throw err;
  }

  //   console.log(state);
};

export const loadCategories = async function () {
  try {
    const data = await helpers.getJson(config.API_URL_CATEGORIES, {
      headers: {},
      method: 'GET',
    });
    state.categories = [...data.data.data];
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (recipeName) {
  try {
    const data = await helpers.getJson(
      `${config.API_URL_SEARCH}${recipeName}`,
      {
        headers: {},
        method: 'GET',
      }
    );
    state.search = {
      target: recipeName,
      results: [...data.data.data],
    };
  } catch (err) {
    throw err;
  }

  //   console.log(state);
};

export const loadProfile = function (data) {
  try {
    const user = data.data.user;
    state.profile = {
      name: user.name,
      email: user.email,
      photo: user.photo,
      role: user.role,
      token: data.token,
      id: user._id,
    };
    localStorage.setItem('user', JSON.stringify(state.profile));
  } catch (err) {
    throw err;
  }
};

export const loadOrders = async function () {
  try {
    const data = await helpers.getJson(config.API_URL_ORDERS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${state.profile.token}`,
        'Content-Type': 'application/json',
      },
    });
    state.orderslist = [...data.data];
  } catch (err) {
    throw err;
  }
};

export const editProfile = async function (userData) {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    const data = await helpers.getJson(`${config.API_URL_USER}updateMe`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    state.profile = {
      name: data.user.name,
      email: data.user.email,
      photo: data.user.photo,
      role: data.user.role,
      token: user.token,
      id: data.user._id,
    };
    localStorage.setItem('user', JSON.stringify(state.profile));
  } catch (err) {
    throw err;
  }
};

export const changeProfilePassword = async function (userData) {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    const data = await helpers.getJson(
      `${config.API_URL_USER}updateMyPassword`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );
    loadProfile(data);
  } catch (err) {
    throw err;
  }
};
