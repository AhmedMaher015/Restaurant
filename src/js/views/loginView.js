class loginView {
  _form = document.querySelector('#signin-modal .modal__form');
  _emailField = document.querySelector('#signinEmail');
  _passwordField = document.querySelector('#signin-modal #password');
  _error = document.querySelector('#signin-modal .signin-error');
  _modal = document.getElementById('signin-modal');
  _loginBtn = document.querySelector('.signin-icon');
  constructor() {
    window.addEventListener('click', e => {
      e.target == this._modal ? this.closeModal() : false;
    });

    this._loginBtn.addEventListener('click', this.showModal.bind(this));

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
    this._form.addEventListener('submit', e => {
      this._error.textContent = '';
      e.preventDefault();
      handler({
        email: this._emailField.value,
        password: this._passwordField.value,
      });
    });
  }

  showError(err) {
    this._error.textContent = err;
  }
}

export default new loginView();
