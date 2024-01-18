import { CartItem } from "./cartItem.js";
import { CartTotals } from "./cartTotals.js";

export class Cart {
  constructor(){
    this.items = [];
    this.subTotal = 0;
    this.tax = 0;
    this.total = 0;
    this.totalElement = new CartTotals(this.subTotal, this.tax, this.total);
  }

  addProduct(productDetails){
    const cartItem = new CartItem(productDetails);
    this.items.push(cartItem);
    this.render();
  }

  removeProduct(productDetails){
    const newItems = this.items.filter(item => item.name != productDetails.name);
    this.items = newItems;
    this.render();
  }

  updateProduct(productDetails, quantity, subTotal){
    const product = this.items.findIndex(item => item.name == productDetails.name);
    this.items[product].quantity = quantity;
    this.items[product].subTotal = subTotal;
    this.render();

    if (quantity === 0) {
      this.items[product].updateCTA();
    }
  }

  renderTotals(){
    const totalContainer = document.querySelector('.totals');
    totalContainer.appendChild(this.totalElement);
  }

  updateTotals(subTotal, tax, total){
    this.totalElement.subTotal = subTotal;
    this.totalElement.tax = tax;
    this.totalElement.total = total;
    this.totalElement.update();
  }

  isEmpty() {
    const cartItems = document.querySelectorAll('.cart-summary li');
    return !cartItems.length
  }

  render() {
    const cartContainer = document.querySelector('.cart-summary');
    const totalContainer = document.querySelector('.totals')
    cartContainer.innerHTML = '';
    totalContainer.innerHTML = '';
    this.items.forEach(item => {
      cartContainer.appendChild(item)
    })
    this.renderTotals();
  }
}