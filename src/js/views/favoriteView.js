class favoriteView {
  _modal = document.querySelector('#favouriteModal');
  _parent = document.querySelector('#favouriteModal .favorite-items');
  _favoriteIcon = document.querySelector('.favorite-open');
  constructor() {}

  renderFavorite(recipe) {
    if (!recipe) return;
    // recipes.forEach(recipe => this._createCart(recipe));
    const html = this._createFavorite(recipe);
    this._parent.insertAdjacentHTML('afterbegin', html);
  }
  _createFavorite(recipe) {
    return `
      <li class="cart-item">
      

      <div class="row">
        <div class="col-8 cart-content">
          <h3>${recipe.name}  <span style="color: red;">❤️</span></h3>
         
          <div class="hidden id">${recipe._id}</div>
        </div>
        <div class="col-4">
          <img class="pic" src=${recipe.imageCover} />
        </div>
      </div>
    
    
      </li>
      `;
  }

  addHandler(handler) {
    this._favoriteIcon.addEventListener('click', handler);
  }

  clear() {
    this._parent.innerHTML = '';
  }
}

export default new favoriteView();
