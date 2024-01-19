// Define a class named 'CartEvents' for creating custom events related to the cart
export class CartEvents {
  // Static method to create a custom event for removing a product from the cart
  static removeFromCart(name) {
    // Return a new CustomEvent with the type 'remove-from-cart' and details containing the product name
    return new CustomEvent('remove-from-cart', {
      detail: { name }
    });
  }

  // Static method to create a custom event for decreasing the quantity of a product in the cart
  static decreaseQuantity(props) {
    // Return a new CustomEvent with the type 'decrease-quantity' and details containing properties of the product
    return new CustomEvent('decrease-quantity', {
      detail: { ...props }
    });
  }

  // Static method to create a custom event for increasing the quantity of a product in the cart
  static increaseQuantity(props) {
    // Return a new CustomEvent with the type 'increase-quantity' and details containing properties of the product
    return new CustomEvent('increase-quantity', {
      detail: { ...props }
    });
  }
}
