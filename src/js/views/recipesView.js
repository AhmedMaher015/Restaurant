class recipesView {
  _parent = document.querySelector('.recipes-container');
  _parentPopular = document.querySelector('.popular');
  _parentPagination = document.querySelector('.pages');
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

  renderPagination(currentPage, restRecipes) {
    this._parentPagination.innerHTML = '';
    const prev = `<button class="pages__btn--prev" value="0"><<</button>`;
    const next = ` <button class="pages__btn--next" value="0">>></button>`;
    currentPage = Number(currentPage);
    // no rest recipes
    if (currentPage === 1 && restRecipes === 0) {
      return;
    }
    if (currentPage === 1 && restRecipes > 0) {
      const next = ` <button class="pages__btn--next" value=${++currentPage}>>> ${currentPage}</button>`;
      this._parentPagination.insertAdjacentHTML('afterbegin', next);
      return;
    }

    if (currentPage > 1 && restRecipes === 0) {
      const prev = `<button class="pages__btn--prev" value=${--currentPage}><< ${currentPage}</button>`;
      this._parentPagination.insertAdjacentHTML('afterbegin', prev);
      return;
    }

    if (currentPage > 1 && restRecipes > 0) {
      let nextValue = currentPage + 1,
        prevValue = currentPage - 1;
      const next = ` <button class="pages__btn--next" value=${nextValue}>>> ${nextValue}</button>`;
      const prev = `<button class="pages__btn--prev" value=${prevValue}><< ${prevValue}</button>`;
      this._parentPagination.insertAdjacentHTML('afterbegin', prev);
      this._parentPagination.insertAdjacentHTML('afterbegin', next);
      return;
    }
  }

  addHandlerPagination(handler) {
    const btns = document.querySelectorAll('.pages button');
    if (btns == null) return;
    btns.forEach(btn =>
      btn.addEventListener('click', e => {
        handler(e.target.value);
      })
    );
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
