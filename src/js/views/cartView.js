class cartView {
  _modal = document.querySelector('#cartModal');
  _parent = document.querySelector('#cartModal .cart-items');
  _cartIcon = document.querySelector('#cart-open');
  constructor() {}

  renderCart(recipe) {
    if (!recipe) return;
    // recipes.forEach(recipe => this._createCart(recipe));
    const html = this._createCart(recipe);
    this._parent.insertAdjacentHTML('afterbegin', html);
  }
  _createCart(recipe) {
    return `
    <li class="cart-item">
      <div class="row">
        <div class="col-8 cart-content">
          <h3>${recipe.name}</h3>
          <div class="summary">
          <span class="price" value=${recipe.price}>${recipe.price}$</span>
            <div style="text-align: center;">
            <button class="add" >+</button>
            <input class="amount recipe__amount" type="number" value="1" min="1>" step="1" max="100" oninput="changeinput(this)" onchange="changeinput(this)" style="width: 50%; text-align: center">
            <button class="subtract">-</button>
          </div>
          
          </div>
          <div class="hidden id">${recipe._id}</div>
          <div style="margin: 10px 0px">
            <button class="btn btn-danger btn-md remove-cart" value=${recipe._id}>Remove</button>
            
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
    this._cartIcon.addEventListener('click', handler);
  }

  clear() {
    this._parent.innerHTML = '';
  }
}

export default new cartView();
