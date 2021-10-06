class ordersView {
  _modal = document.querySelector('#ordersModal');
  _parent = document.querySelector('#ordersModal .modal-body ul');
  _ordersIcon = document.getElementById('ordersBtn');

  renderOrders(orders) {
    this._clearOrders();
    orders.forEach(order => {
      this._parent.insertAdjacentHTML('afterbegin', this._createOrder(order));
    });
  }
  _createOrder(ord) {
    return `
    <li class="cart-item">
      <div class="row">
        <div class="col-12" style="color: orangered; text-align: center;">${ord.createdAt.slice(
          0,
          10
        )}</div>
          <div class="col-8 cart-content">
            ${ord.orderContent
              .map(val => {
                return `
                    <h4>${val.recipeName} <span style="font-size: 0.8em;">  ${val.recipeAmount}x</span></h4>
                `;
              })
              .join('')}
          </div>
        <div class="col-4" style="display:flex; flex-flow: column wrap; justify-content: space-between;">
          <div style="color: green; text-align: center;">${
            ord.totalPrice
          }$</div>
          <button class="btn btn-md btn-danger cancel" value=${
            ord._id
          } data-bs-dismiss="modal">Cancel Order</button>
        </div>
      </div>
    </li>
      `;
    //
  }
  _clearOrders() {
    this._parent.innerHTML = '';
  }
  addHandler(handler) {
    this._ordersIcon.addEventListener('click', handler);
  }

  addHandlerRemove(handler) {
    const cancelBtns = this._parent.querySelectorAll('.cancel');
    cancelBtns.forEach(btn =>
      btn.addEventListener('click', e => handler(e.target.value))
    );
  }

  closeModal() {
    this._modal.classList.remove('show');
  }
}

export default new ordersView();
