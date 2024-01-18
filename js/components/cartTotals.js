import { numberToPrice } from "../utils/format.js";

export class CartTotals extends HTMLElement {
  constructor({subTotal, tax, total}) {
    super();
    this.subTotal = subTotal ?? 0;
    this.tax = tax ?? 0;
    this.total = total ?? 0;
  }

  connectedCallback() {
    this.render();
  }

  update() {
    const subtotal = this.querySelector('.subtotal');
    const tax = this.querySelector('.tax');
    const total = this.querySelector('.total .price');

    subtotal.innerText = numberToPrice(this.subTotal);
    tax.innerText = numberToPrice(this.tax);
    total.innerText = numberToPrice(this.total);
  }

  render() {
    this.innerHTML = `
    <div class="line-item">
      <div class="label">Subtotal:</div>
      <div class="amount price subtotal">${numberToPrice(this.subTotal)}</div>
    </div>
    <div class="line-item">
      <div class="label">Tax:</div>
      <div class="amount price tax">${numberToPrice(this.tax)}</div>
    </div>
    <div class="line-item total">
      <div class="label">Total:</div>
      <div class="amount price total">${numberToPrice(this.total)}</div>
    </div>
    `
  }
}

window.customElements.define('cart-totals', CartTotals);