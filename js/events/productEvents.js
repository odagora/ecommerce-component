// Define a class named 'ProductEvents' for creating custom events related to product actions
export class ProductEvents {
  // Static method to create a custom event for adding a product to the cart
  static addToCart(props) {
    // Return a new CustomEvent with the type 'add-to-cart' and details containing properties of the product
    return new CustomEvent('add-to-cart', {
      detail: { ...props }
    });
  }
}
