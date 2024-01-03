import { htmlToElement } from "./utils/htmlToElement.js";
import { product } from "./components/product.js";
import { cartItem } from "./components/cart-item.js";
import { menuItems } from "./data/data.js";
import { formattedPrice } from "./utils/formattedPrice.js";

function init() {
  renderProducts();
  checkCartState();
}

function renderProducts() {
  const menuContainer = document.querySelector('.menu');
  const products = [];

  menuItems.forEach((item) => {
    products.push(htmlToElement(product({...item})));
  })

  menuContainer.append(...products);
}

function addProductToCart(...product) {
  const cartContainer = document.querySelector('.cart-summary')
  cartContainer.appendChild(htmlToElement(cartItem(...product)))
}

function updateProductCTA(parent, oldNode) {
  const newElement = `
    <button class="in-cart">
      <img src="images/check.svg" alt="Check" />
      In Cart
    </button>
  `;
  const newNode = htmlToElement(newElement);

  parent.replaceChild(newNode, oldNode)
}

function updateProductPrice(price, quantity) {
  return price * quantity
}

function checkCartState() {
  const cart = document.querySelector('.cart-summary');
  const cartItems = cart.querySelectorAll('li');
  const emptyMessage = document.querySelector('.empty');

  if (!isCartEmpty(cartItems)) emptyMessage.hidden = true;
}

function isCartEmpty(items) {
  return !items.length
}

const productList = document.querySelector('.panel')

productList.addEventListener('click', (event) => {
  if (event.target.classList.contains('add')) {
    const imageContainer = event.target.parentElement.previousElementSibling
    const infoContainer = event.target.parentElement
    const image = new URL(imageContainer.querySelector('img').src).pathname
    const altText = imageContainer.querySelector('img').alt
    const name = infoContainer.querySelector('.menu-item').innerText
    const price = infoContainer.querySelector('.price').innerText.slice(1)
    const subTotal = updateProductPrice(price * 100, 1)
    console.log(subTotal);

    addProductToCart({image, altText, name, price, subTotal});
    updateProductCTA(infoContainer, event.target);
    checkCartState();
  }
})

init();
