import { elements } from './base.js';
import { incValue, decValue } from './ingredientsModal.js';
import { toggleSignModals, openSignUModal } from './form.js';
let userLogged = JSON.parse(localStorage.getItem('user-logged'));
const arrOfIDs = !localStorage.getItem('cart')
  ? []
  : localStorage.setItem('cart', JSON.stringify([]));
export const addToCart = btn => {
  if (!userLogged) {
    elements.detailsModal.classList.remove('show');
    toggleSignModals();
  } else {
    if (!arrOfIDs.includes(btn.value)) {
      arrOfIDs.push(btn.value);
      elements.detailsModal.querySelector('.addToCart-message').textContent =
        'Added To Cart';
      localStorage.setItem('cart', JSON.stringify(arrOfIDs));
    } else
      elements.detailsModal.querySelector('.addToCart-message').textContent =
        'Already in  Cart';
  }
};

export const createCarts = () => {
  const carts = JSON.parse(localStorage.getItem('cart'));
  const container = elements.cartModal.querySelector('.cart-items');
  container.innerHTML = '';
  if (carts.length > 0) {
    carts.forEach(id => {
      fetch(`https://panda-restaurant.herokuapp.com/api/v1/recipes/?_id=${id}`)
        .then(res => res.json())
        .then(data => {
          const {
            data: {
              data: [recipe],
            },
          } = data;
          createCart(recipe);
          putTotalSalary();
          const removeCartsBtns = document.querySelectorAll('.remove-cart');
          removeCartsBtns.forEach(btn =>
            btn.addEventListener('click', removeFromCart)
          );
        })
        .catch(err => console.log(err));
    });
  }
};
// https://panda-restaurant.herokuapp.com/api/v1/recipes/?_id=6121a4c319e88c0016df150f
export const createCart = recipe => {
  const html = `
  <li class="cart-item">
    <div class="row">
      <div class="col-8 cart-content">
        <h3>${recipe.name}</h3>
        <div class="summary">
        <span class="price" value=${recipe.price}>${recipe.price}$</span>
          <div style="text-align: center;">
          <button class="add" onclick="addToAmount(this)">+</button>
          <input class="amount recipe__amount" type="number" value="1" min="1>" step="1" max="100" oninput="changeinput(this)" onchange="changeinput(this)" style="width: 50%; text-align: center">
          <button class="subtract" onclick="subtractToAmount(this)">-</button>
        </div>
        
        </div>
        <div class="hidden id">${recipe._id}</div>
        <div style="margin: 10px 0px">
          <button class="btn btn-danger btn-md remove-cart" value=${recipe._id}>Remove</button>
          
        </div>
      </div>
      <div class="col-4">
        <img class="pic" src=${recipe.imageCover} />
      </div>
    </div>
  </li>
  `;
  const container = document.querySelector('.cart-items');
  container.insertAdjacentHTML('afterbegin', html);
};

window.openSignUModal = openSignUModal;
// window.toggleSignModals = toggleSignModals;

const removeFromCart = e => {
  arrOfIDs.pop(e.target.value);
  localStorage.setItem('cart', JSON.stringify(arrOfIDs));
  createCarts();
  putTotalSalary();
};

export const totalSalary = document.querySelector(
  '#cartModal .total-salary span'
);
export const putTotalSalary = () => {
  let total = 0;
  const carts = elements.cartModal.querySelectorAll('.row');
  if (carts.length > 0 && elements.cartModal.classList.contains('show')) {
    carts.forEach(val => {
      total +=
        Number(val.querySelector('.price').textContent.replace('$', '')) *
        Number(val.querySelector('.amount').value);
    });
  }
  totalSalary.textContent = total + '$';
};

const addToAmount = ele => {
  incValue(ele);
  putTotalSalary();
};

const subtractToAmount = ele => {
  decValue(ele);
  putTotalSalary();
};

window.addToAmount = addToAmount;
window.subtractToAmount = subtractToAmount;
