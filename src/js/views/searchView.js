class searchView {
  _parent = document.querySelector('.search .search__results');
  _searchBtn = document.querySelector('.search .search__btn');
  _searchField = document.querySelector('.search .search__field');
  constructor() {}

  renderSearchResults(results) {
    this._clearParent();
    results.forEach(recipe => this._createSearchRecipe(recipe));
  }
  _createSearchRecipe(recipe) {
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
  addHandler(handler) {
    this._searchField.addEventListener('keyup', e => {
      if (e.key === 'Enter') handler(e.target.value);
    });
    this._searchField.addEventListener('input', e => handler(e.target.value));
    this._searchBtn.addEventListener('click', () =>
      handler(this._searchField.value)
    );
  }
  _clearParent() {
    this._parent.innerHTML = '';
  }

  addHandlerToCardsSearch(handler) {
    const cards = document.querySelectorAll('.search .card');
    cards.forEach(card => card.addEventListener('click', e => handler(e)));
  }
}

export default new searchView();
