import { CartEvents } from "../events/cartEvents.js";
import { numberToPrice } from "../utils/format.js"

export class CartItem extends HTMLElement {
  constructor({ name, image, alt, quantity, price, subTotal }) {
    super();
    this.name = name;
    this.image = image;
    this.alt = alt;
    this.quantity = quantity;
    this.price = price;
    this.subTotal = subTotal ?? this.price;
  }

  connectedCallback() {
    this.render();
    this.querySelector('.remove').addEventListener('click', () => {
      this.#removeFromCartEvent();
    })
    this.querySelector('.decrease').addEventListener('click', () => {
      this.#quantityChangeEvent('decrease-quantity');
    })
    this.querySelector('.increase').addEventListener('click', () => {
      this.#quantityChangeEvent('increase-quantity');
    })
  }

  disconnectedCallback() {
    this.querySelector('.remove').removeEventListener('click', () => {
      this.#removeFromCartEvent();
    })
    this.querySelector('.decrease').removeEventListener('click', () => {
      this.#quantityChangeEvent('decrease-quantity');
    })
    this.querySelector('.increase').removeEventListener('click', () => {
      this.#quantityChangeEvent('increase-quantity');
    })
  }

  #removeFromCartEvent() {
    document.dispatchEvent(CartEvents.removeFromCart(this.name))
  }

  #quantityChangeEvent(event) {
    const productDetails = {
      name: this.name,
      quantity: this.quantity,
      price: this.price
    }
    if (event === 'decrease-quantity') {
      document.dispatchEvent(CartEvents.decreaseQuantity(productDetails))
    }

    if(event === 'increase-quantity') {
      document.dispatchEvent(CartEvents.increaseQuantity(productDetails))
    }
  }

  updateCTA() {
    const button = this.querySelector('.remove');
    button.style.display = "block"
  }

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
    `
  }
}

window.customElements.define('cart-item', CartItem);