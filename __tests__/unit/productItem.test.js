import { ProductItem } from "../../js/components/productItem";

describe("ProductItem", () => {
  let productItem, image, alt, name, price;

  beforeEach(() => {
    // Arrange
    image = 'image.jpg';
    alt = 'alt text';
    name = 'Product Name';
    price = 1000;

    // Act
    productItem = new ProductItem({ image, alt, name, price });
    document.body.appendChild(productItem);
  })

  afterEach(() => {
    jest.resetAllMocks();
    document.body.removeChild(productItem);
  })

  test('should create ProductItem element with correct properties', () => {
    // Assert
    expect(productItem.image).toBe(image);
    expect(productItem.alt).toBe(alt);
    expect(productItem.name).toBe(name);
    expect(productItem.price).toBe(price);
  });

  test('should render the correct HTML', () => {
    // Arrange
    expect(productItem.innerHTML).toMatchSnapshot();
  })

  test('Should dispatch a custom event with correct details when \'Add To Cart\' button is clicked', () => {
    // Arrange
    // Spy on the dispatchEvent function
    const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');

    // Act
    const button = productItem.querySelector('button');
    button.click();

    // Assert
    expect(dispatchEventSpy).toHaveBeenCalledWith(new CustomEvent('add-to-cart', {
      detail: {
        name: 'Product Name',
        image: 'image.jpg',
        alt: 'alt text',
        price: 1000,
      }}
    ))
  })

  test('Should update button text/content and class when \'Add To Cart\' button is clicked',() => {
    // Act
    const button = productItem.querySelector('button');
    productItem.update();

    // Assert
    expect(button.classList.contains('add')).toBe(false);
    expect(button.classList.contains('in-cart')).toBe(true);
    expect(button.querySelector('img').src).toContain('images/check.svg');
    expect(button.querySelector('img').alt).toBe('check');
    expect(button.innerText).toBe('In Cart');
  })

  test('Should remove the event listener when \'ProductItem\' element is removed from the DOM', () => {
    // Arrange
    const button = productItem.querySelector('button');
    // Spy on the removeEventListener function
    const removeEventListenerSpy = jest.spyOn(button, 'removeEventListener');

    // Act
    productItem.disconnectedCallback();

    // Assert
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
  })
})