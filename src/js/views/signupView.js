class signupView {
  _form = document.querySelector('#signup-modal .modal__form');
  _emailField = document.querySelector('#signupEmail');
  _passwordField = document.querySelector('#password-user');
  _error = document.querySelector('.signup-error');
  _modal = document.getElementById('signup-modal');
  _nameField = document.querySelector('#signup-modal #name');
  _passwordConfirmField = document.getElementById('password-confirm');
  _signupBtn = document.querySelector('.signup-icon');
  constructor() {
    window.addEventListener('click', e => {
      e.target == this._modal ? this.closeModal() : false;
    });

    this._signupBtn.addEventListener('click', this.showModal.bind(this));

    const closeBtn = this._modal.querySelector('.close');
    closeBtn.addEventListener('click', this.closeModal.bind(this));
  }

  showModal() {
    const _modal = document.getElementById('signup-modal');
    _modal.classList.add('show__modal');
  }

  closeModal() {
    this._modal.classList.remove('show__modal');
  }

  addHandler(handler) {
    this._form.addEventListener('submit', e => {
      this._error.textContent = '';
      e.preventDefault();
      if (!this._validPasswordConfirm()) return;
      handler({
        name: this._nameField.value,
        email: this._emailField.value,
        password: this._passwordField.value,
        passwordConfirm: this._passwordConfirmField.value,
      });
    });
  }

  showError(err) {
    this._error.textContent = err;
  }

  _validPasswordConfirm() {
    if (this._passwordField.value !== this._passwordConfirmField.value) {
      this._error.textContent = 'not same password';
      return false;
    }
    return true;
  }
}
export default new signupView();
