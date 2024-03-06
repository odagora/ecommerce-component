import { CartItem } from "../../js/components/cartItem";

describe('CartItem', () => {
  let cartItem, name, image, alt, quantity, price;

  beforeEach(() => {
    // Arrange
    name = 'Test Item';
    image = 'test.jpg';
    alt = 'Test Image';
    quantity = 1;
    price = 100;

    // Act
    cartItem = new CartItem({ name, image, alt, quantity, price });
    document.body.appendChild(cartItem);
  });

  afterEach(() => {
    jest.resetAllMocks();
    document.body.removeChild(cartItem);
  })

  test('should create CartItem element with correct properties', () => {
    // Assert
    expect(cartItem.name).toBe(name);
    expect(cartItem.image).toBe(image);
    expect(cartItem.alt).toBe(alt);
    expect(cartItem.quantity).toBe(quantity);
    expect(cartItem.price).toBe(price);
  })

  test('should render the correct HTML', () => {
    // Assert
    // Use of snapshot testing to avoid specifying the expected UI structure. See 'https://jestjs.io/docs/snapshot-testing'
    expect(cartItem.innerHTML).toMatchSnapshot();
  })

  test('should increase the quantity when the increase button is clicked', () => {
    // Act
    const increaseButton = cartItem.querySelector('.increase');
    increaseButton.click();

    // Assert
    expect(cartItem.getState('quantity')).toBe(2);
    expect(cartItem.getState('subTotal')).toBe(200);
  })

  test('should decrease the quantity when the decrease button is clicked', () => {
    // Act
    const decreaseButton = cartItem.querySelector('.decrease');
    decreaseButton.click();

    // Assert
    expect(cartItem.getState('quantity')).toBe(0);
    expect(cartItem.getState('subTotal')).toBe(0);
  })

  test('should dispatch a custom event when \'remove\' button is clicked', () => {
    // Arrange
    const removeButton = cartItem.querySelector('.remove');
    // Simulate the dispatchedEvent by attaching a listener to the document. This way there's no need to mock the 'dispatchEvent'
    let dispatchedEvent = null;
    document.addEventListener('remove-from-cart', (event) => {
      dispatchedEvent = event
    })

    // Act
    removeButton.click();

    // Assert
    expect(dispatchedEvent).not.toBeNull();
    expect(dispatchedEvent.type).toBe('remove-from-cart');
    expect(dispatchedEvent.detail.name).toBe(name);
  })

  test('should dispatch \'decrease-quantity\' event when \'Decrease\' button is clicked', () => {
    // Arrange
    const decreaseButton = cartItem.querySelector('.decrease');
    const decreaseQuantityEventSpy = jest.spyOn(document, 'dispatchEvent');

    // Act
    decreaseButton.click();

    // Assert
    expect(decreaseQuantityEventSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'decrease-quantity' }));
    expect(decreaseQuantityEventSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: {
        name,
        quantity,
        price
      }
    }));
  })

  test('should dispatch \'increase-quantity\' event when \'Decrease\' button is clicked', () => {
    // Arrange
    const increaseButton = cartItem.querySelector('.increase');
    const increaseQuantityEventSpy = jest.spyOn(document, 'dispatchEvent');

    // Act
    increaseButton.click();

    // Assert
    expect(increaseQuantityEventSpy).toHaveBeenCalledWith(expect.objectContaining({
      type: 'increase-quantity',
      detail: {
        name,
        quantity,
        price
      }
    }));
  })
})
