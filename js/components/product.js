import { formattedPrice } from "../utils/formattedPrice.js"

export function product({image, alt, name, price}) {
  const newPrice = formattedPrice(price)

  return `
    <li>
      <div class="plate">
        <img src="${`images/${image}`}" alt="${alt}" class="plate" />
      </div>
      <div class="content">
        <p class="menu-item">${name}</p>
        <p class="price">${newPrice}</p>
        <button class="add">Add to cart</button>
      </div>
    </li>
  `
}