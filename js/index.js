import { htmlToElement } from "./utils/htmlToElement.js";
import { product } from "./components/product.js";
import { cartItem } from "./components/cart-item.js";
import { menuItems } from "./data/data.js";
import { formattedPrice } from "./utils/formattedPrice.js";
import { replaceChild } from "./utils/replaceChild.js";

const menuContainer = document.querySelector('.menu');
const cartContainer = document.querySelector('.cart-summary');
const productList = document.querySelector('.panel');
const emptyMessage = document.querySelector('.empty');

let quantity = 1;

function init() {
  renderProducts();
  isCartEmpty();
  updateCartTotals();
}

function resetProduct(productName) {
  const productNames = productList.querySelectorAll('.menu-item')
  const match = Array.from(productNames).find(product => product.innerText === productName)
  const productToReset = match.closest('li')
  const props = getProductInfo({product: productToReset});
  const newNode = htmlToElement(product({ ...props }));

  replaceChild(menuContainer, productToReset, newNode);
}

function renderProducts() {
  const products = menuItems.map(item => htmlToElement(product({...item})));
  menuContainer.append(...products);
}

function addProductToCart(productInfo) {
  cartContainer.appendChild(htmlToElement(cartItem(productInfo)));
  updateCartTotals();
}

function updateProductCTA(parent, oldNode) {
  const newElement = `
    <button class="in-cart">
      <img src="images/check.svg" alt="Check" />
      In Cart
    </button>
  `;
  replaceChild(parent, oldNode, newElement);
}

function updateProductQuantity(nodes, quantity) {
  nodes.forEach(node => node.innerText = quantity);
}

function updateProductPrice(price, quantity) {
  return price * quantity;
}

function updateProductTotalPrice(node, price, quantity) {
  node.innerText = formattedPrice(updateProductPrice(price, quantity));
}

function updateCartTotals() {
  let [ subTotal, tax, total ] = [0, 0, 0]
  const {subTotalElement, taxElement, totalElement} = getCartValues()

  if(!isCartEmpty()) {
    const subTotals = cartContainer.querySelectorAll('li .subtotal')
    const productsSubTotals = Array.from(subTotals).map(product => parseInt(product.innerHTML.split('$')[1] * 100))

    subTotal = productsSubTotals.reduce((result, value) => result + value)
    tax = subTotal * 0.0975
    total = subTotal + tax
  }

  subTotalElement.innerText = formattedPrice(subTotal)
  taxElement.innerText = formattedPrice(tax)
  totalElement.innerText = formattedPrice(total)
}

function isCartEmpty() {
  const cartItems = cartContainer.querySelectorAll('li');
  return !cartItems.length
}

productList.addEventListener('click', (event) => {
  if (event.target.classList.contains('add')) {
    const productInfo = getProductInfo({event});
    const subTotal = updateProductPrice(productInfo.price * 100, 1);

    addProductToCart({ ...productInfo, subTotal, quantity });
    updateProductCTA(event.target.parentElement, event.target);
    if (!isCartEmpty()) emptyMessage.hidden = true;
  }
});

const cartList = document.querySelector('.cart');

cartList.addEventListener('click', (event) => {
  const { element, parent, productQuantity, productSubTotalContainer, productPrice, productRemoveButton } = getProductInCartInfo(event)
  let quantity = parseInt(productQuantity[0].innerText);

  if (parent.classList.contains('increase') || element.classList.contains('increase')) {
    quantity++;
    setTimeout(() => updateCartTotals(), 0)
    productRemoveButton.style.display = "none"
  } else if (parent.classList.contains('decrease') || element.classList.contains('decrease')) {
    if (quantity > 0) {
      quantity--;
      setTimeout(() => updateCartTotals(), 0)
    }
    if (quantity === 0) {
      productRemoveButton.style.display = "block"

      productRemoveButton.addEventListener('click', (event) => {
        const { product, productName } = getProductInCartInfo(event);
        event.stopPropagation();
        product.remove();
        resetProduct(productName);
        if (isCartEmpty()) emptyMessage.hidden = false;
      })
    }
  }

  updateProductQuantity(productQuantity, quantity);
  updateProductTotalPrice(productSubTotalContainer, productPrice, quantity);
});

function getProductInfo({ product, event }) {
  let image, altText, name, price;

  if (event) {
    const imageContainer = event.target.parentElement.previousElementSibling;
    const infoContainer = event.target.parentElement;
    image = new URL(imageContainer.querySelector('img').src).pathname;
    altText = imageContainer.querySelector('img').alt;
    name = infoContainer.querySelector('.menu-item').innerText;
    price = infoContainer.querySelector('.price').innerText.slice(1);
  }

  if (product) {
    const imagePathName = new URL(product.querySelector('img').src).pathname;
    image = imagePathName.split('/').pop();
    altText = product.querySelector('img').alt;
    name = product.querySelector('.menu-item').innerText;
    price = Number(product.querySelector('.price').innerText.slice(1)) * 100;
  }

  return { image, altText, name, price };
}

function getProductInCartInfo(event) {
  const element = event.target;
  const product = element.closest('li');
  const productName = product.querySelector('.menu-item').innerText;
  const productQuantity = product.querySelectorAll('.quantity');
  const quantityWrapper = element.closest('.quantity__wrapper');

  if (quantityWrapper) {
    const productContent = quantityWrapper.previousElementSibling;
    const productPriceContainer = productContent.querySelector('.price');
    const productSubTotalContainer = quantityWrapper.nextElementSibling;
    const productRemoveButton = productSubTotalContainer.nextElementSibling;
    const productPrice = parseInt(productPriceContainer.innerText.split('$')[1] * 100);

    return {
      element,
      parent: element.parentElement,
      product,
      productQuantity,
      productSubTotalContainer,
      productPrice,
      productRemoveButton
    }
  }

  return {
    element,
    parent: element.parentElement,
    product,
    productName
  }
}

function getCartValues() {
  const subTotalElement = document.querySelector('.totals .subtotal')
  const taxElement = document.querySelector('.tax')
  const totalElement = document.querySelectorAll('.total')[1]

  return {
    subTotalElement,
    taxElement,
    totalElement
  }
}

init();
