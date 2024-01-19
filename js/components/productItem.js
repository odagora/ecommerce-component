import { ProductEvents } from "../events/productEvents.js";
import { numberToPrice } from "../utils/format.js"

export class ProductItem extends HTMLElement {
  constructor({ image, alt, name, price }){
    super();
    this.image = image;
    this.alt = alt;
    this.name = name;
    this.price = price;
  }

  connectedCallback() {
    this.render()
    this.querySelector('button').addEventListener('click', () => {
      this.#addToCartEvent();
    })
  }

  disconnectedCallback() {
    this.querySelector('button').removeEventListener('click', () => {
      this.#addToCartEvent();
    })
  }

  #addToCartEvent() {
    document.dispatchEvent(ProductEvents.addToCart({
      name: this.name,
      price: this.price,
      image: this.image,
      alt: this.alt,
      quantity: 1
    }))
  }

  update() {
    const button = this.querySelector('button');
    button.classList.toggle('add');
    button.classList.toggle('in-cart');

    if (button.classList.contains('in-cart')) {
      const image = document.createElement('img');
      image.src = "images/check.svg"
      image.alt = "check"
      button.innerText = 'In Cart';
      button.appendChild(image);
      return;
    }

    button.innerText = 'Add to cart';
  }

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

window.customElements.define('product-item', ProductItem)