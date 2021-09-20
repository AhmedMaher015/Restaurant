class categoriesView {
  _parent = document.querySelector('.categories');
  constructor() {}

  renderCategorys(categorys) {
    categorys.forEach(category => {
      // create category
      const categoryBtn = this._createCategory(category);

      // render category btn
      this._parent.insertAdjacentHTML('afterbegin', categoryBtn);
    });
  }

  _createCategory = category => {
    return `
            <button class="btn btn-outline-danger" value=${category._id}>${category.name}</button>
        `;
  };
}

export default new categoriesView();
