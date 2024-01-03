import { htmlToElement } from "./utils/htmlToElement.js";
import { product } from "./components/product.js";
import { menuItems } from "./data/data.js";


function init() {
  renderProducts();

}

function renderProducts() {
  const menuContainer = document.querySelector('.menu');
  const products = [];

  menuItems.forEach((item) => {
    products.push(htmlToElement(product({...item})));
  })

  menuContainer.append(...products);
}

init();
