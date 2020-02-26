// show cart
(function () {

  const cardInfo = document.querySelector('.sepet-icon');
  const cart = document.querySelector('#cart');

  cardInfo.addEventListener('click', () => {
    cart.classList.toggle('show');
  });

})();


let idStack = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0"
];

function randomID() {
  let id = "";
  for (let i = 0; i <= 9; i++) {
    let randomIndex = Math.floor(Math.random() * idStack.length);
    id += idStack[randomIndex];
  }
  return id;
}

// add items to the cart
const cart = document.querySelector('#cart');
const cartWrapper = document.querySelector('#cart-wrapper');
const clearBtn = document.querySelector('#clear-cart');
const cartTotal = document.querySelector('.cart-total-container');
const addBtn = document.querySelectorAll('.urun__add');
const sepetCount = document.querySelector('.sepet__count');
sepetCount.textContent = 0;
// let itemList = [];

// add item to product
function addProduct(e) {
  const urunAdd = e.target.parentElement.parentElement;
  const name = urunAdd.previousElementSibling.firstElementChild.textContent;
  const price = urunAdd.previousElementSibling.children[2].children[1].textContent;
  if (urunAdd.classList.contains('urun__add')) {
    const fullPath = urunAdd.previousElementSibling.previousElementSibling.firstElementChild.src;
    let pos = fullPath.indexOf('img');
    let partPath = './' + fullPath.slice(pos);

    const product = {
      id: randomID(),
      img: partPath,
      name,
      price
    };

    if (localStorage.getItem("products") === null) {
      let products = [];
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      let products = JSON.parse(localStorage.getItem("products"));
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
    }
    let cartItem = `
          <div class="cart__item" id="${product.id}">
              <img src="${product.img}" id="item-img">
              <div class="item-text">
                <p id="cart-item-title" class="cart__item__title">${product.name}</p>
                <span>$</span>
                <span id="cart-item-price" class="cart-item-price">${product.price}</span>
              </div>
              <button type="button" class="cart-item-remove">
                <i class="fas fa-trash"></i>
              </button>
          </div>
          `;

    cartWrapper.innerHTML += cartItem;
    showTotals();
  };
};

// show card to DOM
function showProduct() {
  cartWrapper.innerHTML = '';
  try {
    if (JSON.parse(localStorage.getItem("products")).length !== 0) {
      let products = JSON.parse(localStorage.getItem("products"));
      products.forEach(item => {

        let cartItem = `
          <div class="cart__item" id="${item.id}">
              <img src="${item.img}" id="item-img">
              <div class="item-text">
                <p id="cart-item-title" class="cart__item__title">${item.name}</p>
                <span>$</span>
                <span id="cart-item-price" class="cart-item-price">${item.price}</span>
              </div>
              <button type="button" class="cart-item-remove">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

        cartWrapper.innerHTML += cartItem;
      })
      showTotals();
    }
  } catch (err) {
    console.log(err);
  }
}

// show totals
function showTotals() {
  const total = [];
  const items = document.querySelectorAll('.cart-item-price');
  if (items.length > 0) {
    items.forEach(item => {
      total.push(parseFloat(item.textContent));
    });
    const totalMoney = total.reduce((total, item) => {
      total += item;
      return total;
    }, 0);
    document.querySelector('#cart-total').textContent = totalMoney;
    sepetCount.textContent = total.length;
  } else {
    document.querySelector('#cart-total').textContent = 0;
    sepetCount.textContent = 0;
  }
}

// delete product
function deleteProduct(e) {
  let products = JSON.parse(localStorage.getItem('products'));
  if (e.target.parentElement.classList.contains('cart-item-remove')) {
    products = products.filter(item => {
      return item.id !== e.target.parentElement.parentElement.id;
    });
    localStorage.setItem("products", JSON.stringify(products));
  }
  showProduct();
  showTotals();
}

// clear card 
function clearCard() {
  localStorage.removeItem('products');
  showProduct();
  showTotals();
}

cart.addEventListener('click', function (e) {
  deleteProduct(e);
});

addBtn.forEach(btn => {
  btn.addEventListener('click', function (e) {
    addProduct(e);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  showProduct();
});

clearBtn.addEventListener('click', clearCard);

window.addEventListener('click', function (e) {
  console.log(e.target.className);
  e.stopPropagation();
  if (e.target.id != 'card' && e.target.className != 'sepet__count' && e.target.className != 'cart__item' && e.target.className != 'cart-total-container' && e.target.className != 'clear-cart' && e.target.className != 'cart-buttons-container' && e.target.className != 'fas fa-trash') {
    cart.classList.remove('show')
  }
})