class toggleFormsView {
  _signupModal = document.getElementById('signup-modal');
  _loginModal = document.getElementById('signin-modal');
  _toggleBtns = document.querySelectorAll('.toggle-modal');
  constructor() {}
  toggleForms() {
    this._signupModal.classList.toggle('show__modal');
    this._loginModal.classList.toggle('show__modal');
  }
  addHandler() {
    this._toggleBtns.forEach(btn =>
      btn.addEventListener('click', this.toggleForms.bind(this))
    );
  }
}

export default new toggleFormsView();
