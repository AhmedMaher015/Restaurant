class recipesView {
  _parent = document.querySelector('.recipes-container');
  _parentPopular = document.querySelector('.popular');
  constructor() {
    this.createSpinner();
  }

  renderRecipes(recipes) {
    this._clearRecipes();
    // loop in recipes
    recipes.forEach(recipe => this._createRecipe(recipe));
  }

  renderPopular(recipes) {
    this._clearPopular();
    // loop in recipes
    recipes.forEach(recipe => this._createPopular(recipe));
  }

  _createRecipe(recipe) {
    const html = `
      <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="card" id=${recipe._id}>
          <div class="card-body">
            <div class="row recipe">
              <div class="col-8">
                <div class="recipe-content">
                  <h4 class="recipe-title recipe-name">${recipe.name}</h4>
                  <p class="recipe-text">
                    ${recipe.category}
                  </p>
                  <p class="recipe-price">${recipe.price}$</p>
                </div>
              </div>
              <div class="col-4 recipe-img">
                <img
                  src=${recipe.imageCover}
                  alt="${recipe.name} image"
                  class="recipe-asset"
                />
              </div>
            </div>
          </div>
        </div>
    </div>
      `;
    this._parent.insertAdjacentHTML('afterbegin', html);
  }

  _createPopular(recipe) {
    const html = `
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card"  id=${recipe._id}>
        <img
          src=${recipe.imageCover}
          alt="pizza image"
          class="card-img-top"
        />
        <div class="card-body">
          <div class="food-info">
            <h4 class="card-title recipe-name">${recipe.name}</h4>
            <p class="card-text price">${recipe.price}$</p>
          </div>
        </div>
      </div>
    </div>

      `;
    this._parentPopular.insertAdjacentHTML('afterbegin', html);
  }

  createSpinner() {
    const loader = `
          <div class="spinner"></div>
          `;
    this._parent.insertAdjacentHTML('afterbegin', loader);
    this._parentPopular.insertAdjacentHTML('afterbegin', loader);
  }

  _clearRecipes() {
    this._parent.innerHTML = '';
  }

  _clearPopular() {
    this._parentPopular.innerHTML = '';
  }
  addHandler(handler) {
    const recipeCards = document.querySelectorAll('.card');
    recipeCards.forEach(card => card.addEventListener('click', handler));
  }
}

export default new recipesView();
