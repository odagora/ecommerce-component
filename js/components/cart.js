// Importing necessary classes for cart items and totals
import { CartItem } from "./cartItem.js";
import { CartTotals } from "./cartTotals.js";

// Define a class named 'Cart'
export class Cart {
  // Constructor initializes properties for items, subTotal, tax, total, and totalElement
  constructor() {
    this.items = [];
    this.subTotal = 0;
    this.tax = 0;
    this.total = 0;
    // Create an instance of CartTotals with initial values and assign it to totalElement
    this.totalElement = new CartTotals(this.subTotal, this.tax, this.total);
  }

  // Method to add a product to the cart
  addProduct(productDetails) {
    // Create a new CartItem instance with the provided product details
    const cartItem = new CartItem(productDetails);
    // Add the new cart item to the items array
    this.items.push(cartItem);
    // Render the updated cart
    this.render();
  }

  // Method to remove a product from the cart
  removeProduct(productDetails) {
    // Filter out the item with the specified name from the items array
    const newItems = this.items.filter(item => item.name != productDetails.name);
    this.items = newItems;
    // Render the updated cart
    this.render();
  }

  // Method to update the quantity and subTotal of a product in the cart
  updateProduct(productDetails, quantity, subTotal) {
    // Find the index of the product in the items array
    const productIndex = this.items.findIndex(item => item.name == productDetails.name);
    // Update quantity and subTotal for the specified product
    this.items[productIndex].quantity = quantity;
    this.items[productIndex].subTotal = subTotal;
    // Render the updated cart
    this.render();

    // If quantity is 0, update the call-to-action (CTA) in the cart item
    if (quantity === 0) {
      this.items[productIndex].updateCTA();
    }
  }

  // Method to render the totals section of the cart
  renderTotals() {
    const totalContainer = document.querySelector('.totals');
    // Append the totalElement to the totals container
    totalContainer.appendChild(this.totalElement);
  }

  // Method to update the totals section with new values
  updateTotals(subTotal, tax, total) {
    // Update the properties of totalElement with new values
    this.totalElement.subTotal = subTotal;
    this.totalElement.tax = tax;
    this.totalElement.total = total;
    // Call the update method of totalElement to reflect the changes in the UI
    this.totalElement.update();
  }

  // Method to check if the cart is empty
  isEmpty() {
    const cartItems = document.querySelectorAll('.cart-summary li');
    return !cartItems.length;
  }

  // Method to render the entire cart, including items and totals
  render() {
    const cartContainer = document.querySelector('.cart-summary');
    const totalContainer = document.querySelector('.totals');
    // Clear the existing content in the cart and totals containers
    cartContainer.innerHTML = '';
    totalContainer.innerHTML = '';
    // Append each cart item to the cart container
    this.items.forEach(item => {
      cartContainer.appendChild(item);
    });
    // Render the totals section
    this.renderTotals();
  }
}
