import { _ } from 'core-js';

class orderCancelView {
  constructor() {
    const closeBtns = this._modal.querySelectorAll('.close');
    closeBtns.forEach(btn =>
      btn.addEventListener('click', this.closeModal.bind(this))
    );
    window.addEventListener('click', e => {
      e.target == this._modal ? this.closeModal() : false;
    });
  }
  _modal = document.getElementById('orderCancelModal');
  _parent = document.querySelector('#orderCancelModal .modal-body');

  showModal() {
    this._modal.style = 'display: block';
    this._modal.classList.add('show');
  }

  closeModal() {
    this._modal.style = 'none';
    this._modal.classList.remove('show');
  }

  renderError(err) {
    this._parent.innerHTML = `
  <div style='color: red; font-size: bold;'>${err}</div>
`;
  }

  renderSuccess() {
    this._parent.innerHTML = `
      <div style='color: green; font-size: bold;'>Canceled</div>
  `;
  }
}

export default new orderCancelView();
