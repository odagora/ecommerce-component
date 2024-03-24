# AdventofJS - Ecommerce component
![test-deploy workflow](https://github.com/odagora/ecommerce-component/actions/workflows/test-deploy.yml/badge.svg)
[![Ecommerce component](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/detailed/ukyvks&style=flat&logo=cypress)](https://cloud.cypress.io/projects/ukyvks/runs)
![coverage badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/odagora/be25252968fdd94ac6a731aec01b50dd/raw/ecommerce-component__heads_main.json)

This is a solution to the Avent of JS ecommerce component challenge.


## Table of contents
- [Overview](#Overview)
- [Screenshots](#Screenshots)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview
In this project, we're creating an eCommerce component.

**Users should be able to:**

- View the plates on the left side of the screen and add them to your cart on the right side.
- When there are no plates within your cart, you should see a message that says, "Your cart is empty."
- When a plate is added to your cart, the Subtotal and Totals will automatically update.
- When products are in your cart, you should be able to increase and decrease the quantity.
  - A user should not be able to mark the quantity as a negative number.
  - If the quantity goes down to 0, the user will have the option to delete or remove the product for their cart entirely.
- Tax is based on the state of Tennessee sales tax: `0.0975`

## Screenshots
### Initial state
![Initial state](https://bit.ly/3U7U7Um)

### One product in cart
![One product in cart](https://bit.ly/47N2sjg)

### Two products in cart
![Two products in cart](https://bit.ly/3O6AiZF)

### Change product quantity
![Change product quantity](https://bit.ly/48LIPcU)

### Remove product from cart
![Remove product from cart](https://bit.ly/3tZC6wy)

## My process
### Built with
- Vanilla JavaScript
- OOP
- Web components
- Custom events
- Unit testing with Jest
- Integration testing with Cypress

### What I learned
1. Function to convert a template string into a node element:
    ```js
    export function htmlToElement(html) {
      const template = document.createElement('template');
      template.innerHTML = html.trim();

      return template.content.firstChild;
    }
    ```
    ```js
    //Template literals JS based component
    export function product({image, alt, name, price}) {
      const newPrice = formattedPrice(price)

      return `
        <li>
          <div class="plate">
            <img src="${`images/${image}`}" alt="${alt}" class="plate" />
          </div>
          <div class="content">
            <p class="menu-item">${name}</p>
            <p class="price">${newPrice}</p>
            <button class="add">Add to cart</button>
          </div>
        </li>
      `
    }
    ```
  2. Remove node from DOM using `remove()` method:
      ```js
        productRemoveButton.addEventListener('click', (event) => {
          const { product, productName } = getProductInCartInfo(event);
          event.stopPropagation();
          //Remove the element from the DOM
          product.remove();
          resetProduct(productName);
          if (isCartEmpty()) emptyMessage.hidden = false;
        })
      ```
  3. Use of web components for better handling DOM elements update without any framework:
      ```js
      // Define a custom element named 'product-item' extending from the HTMLElement class
      export class ProductItem extends HTMLElement {
        // Constructor takes an object with properties like image, alt, name, and price
        constructor({ image, alt, name, price }) {
          super();
          // Initialize properties with the values passed in the constructor
          this.image = image;
          this.alt = alt;
          this.name = name;
          this.price = price;
        }

        // ConnectedCallback is called when the element is inserted into the DOM
        connectedCallback() {
          // Render the initial state
          this.render();
          // Add an event listener to the 'Add to cart' button
          this.querySelector('button').addEventListener('click', () => {
            // Call a private method to handle the 'Add to cart' event
            this.#addToCartEvent();
          });
        }

        // DisconnectedCallback is called when the element is removed from the DOM
        disconnectedCallback() {
          // Remove the previously added event listener to prevent memory leaks
          this.querySelector('button').removeEventListener('click', () => {
            this.#addToCartEvent();
          });
        }

        // Private method to dispatch a custom event when 'Add to cart' button is clicked
        #addToCartEvent() {
          document.dispatchEvent(
            ProductEvents.addToCart({
              name: this.name,
              price: this.price,
              image: this.image,
              alt: this.alt,
              quantity: 1,
            })
          );
        }

        // Update method to toggle button class and update button text/content
        update() {
          const button = this.querySelector('button');
          button.classList.toggle('add');
          button.classList.toggle('in-cart');

          if (button.classList.contains('in-cart')) {
            // If the item is in the cart, show a checkmark image
            const image = document.createElement('img');
            image.src = 'images/check.svg';
            image.alt = 'check';
            button.innerText = 'In Cart';
            button.appendChild(image);
            return;
          }

          // If the item is not in the cart, revert to default button text
          button.innerText = 'Add to cart';
        }

        // Render method to create the initial HTML structure of the component
        render() {
          this.innerHTML = `
            <li data-name="${this.name}">
              <div class="plate">
                <img src="${`images/${this.image}`}" alt="${this.alt}" class="plate" />
              </div>
              <div class="content">
                <p class="menu-item">${this.name}</p>
                <p class="price">${numberToPrice(this.price)}</p>
                <button class="add">Add to cart</button>
              </div>
            </li>
          `;
        }
      }

      // Define the custom element using window.customElements
      window.customElements.define('product-item', ProductItem);
      ``````
  4. Creation of Custom Events with `detail` data and listening to them:
      ```js
      //Custom event definition
      export class ProductEvents {
        static addToCart(props) {
          return new CustomEvent('add-to-cart', {
            detail: { ...props }
          })
        }
      }
      ```
      ```js
      //Custom event listener inside web component
      //Add custom event listener inside the 'connectedCallback'
      connectedCallback() {
        this.render()
        this.querySelector('button').addEventListener('click', () => {
          this.#addToCartEvent();
        })
      }
      //Remove custom event listener inside the 'disconnectedCallback'
      disconnectedCallback() {
        this.querySelector('button').removeEventListener('click', () => {
          this.#addToCartEvent();
        })
      }
      //Private custom event dispatcher with 'detail' data to be sent
      #addToCartEvent() {
        document.dispatchEvent(ProductEvents.addToCart({
          name: this.name,
          price: this.price,
          image: this.image,
          alt: this.alt,
          quantity: 1
        }))
      }
      ```
  5. Web components state management:
      ```js
      ...
      constructor({ name, image, alt, quantity, price, subTotal }) {
        super();
        ...
        this.quantity = quantity;
        ...
        this.subTotal = subTotal ?? this.price;
        // Initial state
        this.#state = {
          quantity: this.quantity,
          subTotal: this.subTotal
        }
      }

      // Getter method to get the value of a property in the state object
      getState(path) {
        return this.#state[path];
      }

      // Setter method to set the value of a property in the state object
      setState(path, value) {
        if (this.#state[path] !== value) {
          this.#state = { ...this.#state, [path]: value };
        }
      }
      ``````
  6. Unit testing using Jest with the AAA framework:
      ```js
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
      })
      ```
  7. Integration testing using Cypress:
      ```js
      describe('Initial state', () => {
        it('should display the menu items and an empty cart message', () => {
          cy.visit('/')
            .get('[data-testid="menu"]').should('exist')
            .get('[data-testid="empty-cart-message"]').should('exist')
            .get('[data-testid="empty-cart-message"]').should('contain', 'Your cart is empty.')
        })
      })
      ```
  8. `localStorage` mocking for unit testing:
      * `mockWindowProperty` mock function:
        ```js
        /**
         * Function that mocks a property on the 'window' object with a specified value.
        * Sets up the mock before each test suite and restores
        * the original property after each test suite.
        * @example
        * mockWindowProperty('innerWidth', 500);
        * @param {string} property The name of the property to mock on 'window' object.
        * @param {*} value The value to set on mocked property.
        */
        export const mockWindowProperty = (property, value) => {
          const originalProperty = window[property];
          delete window[property];
          beforeAll(() => {
            if (originalProperty !== undefined) {
              Object.defineProperty(window, property, {
                configurable: true,
                writable: true,
                value,
              });
            } else {
              window[property] = value;
            }
          });
          afterAll(() => {
            if (originalProperty !== undefined) {
              window[property] = originalProperty;
            } else {
              delete window[property];
            }
          });
        };
        ```
      * Usage of the `mockWindowProperty` within a test suite:
        ```js
        mockWindowProperty('localStorage', {
          setItem: jest.fn(),
          getItem: jest.fn(),
          removeItem: jest.fn()
        });
        ```
  9. Getting unit testing coverage running `jest --coverage`:
      ![Unit testing coverage report](https://res.cloudinary.com/dyv1jgadp/image/upload/v1711060820/2024-03-21_17-38-27_zizkxz.jpg)
  10. GitHub actions CI/CD integration with Github Pages:
      - Running Jest testing coverage.
      - Running Cypress testing.
      - Creating testing results badges in README.
      - Creating Jest coverage badge in README with [shields.io](https://shields.io/).
      - Creating Cypress badge in README with [shields.io](https://shields.io/) and [cypress cloud](https://cloud.cypress.io/).

## Useful links
- Coverage badges `dev.to` article: [click here](https://dev.to/thejaredwilcurt/coverage-badge-with-github-actions-finally-59fa).
- Dynamic badges GitHub action by Simon Schneegans: [click here](https://github.com/Schneegans/dynamic-badges-action).
- Coverage badges personal gist: [click here](https://gist.github.com/odagora/be25252968fdd94ac6a731aec01b50dd).
- Jest coverage comment by Misha Kav: [click here](https://github.com/MishaKav/jest-coverage-comment).
## Author
- Website - [Daniel González](https://odagora.com)
