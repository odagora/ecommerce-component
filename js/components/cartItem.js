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
      const event = new CustomEvent('remove-from-cart', {
        detail: {
          name: this.name
        }
      })
      document.dispatchEvent(event)
    })
    this.querySelector('.decrease').addEventListener('click', () => {
      const event = new CustomEvent('decrease-quantity', {
        detail: {
          name: this.name,
          quantity: this.quantity,
          price: this.price
        }
      })
      document.dispatchEvent(event)
    })
    this.querySelector('.increase').addEventListener('click', () => {
      const event = new CustomEvent('increase-quantity', {
        detail: {
          name: this.name,
          quantity: this.quantity,
          price: this.price
        }
      })
      document.dispatchEvent(event)
    })
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