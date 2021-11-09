class paginationView {
  _parent = document.querySelector('.pages');
  renderPagination(recipesPerPage, restRecipes) {
    // clear pages  container
    this.clear();
    if (restRecipes === 0) return;
    const btnsNumber = Math.ceil(restRecipes / recipesPerPage);
    for (let i = 1; i <= btnsNumber; i++) {
      const btn = `<button class="btn btn-premier" value="${i}">${i}</button>`;
      this._parent.insertAdjacentHTML('beforeend', btn);
    }
  }

  addHandlerPagination(handler) {
    const btns = document.querySelectorAll('.pages button');
    if (btns == null) return;
    btns.forEach(btn =>
      btn.addEventListener('click', e => {
        handler(e.target.value);
      })
    );
  }
  clear() {
    this._parent.innerHTML = '';
  }
}

export default new paginationView();
