// Importing necessary data, classes, and utility functions
import { menuItems } from "./data/data.js";
import { Menu } from "./components/menu.js";
import { Cart } from "./components/cart.js";
import { priceToNumber } from "./utils/format.js";
import { querySelectorWithError } from "./utils/dom.js";

// Tax rate for cart calculations
const taxValue = 0.0975;


// Selecting the DOM elements
const menuContainer = querySelectorWithError('.menu', 'Menu container not found');
const cartContainer = querySelectorWithError('.cart-summary', 'Cart container not found');
const emptyMessage = querySelectorWithError('.empty', 'Empty message element not found');

// Creating instances of Menu and Cart
const menu = new Menu(menuItems);
const cart = new Cart();

// Function to initialize the menu and cart
function init() {
  menu.render();
  cart.render();
}

// Initialize the application
init();

// Function to update cart totals based on the current contents
function updateCartTotals() {
  if (!cart.isEmpty()) {
    // Selecting all subtotal elements in the cart
    const subTotals = cartContainer.querySelectorAll('cart-item .subtotal');
    // Mapping each subtotal element to its numerical value using the priceToNumber utility function
    const productsSubTotals = Array.from(subTotals).map(productSubtotal => priceToNumber(productSubtotal));

    // Calculating the total, tax, and subtotal based on the cart contents
    const subTotal = productsSubTotals.reduce((result, value) => result + value);
    const tax = subTotal * taxValue;
    const total = subTotal + tax;

    // Updating the cart totals
    cart.updateTotals(subTotal, tax, total);
  } else {
    // If the cart is empty, update totals to 0
    cart.updateTotals(0, 0, 0);
  }
}

// Event handler for 'add-to-cart' events
function addToCartHandler(event) {
  const productDetails = event.detail;
  // Selecting the corresponding product in the menu
  const productSelector = menuContainer.querySelector(`[data-name="${productDetails.name}"]`);
  // Adding the product to the cart
  cart.addProduct(productDetails);

  // If the product is in the menu, update its display
  if (productSelector) {
    const productItem = productSelector.closest('product-item');
    productItem.update();
  }

  // If the cart is not empty, hide the empty message and update cart totals
  if (!cart.isEmpty()) {
    emptyMessage.hidden = true;
    updateCartTotals();
  }
}

// Event handler for 'remove-from-cart' events
function removeFromCartHandler(event) {
  const productDetails = event.detail;
  // Selecting the corresponding product in the menu
  const productSelector = menuContainer.querySelector(`[data-name="${productDetails.name}"]`);
  // Removing the product from the cart
  cart.removeProduct(productDetails);

  // If the product is in the menu, update its display
  if (productSelector) {
    const productItem = productSelector.closest('product-item');
    productItem.update();
  }

  // If the cart is empty, show the empty message
  if (cart.isEmpty()) {
    emptyMessage.hidden = false;
  }
}

function quantityChangeHandler() {
  updateCartTotals();
}

// Event listeners for various cart-related events
document.addEventListener('add-to-cart', function (event) {
  const { activeElement } = event.target;
  // Check if the active element has the 'add' class before processing the event
  if (activeElement.classList.contains('add')) {
    addToCartHandler(event);
  }
});
document.addEventListener('remove-from-cart', removeFromCartHandler);
document.addEventListener('increase-quantity', quantityChangeHandler);
document.addEventListener('decrease-quantity', quantityChangeHandler);
