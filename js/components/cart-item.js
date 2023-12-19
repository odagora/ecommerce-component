export function cartItem({image, alt, name, price}) {
  return `
    <li>
      <div class="plate">
        <img src="images/${image}" alt="${alt}" class="plate" />
        <div class="quantity">1</div>
      </div>
      <div class="content">
        <p class="menu-item">${name}</p>
        <p class="price">${price}</p>
      </div>
      <div class="quantity__wrapper">
        <button class="decrease">
          <img src="images/chevron.svg" />
        </button>
        <div class="quantity">1</div>
        <button class="increase">
          <img src="images/chevron.svg" />
        </button>
      </div>
      <div class="subtotal">${subtotal}</div>
    </li>
  `
}