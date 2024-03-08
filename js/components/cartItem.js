// Importing necessary event constants and utility functions
import { CartEvents } from "../events/cartEvents.js";
import { numberToPrice } from "../utils/format.js";

// Define a custom element named 'cart-item' extending from the HTMLElement class
export class CartItem extends HTMLElement {
  #state;
  // Constructor takes an object with properties like name, image, alt, quantity, price, and subTotal
  constructor({ name, image, alt, quantity, price, subTotal }) {
    super();
    // Initialize properties with the values passed in the constructor
    this.name = name;
    this.image = image;
    this.alt = alt;
    this.quantity = quantity;
    this.price = price;
    this.isRemoveCTAHidden = true;
    // Set subTotal to the provided value or default to the product price
    this.subTotal = subTotal ?? this.price;
    this.#state = {
      quantity: this.quantity,
      subTotal: this.subTotal
    }
  }

  // Getter method to get the value of a property in the state object
  getState(path) {
    return this.#state[path];
  }

  // Setter method to set the value of a property in the state object
  setState(path, value) {
    if (this.#state[path] !== value) {
      this.#state = { ...this.#state, [path]: value };
    }
  }

  // ConnectedCallback is called when the element is inserted into the DOM
  connectedCallback() {
    // Render the initial state
    this.render();
    // Add event listeners for remove, decrease, and increase buttons
    this.addEventListener('click', this.#handleButtonClick)
  }

  // DisconnectedCallback is called when the element is removed from the DOM
  disconnectedCallback() {
    // Remove previously added event listeners to prevent memory leaks
    this.removeEventListener('click', this.#handleButtonClick)
  }

  // Private method to handle click events on the remove, decrease, and increase buttons
  #handleButtonClick(event) {
    const { target } = event;
    const targetClassList = target.closest('button').classList;

    if (targetClassList.contains('remove')) {
      this.#removeFromCartEvent();
    } else if (targetClassList.contains('decrease')) {
      this.#decreaseQuantity();
      this.#quantityChangeEvent('decrease-quantity');
    } else if (targetClassList.contains('increase')) {
      this.#increaseQuantity();
      this.#quantityChangeEvent('increase-quantity');
    }
  }

  // Private method to increase the quantity and update the subTotal property in the state object.
  #increaseQuantity() {
    const currentValue = this.getState('quantity');
    const newValue = currentValue + 1;
    this.setState('quantity', newValue);
    this.setState('subTotal', newValue * this.price);
    this.isRemoveCTAHidden = true;
    this.render();
  }

  // Private method to decrease the quantity and update the subTotal property in the state object.
  #decreaseQuantity() {
    const currentValue = this.getState('quantity');
    const newValue = currentValue - 1;
    if (currentValue > 0) {
      this.setState('quantity', newValue);
      this.setState('subTotal', newValue * this.price);
    }
    if (this.getState('quantity') === 0) {
      this.isRemoveCTAHidden = false;
    }
    this.render();
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

  // Render method to create the initial HTML structure of the component
  render() {
    this.innerHTML = `
      <li data-name="${this.name}">
        <div class="plate">
          <img src="images/${this.image}" alt="${this.alt}" class="plate" />
          <div class="quantity">${this.getState('quantity')}</div>
        </div>
        <div class="content">
          <p class="menu-item">${this.name}</p>
          <p class="price">${numberToPrice(this.price)}</p>
        </div>
        <div class="quantity__wrapper">
          <button class="decrease">
            <img src="images/chevron.svg" />
          </button>
          <div class="quantity">${this.getState('quantity')}</div>
          <button class="increase">
            <img src="images/chevron.svg" />
          </button>
        </div>
        <div class="subtotal">${numberToPrice(this.getState('subTotal'))}</div>
        <button class="remove ${this.isRemoveCTAHidden ? 'hidden' : ''}">Remove</button>
      </li>
    `;
  }
}

// Define the custom element using window.customElements
if (!customElements.get('cart-item')) {
  customElements.define('cart-item', CartItem);
}
