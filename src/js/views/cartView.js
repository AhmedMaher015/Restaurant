class cartView {
  _modal = document.querySelector('#cartModal');
  _parent = document.querySelector('#cartModal .cart-items');
  _cartIcon = document.querySelector('#cart-open');

  constructor() {}

  renderCart(recipe) {
    if (!recipe) return;
    const html = this._createCart(recipe);
    this._parent.insertAdjacentHTML('afterbegin', html);
    this.addHandlerRemove();
    this.addHandlerAmount();
    this.totalSalary();
  }
  _createCart(recipe) {
    return `
    <li class="cart-item">
      <div class="row">
        <div class="col-8 cart-content">
          <h3>${recipe.name}</h3>
          <div class="summary">
          <span class="price">${recipe.price}$</span>
            <div style="text-align: center;">
            
            <input class="amount recipe__amount" type="number" value="1" min="1>" step="1" max="100" style="width: 50%; text-align: center">
            
          </div>
          
          </div>
          <div class="hidden id">${recipe.id}</div>
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
    this._cartIcon.addEventListener('click', handler);
  }
  addHandlerRemove() {
    const cartBtns = this._modal.querySelectorAll('.remove-cart');
    cartBtns.forEach(btn =>
      btn.addEventListener('click', e => {
        this.remove(e);
      })
    );
  }
  addHandlerOrderNow(handler) {
    const orderNowBtn = this._modal.querySelector('#orderNow');
    orderNowBtn.addEventListener('click', handler);
  }
  addHandlerAmount() {
    const amountInputs = this._parent.querySelectorAll('.amount');
    amountInputs.forEach(input =>
      input.addEventListener('input', e => {
        let value = Number(e.target.value);
        const btn = e.path[0];
        if (!value || value < 1) {
          btn.value = '1';
        } else {
          btn.value = Math.round(value);
        }
        this.totalSalary();
      })
    );
    const subtractBtns = this._parent.querySelectorAll('.subtract');
  }

  clear() {
    this._parent.innerHTML = '';
  }

  totalSalary() {
    const totalSalary = document.querySelector('#cartModal .total-salary span');
    let total = 0;
    const carts = this._modal.querySelectorAll('.row');
    if (carts.length > 0 && this._modal.classList.contains('show')) {
      carts.forEach(cart => {
        total +=
          Number(cart.querySelector('.price').textContent.replace('$', '')) *
          Number(cart.querySelector('.amount').value);
      });
    }
    totalSalary.textContent = total + '$';
  }

  remove(e) {
    const cartIds = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBtn = e.target;
    cartIds.pop(cartBtn.value);
    localStorage.setItem('cart', JSON.stringify(cartIds));
    e.path[4].remove();
    this.totalSalary();
  }

  storeOrders() {
    const orderItems = [];
    const carts = this._parent.querySelectorAll('.row');
    carts.forEach(cart =>
      orderItems.push({
        recipeId: cart.querySelector('.id').textContent,
        amount: cart.querySelector('.amount').value,
      })
    );
    localStorage.setItem('order', JSON.stringify(orderItems));
  }
  resetCart() {
    const totalSalary = document.querySelector('#cartModal .total-salary span');
    totalSalary.textContent = '0$';
    localStorage.setItem('cart', JSON.stringify([]));
  }
}

export default new cartView();

// addHandlerIncrementAmount() {
//   const addBtns = this._parent.querySelectorAll('.add');
//   addBtns.forEach(btn =>
//     btn.addEventListener('click', e => {
//       const addBtn = e.path[0];
//       const amountLabel = addBtn.closest('div').querySelector('.amount');
//       amountLabel.value = Number(amountLabel.value) + 1;
//       this.totalSalary();
//     })
//   );
// }
// addHandlerDecrementAmount() {
//   const subtractBtns = this._parent.querySelectorAll('.subtract');
//   subtractBtns.forEach(btn =>
//     btn.addEventListener('click', e => {
//       const subtractBtn = e.path[0];
//       const amountLabel = subtractBtn.closest('div').querySelector('.amount');
//       amountLabel.value = Number(amountLabel.value) - 1;
//       this.totalSalary();
//     })
//   );
// }
// this.addHandlerIncrementAmount();
// addHandlerDecrementAmount();
