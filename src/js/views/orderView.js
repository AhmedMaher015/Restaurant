class orderView {
  _modal = document.querySelector('#orderModal');
  constructor() {
    window.addEventListener('click', e => {
      e.target == this._modal ? this.closeModal() : false;
    });

    const closeBtn = this._modal.querySelector('.close');
    closeBtn.addEventListener('click', this.closeModal.bind(this));
  }

  showModal() {
    this._modal.classList.add('show__modal');
  }

  closeModal() {
    this._modal.classList.remove('show__modal');
  }

  addHandler(handler) {
    const form = this._modal.querySelector('.modal__form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const address = document.querySelector('#address');
      const phoneNumber = document.querySelector('#phone-number');
      const orderItems = JSON.parse(localStorage.getItem('order'));
      if (this.validPhoneNumber()) {
        handler({
          orderContent: orderItems,
          customerAddress: address.value,
          customerPhoneNumber: phoneNumber.value,
        });
      } else {
        this.renderError('invalid phone number');
      }
    });
  }
  renderError(err) {
    const errorLabel = this._modal.querySelector('.order-error');
    errorLabel.textContent = err;
  }
  validPhoneNumber() {
    const phoneNumber = document.querySelector('#phone-number');
    if (!Number(phoneNumber.value)) return false;
    return true;
  }
}

export default new orderView();
