import { formattedPrice } from "../utils/formattedPrice.js"

export function cartItem({image, altText, name, price, subTotal, quantity}) {
  const newPrice = formattedPrice(price * 100)
  const newSubTotal = formattedPrice(subTotal)

  return `
    <li>
      <div class="plate">
        <img src="${image}" alt="${altText}" class="plate" />
        <div class="quantity">${quantity}</div>
      </div>
      <div class="content">
        <p class="menu-item">${name}</p>
        <p class="price">${newPrice}</p>
      </div>
      <div class="quantity__wrapper">
        <button class="decrease">
          <img src="images/chevron.svg" />
        </button>
        <div class="quantity">${quantity}</div>
        <button class="increase">
          <img src="images/chevron.svg" />
        </button>
      </div>
      <div class="subtotal">${newSubTotal}</div>
      <button class="remove">Remove</button>
    </li>
  `
}