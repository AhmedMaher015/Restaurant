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
  categories: {
    target: '',
    list: [],
  },
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

export const loadRecipes = async function (limit = 9, page = 1) {
  try {
    const data = await helpers.getJson(
      `${config.API_URL_RECIPES}?limit=${limit}&page=${page}${
        state.categories.target && `&category=${state.categories.target}`
      }`,
      {
        headers: {},
        method: 'GET',
      }
    );
    state.recipes = [...data.data.data];
    state.popular = state.recipes.slice(0, 4);
    const results = data.results;
    const docsCount = data.docsCount;
    return results < limit ? 0 : docsCount;
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
    state.categories.list = [...data.data.data];
  } catch (err) {
    throw err;
  }
};

export const loadCarts = async function () {
  const carts = JSON.parse(localStorage.getItem('cart')) || [];
  if (carts.length === 0) return [];
  try {
    const recipes = await Promise.all([...carts.map(id => loadRecipe(id))]);
    state.cartlist = [...recipes];
    return state.cartlist;
  } catch (err) {
    throw err;
  }
};
export const loadFavorits = async function () {
  const favorites = JSON.parse(localStorage.getItem('favorite')) || [];
  if (favorites.length === 0) return [];
  try {
    const recipes = await Promise.all([...favorites.map(id => loadRecipe(id))]);
    state.favoriteList = [...recipes];
    return state.favoriteList;
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
  const token = JSON.parse(localStorage.getItem('user')).token;
  try {
    const data = await helpers.getJson(config.API_URL_ORDERS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    state.orderslist = [...data.data];
    return state.orderslist;
  } catch (err) {
    throw err;
  }
};

export const editProfile = async function (userData) {
  const token = JSON.parse(localStorage.getItem('user')).token;
  try {
    const data = await helpers.getJson(`${config.API_URL_USER}updateMe`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const user = data.user;
    state.profile = {
      name: user.name,
      email: user.email,
      photo: user.photo,
      role: user.role,
      token: token,
      id: user._id,
    };
    localStorage.setItem('user', JSON.stringify(state.profile));
  } catch (err) {
    throw err;
  }
};

export const changeProfilePassword = async function (userData) {
  const token = JSON.parse(localStorage.getItem('user')).token;
  try {
    const data = await helpers.getJson(
      `${config.API_URL_USER}updateMyPassword`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );

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

export const deleteEmail = async function () {
  const token = JSON.parse(localStorage.getItem('user')).token;
  try {
    const data = await helpers.getJson(`${config.API_URL_USER}deleteMe`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
  } catch (err) {
    throw err;
  }
};
