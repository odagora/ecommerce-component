// Importing necessary event constants and utility functions
import { CartEvents } from "../events/cartEvents.js";
import { numberToPrice } from "../utils/format.js";

// Define a custom element named 'cart-item' extending from the HTMLElement class
export class CartItem extends HTMLElement {
  // Constructor takes an object with properties like name, image, alt, quantity, price, and subTotal
  constructor({ name, image, alt, quantity, price, subTotal }) {
    super();
    // Initialize properties with the values passed in the constructor
    this.name = name;
    this.image = image;
    this.alt = alt;
    this.quantity = quantity;
    this.price = price;
    // Set subTotal to the provided value or default to the product price
    this.subTotal = subTotal ?? this.price;
  }

  // ConnectedCallback is called when the element is inserted into the DOM
  connectedCallback() {
    // Render the initial state
    this.render();
    // Add event listeners for remove, decrease, and increase buttons
    this.querySelector('.remove').addEventListener('click', () => {
      // Call a private method to handle the 'Remove from cart' event
      this.#removeFromCartEvent();
    });
    this.querySelector('.decrease').addEventListener('click', () => {
      // Call a private method to handle the 'Decrease quantity' event
      this.#quantityChangeEvent('decrease-quantity');
    });
    this.querySelector('.increase').addEventListener('click', () => {
      // Call a private method to handle the 'Increase quantity' event
      this.#quantityChangeEvent('increase-quantity');
    });
  }

  // DisconnectedCallback is called when the element is removed from the DOM
  disconnectedCallback() {
    // Remove previously added event listeners to prevent memory leaks
    this.querySelector('.remove').removeEventListener('click', () => {
      this.#removeFromCartEvent();
    });
    this.querySelector('.decrease').removeEventListener('click', () => {
      this.#quantityChangeEvent('decrease-quantity');
    });
    this.querySelector('.increase').removeEventListener('click', () => {
      this.#quantityChangeEvent('increase-quantity');
    });
  }

  // Private method to dispatch a custom event when 'Remove from cart' button is clicked
  #removeFromCartEvent() {
    document.dispatchEvent(CartEvents.removeFromCart(this.name));
  }

  // Private method to dispatch custom events for 'Decrease quantity' and 'Increase quantity'
  #quantityChangeEvent(event) {
    const productDetails = {
      name: this.name,
      quantity: this.quantity,
      price: this.price
    };
    if (event === 'decrease-quantity') {
      document.dispatchEvent(CartEvents.decreaseQuantity(productDetails));
    }

    if (event === 'increase-quantity') {
      document.dispatchEvent(CartEvents.increaseQuantity(productDetails));
    }
  }

  // Method to update the call-to-action (CTA), currently only making 'Remove' button visible
  updateCTA() {
    const button = this.querySelector('.remove');
    button.style.display = "block";
  }

  // Render method to create the initial HTML structure of the component
  render() {
    this.innerHTML = `
      <li data-name="${this.name}">
        <div class="plate">
          <img src="images/${this.image}" alt="${this.alt}" class="plate" />
          <div class="quantity">${this.quantity}</div>
        </div>
        <div class="content">
          <p class="menu-item">${this.name}</p>
          <p class="price">${numberToPrice(this.price)}</p>
        </div>
        <div class="quantity__wrapper">
          <button class="decrease">
            <img src="images/chevron.svg" />
          </button>
          <div class="quantity">${this.quantity}</div>
          <button class="increase">
            <img src="images/chevron.svg" />
          </button>
        </div>
        <div class="subtotal">${numberToPrice(this.subTotal)}</div>
        <button class="remove">Remove</button>
      </li>
    `;
  }
}

// Define the custom element using window.customElements
window.customElements.define('cart-item', CartItem);
