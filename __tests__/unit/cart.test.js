import { Cart } from "../../js/components/cart";
import { CartItem } from "../../js/components/cartItem";
import { mockedMenuItems } from "../../__mocks__/menuData";
import { CartTotals } from "../../js/components/cartTotals";

describe('Cart', () => {
  let cart, cartContainer, totalsContainer;

  beforeEach(() => {
    cart = new Cart();
    cartContainer = document.createElement('ul');
    totalsContainer = document.createElement('div');
    cartContainer.classList.add('cart-summary');
    totalsContainer.classList.add('totals');
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === '.cart-summary') {
        return cartContainer;
      }
      if (selector === '.totals') {
        return totalsContainer;
      }
    });
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create a Cart instance with correct initial values', () => {
    // Assert
    expect(cart.items).toEqual([]);
    expect(cart.subTotal).toBe(0);
    expect(cart.tax).toBe(0);
    expect(cart.total).toBe(0);
    expect(cart.totalElement.subTotal).toBe(0);
    expect(cart.totalElement.tax).toBe(0);
    expect(cart.totalElement.total).toBe(0);
  })

  test('should render the entire cart, including items and totals', () => {
    // Arrange
    const cartItem = new CartItem(mockedMenuItems[0]);
    cart.items.push(cartItem);
    // Act
    cart.render();

    // Assert
    const cartItems = cartContainer.querySelectorAll('cart-item');
    const cartTotal = totalsContainer.querySelector('cart-totals');
    expect(cartItems.length).toBe(1);
    expect(cartTotal).not.toBeNull();
  })

  test('should add a product to the cart', () => {
    // Arrange & Act
    cart.addProduct(mockedMenuItems[0]);

    // Assert
    const cartItem = cart.items[0];
    expect(cartItem.name).toBe(mockedMenuItems[0].name);
    expect(cartItem.price).toBe(mockedMenuItems[0].price);
    expect(cartItem.quantity).toBe(mockedMenuItems[0].quantity);
    expect(cartItem.image).toBe(mockedMenuItems[0].image);
    expect(cartItem.alt).toBe(mockedMenuItems[0].alt);
    expect(cartItem.subTotal).toBe(mockedMenuItems[0].price);
    expect(cartItem.isRemoveCTAHidden).toBe(true);
  })

  test('should remove a product from the cart and leave it empty', () => {
    // Arrange & Act
    cart.addProduct(mockedMenuItems[0]);
    cart.removeProduct(mockedMenuItems[0]);

    // Assert
    expect(cart.items).toEqual([]);
    expect(cart.isEmpty()).toBe(true);
  })

  test('should update the totals section with correct values', () => {
    // Arrange
    const subTotal = 10;
    const tax = 1;
    const total = 11;
    const subTotalContainer = document.createElement('div');
    const taxContainer = document.createElement('div');
    const totalContainer = document.createElement('div');
    subTotalContainer.classList.add('subtotal');
    taxContainer.classList.add('tax');
    totalContainer.classList.add('total');
    jest.spyOn(CartTotals.prototype, 'querySelector').mockImplementation((selector) => {
      if (selector === '.subtotal') {
        return subTotalContainer;
      }
      if (selector === '.tax') {
        return taxContainer;
      }
      if (selector === '.total .price') {
        return totalContainer;
      }
    });

    // Act
    cart.updateTotals(subTotal, tax, total);

    // Assert
    expect(cart.totalElement.subTotal).toBe(subTotal);
    expect(cart.totalElement.tax).toBe(tax);
    expect(cart.totalElement.total).toBe(total);
  })
})