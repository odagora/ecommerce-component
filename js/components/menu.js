// Importing the ProductItem class for rendering individual product items
import { getItemFromLocalStorage } from "../utils/localStorage.js";
import { ProductItem } from "./productItem.js";

// Define a class named 'Menu'
export class Menu {
  // Constructor takes an array of products and initializes the 'products' property
  constructor(products) {
    // Assert that products is an array
    if (!Array.isArray(products)) {
      throw new Error('Invalid argument: products must be an array');
    }
    // Assert that each element in products is an object with required attributes
    if (!products.every(product => (
      typeof product === 'object' &&
      product.hasOwnProperty('image') &&
      product.hasOwnProperty('name') &&
      product.hasOwnProperty('price') &&
      product.hasOwnProperty('alt')
    ))) {
      throw new Error('Invalid argument: Each product must have required attributes');
    }

    this.products = products;
  }

  // Method to render the menu by creating and appending ProductItem instances
  render() {
    // Get the existing products in cart
    const productsInCart = getItemFromLocalStorage('cartItems')
    // Select the menu container element
    const menuContainer = document.querySelector('.menu');

    if(menuContainer) {
      // Clear the existing content in the menu container
      menuContainer.innerHTML = '';
      // Iterate through each product in the 'products' array
      this.products.forEach((product) => {
        // Create a new ProductItem instance with the product details
        const productItem = new ProductItem({ ...product });
        // Append the productItem to the menu container
        menuContainer.appendChild(productItem);
        // Check whether the product is already in the cart
        const isProductInCart = productsInCart.some(productInCart => productInCart.name === productItem.name);
        // If product exists in the cart update it
        if (isProductInCart) {
          productItem.update();
        }
      });
    } else {
      throw new Error('Menu container not found');
    }
  }
}
