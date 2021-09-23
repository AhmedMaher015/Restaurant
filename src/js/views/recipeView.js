class recipeView {
  _parent = document.getElementById('ingredients');
  _modal = document.getElementById('detailsModal');
  _closeBtns = this._modal.querySelectorAll('.close');
  _favorites = JSON.parse(localStorage.getItem('favorite')) || [];
  _cart = JSON.parse(localStorage.getItem('cart')) || [];
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
    const btnLove = document.querySelector('.recipe__love');
    const recipeId = btnLove.value;
    const IsItInFavorites = recipeId => {
      let check = false;
      this._favorites.forEach(id => {
        if (recipeId === id) check = true;
      });
      return check;
    };

    if (IsItInFavorites(recipeId)) return;
    this._favorites.push(recipeId);
    localStorage.setItem('favorite', JSON.stringify(this._favorites));
    console.log('added to favorite');
  }

  addToCart() {
    const btnCart = document.querySelector('.recipe__cart');
    const recipeId = btnCart.value;
    const IsItInCart = recipeId => {
      let check = false;
      this._cart.forEach(id => {
        if (recipeId === id) check = true;
      });
      return check;
    };
    if (IsItInCart(recipeId)) return;
    this._cart.push(recipeId);
    localStorage.setItem('cart', JSON.stringify(this._cart));
    console.log('added to cart');
  }
}

export default new recipeView();
