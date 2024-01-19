export class CartEvents {
  static removeFromCart(name) {
    return new CustomEvent('remove-from-cart', {
      detail: { name }
    })
  }

  static decreaseQuantity(props) {
    return new CustomEvent('decrease-quantity', {
      detail: { ...props }
    })
  }

  static increaseQuantity(props) {
    return new CustomEvent('increase-quantity', {
      detail: { ...props }
    })
  }
}