import { Menu } from "../../js/components/menu";
import { mockedMenuItems } from "../../__mocks__/menuData";

describe('Menu', () => {
  test('should instantiate Menu with an array of products', () => {
    // Act
    const menu = new Menu(mockedMenuItems);

    // Assert
    expect(menu.products).toEqual(mockedMenuItems);
  })

  test('should render the menu with the correct number of product items', () => {
    // Arrange
    const menu = new Menu(mockedMenuItems);
    const menuElement = document.createElement('ul');
    menuElement.classList.add('menu');
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === '.menu') {
        return menuElement;
      }
    })
    // Act
    menu.render();

    // Assert
    const productItems = menuElement.querySelectorAll('product-item');
    expect(productItems.length).toBe(mockedMenuItems.length);
  })

  test('should throw error if \'products\' argument is not an array', () => {
    // Arrange
    const invalidProducts = 'not an array'
    const errorMessage = 'Invalid argument: products must be an array';

    // Act and Assert
    expect(() => new Menu(invalidProducts)).toThrow(errorMessage);
  })

  test('should throw an error when each element in \'products\' array does not have required attributes', () => {
    // Arrange
    const products = [
      { id: 1, image: 'image1.jpg', name: 'Product 1', price: 10 },
      { id: 2, image: 'image2.jpg', name: 'Product 2' },
      { id: 3, image: 'image3.jpg', name: 'Product 3', price: 30 }
    ];

    // Act and Assert
    expect(() => new Menu(products)).toThrow('Invalid argument: Each product must have required attributes');
  })

  test('should throw an error when menu container not found', () => {
    // Arrange
    const errorMessage = 'Menu container not found';
    const menu = new Menu(mockedMenuItems);
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === '.menu') {
        return null;
      }
    })

      // Act and Assert
      expect(() => menu.render()).toThrow(errorMessage);
  })
})