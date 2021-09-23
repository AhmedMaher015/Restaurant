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
    // console.log(state.recipe);
  } catch (err) {
    throw err;
  }

  //   console.log(state);
};

export const loadCategories = async function () {
  try {
    const data = await helpers.getJson(config.API_URL_CATEGORIES, {
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

export const loadProfile = async function (data) {
  const user = data.data.user;
  state.profile = {
    name: user.name,
    email: user.email,
    photo: user.photo,
    role: user.role,
    token: data.token,
  };
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

// export const loadCarts = async function (recipesIds) {
//   arr.forEach(recipeId => {
//     try {
//       const data = await helpers.getJson(
//         `${config.API_URL_RECIPES}?_id=${id}`,
//         {
//           method: 'GET',
//         }
//       )
//       const [recipe] = data.data.data;
//       state.cartlist.push({
//         id: recipe._id,
//         name: recipe.name,
//         category: recipe.category,
//         cookingTime: recipe.cookingTime,
//         price: recipe.price,
//         imageCover: recipe.imageCover,
//         ingredients: recipe.ingredients,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   });
// };
