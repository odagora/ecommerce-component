import { ProductItem } from "./productItem.js";

export class Menu {
  constructor(products) {
    this.products = products;
  }

  render() {
    const menuContainer = document.querySelector('.menu');
    menuContainer.innerHTML = '';

    this.products.forEach((product) => {
      const productItem = new ProductItem({ ...product });
      menuContainer.appendChild(productItem);
    })
  }
}