class orderResultView {
  _modal = document.getElementById('orderResultModal');
  _parent = document.querySelector('.order-result-items');

  constructor() {
    window.addEventListener('click', e => {
      e.target == this._modal ? this.closeModal() : false;
    });

    const closeBtns = this._modal.querySelectorAll('.close');
    closeBtns.forEach(btn =>
      btn.addEventListener('click', this.closeModal.bind(this))
    );
  }

  renderResultOrder = data => {
    this._parent.innerHTML = '';
    const result = `
        <ul class="cart-items">
          <li class="cart-item">
          <div class="row">
              <div class="col-4" style="font-weigth: bold; color: #222;">Recipe Name</div>
              <div class="col-4" style="font-weigth: bold; color: #222;">Amount</div>
              <div class="col-4" style="font-weigth: bold; color: #222;">Price</div>
          </div>
        </li>
        ${data.orderContent.map(el => this._createRecipeInfo(el)).join('')} 
        <li class="cart-item">
          <div class="row" >
            <div class="col-8" style="font-weigth: bold; color: #222;">Total Price</div>
            <div class="col-4 total-price" style="font-weigth: bold; color: green;">${
              data.totalPrice
            }$</div>
          </div>
        </li> 
        </ul>
          `;

    this._parent.innerHTML = result;
  };

  _createRecipeInfo(recipe) {
    const content = `
        <li class="cart-item">
          <div class="row">
              <div class="col-4 recipe-name" >${recipe.recipeName}</div>
              <div class="col-4 recipe-amount" >${recipe.recipeAmount}</div>
              <div class="col-4 recipe-price" style="color: green; ">${recipe.recipePrice}$</div>
          </div>
          </li>
          `;
    return content;
  }

  showModal() {
    this._modal.style = 'display: block;';
    this._modal.classList.add('show');
  }
  closeModal() {
    this._modal.style = 'display: none;';
    this._modal.classList.remove('show');
  }
}

export default new orderResultView();
