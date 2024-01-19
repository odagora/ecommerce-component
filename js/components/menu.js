// Importing the ProductItem class for rendering individual product items
import { ProductItem } from "./productItem.js";

// Define a class named 'Menu'
export class Menu {
  // Constructor takes an array of products and initializes the 'products' property
  constructor(products) {
    this.products = products;
  }

  // Method to render the menu by creating and appending ProductItem instances
  render() {
    // Select the menu container element
    const menuContainer = document.querySelector('.menu');
    // Clear the existing content in the menu container
    menuContainer.innerHTML = '';

    // Iterate through each product in the 'products' array
    this.products.forEach((product) => {
      // Create a new ProductItem instance with the product details
      const productItem = new ProductItem({ ...product });
      // Append the productItem to the menu container
      menuContainer.appendChild(productItem);
    });
  }
}
