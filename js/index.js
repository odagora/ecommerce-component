import { menuItems } from "./data/data.js";
import { Menu } from "./components/menu.js";
import { Cart } from "./components/cart.js";
import { priceToNumber } from "./utils/format.js";

const taxValue = 0.0975;
const menuContainer = document.querySelector('.menu');
const cartContainer = document.querySelector('.cart-summary');
const emptyMessage = document.querySelector('.empty');

const menu = new Menu(menuItems);
const cart = new Cart();

function init() {
  menu.render();
  cart.render();
}

init();

function updateCartTotals() {
  if (!cart.isEmpty()) {
    const subTotals = cartContainer.querySelectorAll('cart-item .subtotal')
    const productsSubTotals = Array.from(subTotals).map(productSubtotal => priceToNumber(productSubtotal))

    const subTotal = productsSubTotals.reduce((result, value) => result + value)
    const tax = subTotal * taxValue
    const total = subTotal + tax

    cart.updateTotals(subTotal, tax, total);
  } else {
    cart.updateTotals(0, 0, 0);
  }
}

function addToCartHandler(event) {
  const productDetails = event.detail;
  const productSelector = menuContainer.querySelector(`[data-name="${productDetails.name}"]`)
  cart.addProduct(productDetails);

  if (productSelector) {
    const productItem = productSelector.closest('product-item');
    productItem.update();
  }

  if (!cart.isEmpty()) {
    emptyMessage.hidden = true;
    updateCartTotals();
  }
}

function removeFromCartHandler(event) {
  const productDetails = event.detail;
  const productSelector = menuContainer.querySelector(`[data-name="${productDetails.name}"]`)
  cart.removeProduct(productDetails);

  if (productSelector) {
    const productItem = productSelector.closest('product-item');
    productItem.update();
  }

  if (cart.isEmpty()) {
    emptyMessage.hidden = false;
  }
}

function increaseQuantityHandler(event) {
  const productDetails = event.detail;
  const { quantity, price } = productDetails;
  const newQuantity = quantity + 1;
  const subTotal = newQuantity * price;

  cart.updateProduct(productDetails, newQuantity, subTotal);
  updateCartTotals();
}

function decreaseQuantityHandler(event) {
  const productDetails = event.detail;
  const { quantity, price } = productDetails;

  if (quantity > 0) {
    const newQuantity = quantity - 1;
    const subTotal = newQuantity * price;

    cart.updateProduct(productDetails, newQuantity, subTotal);
    updateCartTotals();
  }

  return;
}

document.addEventListener('add-to-cart', function (event) {
  const { activeElement } = event.target;
  if (activeElement.classList.contains('add')) {
    addToCartHandler(event);
  }
});

document.addEventListener('remove-from-cart', removeFromCartHandler);

document.addEventListener('increase-quantity', increaseQuantityHandler)

document.addEventListener('decrease-quantity', decreaseQuantityHandler)
