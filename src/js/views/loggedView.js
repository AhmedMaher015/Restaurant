class loggedView {
  _userLoggedIcons = document.querySelectorAll('.user');
  _userNoLoggedIcons = document.querySelectorAll('.no-user');
  _signoutBtn = document.querySelector('#signoutBtn');
  constructor() {
    this._signoutBtn.addEventListener('click', this.userSignout.bind(this));
  }
  _userLogged() {
    const user = localStorage.getItem('user');
    if (!user) return false;
    return true;
  }

  _removeUserLoggedIcons() {
    this._userLoggedIcons.forEach(icon => icon.classList.add('hidden'));
  }

  _removeNoUserLoggedIcons() {
    this._userNoLoggedIcons.forEach(icon => icon.classList.add('hidden'));
  }

  userLoggedActions() {
    this._userLogged()
      ? this._removeNoUserLoggedIcons()
      : this._removeUserLoggedIcons();
  }

  userSignout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorite');
    location.reload();
  }
}

export default new loggedView();
