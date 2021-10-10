import * as helpers from '../helpers.js';

class recipeView {
  _parent = document.getElementById('ingredients');
  _modal = document.getElementById('detailsModal');
  _closeBtns = this._modal.querySelectorAll('.close');

  constructor() {
    // add event to close modal by clicking on window
    window.addEventListener('click', this.closeModalOnClickWindow.bind(this));

    // add event to close btns
    this._closeBtns.forEach(btn =>
      btn.addEventListener('click', this.closeRecipeModal.bind(this))
    );
  }

  renderRecipe(recipe) {
    const html = `
        <div class="recipe">
          <figure class="recipe__fig">
            <img src="${recipe.imageCover}" alt="${
      recipe.name
    }" class="recipe__img">
            <h1 class="recipe__title">
              <span>${recipe.name}</span>
            </h1>
          </figure>
          <div class="recipe__details">
            <div class="recipe__info">
              <i class="fas fa-male recipe__info-icon"></i>
              <span class="recipe__info-people">${recipe.cookingTime}</span>
              <span class="recipe__info-text"> min</span>
            </div>
            <div class="recipe-button">
              <button class="recipe__love data-bs-dismiss="modal" value=${
                recipe.id
              } style="margin: 5px auto">
                <i class="far fa-heart"></i>
              </button>
              <div class="addToFavorite-message"></div>
            </div>
          </div>
    
          <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map(el => this._createIngredientLi(el))
              .join('')} 
            </ul>
            <button class="btn-small recipe__cart" value=${
              recipe.id
            }  data-bs-dismiss="modal">
              <i class="fas fa-cart-plus"></i>
                <span>Add to Cart</span>
            </button>
            <div class="addToCart-message"></div>
           
           <div style="margin-bottom: 5px">OR</div>
            <button class="btn-small recipe__order" value=${
              recipe.id
            }  data-bs-dismiss="modal">
            <i class="fas fa-money-bill-wave"></i>
                <span>Order Now</span>
            </button>
            <div style="text-align: center;">
            <button class="add" >+</button>
            <input class="recipe__amount" type="number" value="1" min="1>" step="1" max="100" style="width: 25%; text-align: center">
            <button class="subtract" >-</button>
            </div>
            
          </div>
        </div>
    
      `;
    this._parent.innerHTML = html;
    // add handler to favorite and cart btns
    this.addHandlerToBtns();
    // add handler to amount input add and subtract
    this.incAmount();
    this.decAmount();

    this.addHandlerRecipeAmount();
    // add handlers to
  }

  _createIngredientLi = function (el) {
    return `
  <li class="recipe__item">
    <i class="fas fa-check recipe__icon"></i>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${el}</span>
        
    </div>
  </li>
  `;
  };

  showRecipeModal() {
    this._modal.classList.add('show');
  }

  closeRecipeModal() {
    this._modal.classList.remove('show');
  }

  closeModalOnClickWindow(e) {
    e.target == this._modal ? this.closeRecipeModal() : false;
  }

  addHandlerToBtns() {
    const btnLove = document.querySelector('.recipe__love');
    const btnCart = document.querySelector('.recipe__cart');
    btnLove.addEventListener('click', this.addToFavorite.bind(this));
    btnCart.addEventListener('click', this.addToCart.bind(this));
  }

  addToFavorite() {
    const addtoFavoriteMessage = document.querySelector(
      '.addToFavorite-message'
    );
    if (!helpers.IsUserLogged()) {
      return;
    }
    const _favorites = JSON.parse(localStorage.getItem('favorite')) || [];
    const btnLove = document.querySelector('.recipe__love');
    const recipeId = btnLove.value;
    const IsItInFavorites = recipeId => {
      let check = false;
      _favorites.forEach(id => {
        if (recipeId === id) check = true;
      });
      return check;
    };

    if (IsItInFavorites(recipeId)) {
      addtoFavoriteMessage.textContent = 'Already in Favorite';
      return;
    }
    _favorites.push(recipeId);
    localStorage.setItem('favorite', JSON.stringify(_favorites));
    addtoFavoriteMessage.textContent = 'Added to Favorite';
  }

  addToCart() {
    const addtoCartMessage = document.querySelector('.addToCart-message');
    if (!helpers.IsUserLogged()) {
      return;
    }
    const _cart = JSON.parse(localStorage.getItem('cart')) || [];
    const btnCart = document.querySelector('.recipe__cart');
    const recipeId = btnCart.value;
    const IsItInCart = recipeId => {
      let check = false;
      _cart.forEach(id => {
        if (recipeId === id) check = true;
      });
      return check;
    };
    if (IsItInCart(recipeId)) {
      addtoCartMessage.textContent = 'Already in Cart';
      return;
    }
    _cart.push(recipeId);
    localStorage.setItem('cart', JSON.stringify(_cart));
    addtoCartMessage.textContent = 'Added to Cart';
  }

  makeOrder() {
    const recipeOrderBtn = this._parent.querySelector('.recipe__order');
    const recipeAmount = this._parent.querySelector('.recipe__amount');
    const orderItems = [
      {
        recipeId: recipeOrderBtn.value,
        amount: recipeAmount.value,
      },
    ];
    localStorage.setItem('order', JSON.stringify(orderItems));
  }

  addHandlerOrderRecipe(handler) {
    if (!helpers.IsUserLogged()) {
      return;
    }
    const recipeOrderBtn = this._parent.querySelector('.recipe__order');
    recipeOrderBtn.addEventListener('click', () => {
      this.makeOrder();
      this.closeRecipeModal();
      handler();
    });
  }

  addHandlerRecipeAmount() {
    const amountInput = this._parent.querySelector(`.recipe__amount`);
    amountInput.addEventListener('input', this._handleAmountValue.bind(this));
  }

  _handleAmountValue() {
    const label = this._parent.querySelector(`.recipe__amount`);
    let value = Number(label.value);
    if (!value || value < 1) {
      label.value = '1';
    } else {
      label.value = Math.round(value);
    }
  }

  incAmount() {
    const amountInput = this._parent.querySelector(`.recipe__amount`);
    const add = this._parent.querySelector('.add');
    add.addEventListener('click', () => {
      amountInput.value = Number(amountInput.value) + 1;
      this._handleAmountValue();
    });
  }
  decAmount() {
    const amountInput = this._parent.querySelector(`.recipe__amount`);
    const subtract = this._parent.querySelector('.subtract');
    subtract.addEventListener('click', () => {
      amountInput.value = Number(amountInput.value) - 1;
      this._handleAmountValue();
    });
  }
  addHandlerNoUserLogged(handler) {
    const recipeOrderBtn = this._parent.querySelector('.recipe__order');
    const btnCart = document.querySelector('.recipe__cart');
    const btnLove = document.querySelector('.recipe__love');
    const btns = [recipeOrderBtn, btnCart, btnLove];
    btns.forEach(btn =>
      btn.addEventListener('click', () => {
        this.closeRecipeModal();
        handler();
      })
    );
  }
}

export default new recipeView();
