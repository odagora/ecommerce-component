import { numberToPrice } from "../utils/format.js";

// Defining a custom element called cart-totals
export class CartTotals extends HTMLElement {
  // Constructor takes and object with subTotal, tax, and total properties
  constructor({subTotal, tax, total}) {
    super();
    this.subTotal = subTotal ?? 0;
    this.tax = tax ?? 0;
    this.total = total ?? 0;
  }

  // ConnectedCallback is called when the element is inserted into the DOM
  connectedCallback() {
    // Initial rendering
    this.render();
  }

  // Function to update cart totals
  update() {
    const subtotal = this.querySelector('.subtotal');
    const tax = this.querySelector('.tax');
    const total = this.querySelector('.total .price');

    subtotal.innerText = numberToPrice(this.subTotal);
    tax.innerText = numberToPrice(this.tax);
    total.innerText = numberToPrice(this.total);
  }

  // Render method to create the initial HTML structure of the component
  render() {
    this.innerHTML = `
    <div class="line-item">
      <div class="label">Subtotal:</div>
      <div class="amount price subtotal" data-testid="subtotal">${numberToPrice(this.subTotal)}</div>
    </div>
    <div class="line-item">
      <div class="label">Tax:</div>
      <div class="amount price tax" data-testid="tax">${numberToPrice(this.tax)}</div>
    </div>
    <div class="line-item total">
      <div class="label">Total:</div>
      <div class="amount price total" data-testid="total">${numberToPrice(this.total)}</div>
    </div>
    `
  }
}

if (!customElements.get('cart-totals')) {
  customElements.define('cart-totals', CartTotals);
}

