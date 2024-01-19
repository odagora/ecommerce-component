import { ProductEvents } from "../events/productEvents.js";
import { numberToPrice } from "../utils/format.js"

// Define a custom element named 'product-item' extending from the HTMLElement class
export class ProductItem extends HTMLElement {
  // Constructor takes an object with properties like image, alt, name, and price
  constructor({ image, alt, name, price }) {
    super();
    // Initialize properties with the values passed in the constructor
    this.image = image;
    this.alt = alt;
    this.name = name;
    this.price = price;
  }

  // ConnectedCallback is called when the element is inserted into the DOM
  connectedCallback() {
    // Render the initial state
    this.render();
    // Add an event listener to the 'Add to cart' button
    this.querySelector('button').addEventListener('click', () => {
      // Call a private method to handle the 'Add to cart' event
      this.#addToCartEvent();
    });
  }

  // DisconnectedCallback is called when the element is removed from the DOM
  disconnectedCallback() {
    // Remove the previously added event listener to prevent memory leaks
    this.querySelector('button').removeEventListener('click', () => {
      this.#addToCartEvent();
    });
  }

  // Private method to dispatch a custom event when 'Add to cart' button is clicked
  #addToCartEvent() {
    document.dispatchEvent(
      ProductEvents.addToCart({
        name: this.name,
        price: this.price,
        image: this.image,
        alt: this.alt,
        quantity: 1,
      })
    );
  }

  // Update method to toggle button class and update button text/content
  update() {
    const button = this.querySelector('button');
    button.classList.toggle('add');
    button.classList.toggle('in-cart');

    if (button.classList.contains('in-cart')) {
      // If the item is in the cart, show a checkmark image
      const image = document.createElement('img');
      image.src = 'images/check.svg';
      image.alt = 'check';
      button.innerText = 'In Cart';
      button.appendChild(image);
      return;
    }

    // If the item is not in the cart, revert to default button text
    button.innerText = 'Add to cart';
  }

  // Render method to create the initial HTML structure of the component
  render() {
    this.innerHTML = `
      <li data-name="${this.name}">
        <div class="plate">
          <img src="${`images/${this.image}`}" alt="${this.alt}" class="plate" />
        </div>
        <div class="content">
          <p class="menu-item">${this.name}</p>
          <p class="price">${numberToPrice(this.price)}</p>
          <button class="add">Add to cart</button>
        </div>
      </li>
    `;
  }
}

// Define the custom element using window.customElements
window.customElements.define('product-item', ProductItem);
