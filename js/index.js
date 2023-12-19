import { htmlToElement } from "./utils/htmlToElement.js";
import { product } from "./components/product.js";
import { menuItems } from "./data/data.js";

function init() {
  const menuContainer = document.querySelector(".menu");
  const result = [];

  menuItems.forEach((item) => {
    result.push(htmlToElement(product({...item})));
  })

  menuContainer.append(...result);
}

init();