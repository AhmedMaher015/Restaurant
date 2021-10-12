class favoriteView {
  _modal = document.querySelector('#favouriteModal');
  _parent = document.querySelector('#favouriteModal .favorite-items');
  _favoriteIcon = document.querySelector('.favorite-open');
  constructor() {}

  renderFavorite(recipes) {
    if (!recipes && recipes.length === 0) return;
    this.clear();
    recipes.forEach(recipe => {
      const html = this._createFavorite(recipe);
      this._parent.insertAdjacentHTML('afterbegin', html);
    });

    this.addHandlerRemove();
  }
  _createFavorite(recipe) {
    return `
      <li class="cart-item">
      

      <div class="row">
        <div class="col-8 cart-content">
          <h3>${recipe.name}  <span style="color: red;">❤️</span></h3>
          <div class="hidden id">${recipe._id}</div>
          <div class="remove" style="margin: 10px 0px">
          <button class="btn btn-danger btn-md remove-cart" value="${recipe.id}">Remove</button>
        </div>
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
  addHandlerRemove() {
    const cartBtns = this._modal.querySelectorAll('.remove-cart');
    cartBtns.forEach(btn =>
      btn.addEventListener('click', e => {
        this.remove(e);
      })
    );
  }

  remove(e) {
    const favoriteIds = JSON.parse(localStorage.getItem('favorite')) || [];
    const favoriteBtn = e.target;
    const path = e.composedPath();
    favoriteIds.pop(favoriteBtn.value);
    localStorage.setItem('favorite', JSON.stringify(favoriteIds));
    path[4].remove();
  }
}

export default new favoriteView();
