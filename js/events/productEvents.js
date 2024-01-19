export class ProductEvents {
  static addToCart(props) {
    return new CustomEvent('add-to-cart', {
      detail: { ...props }
    })
  }
}