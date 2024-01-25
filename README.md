# AdventofJS - Ecommerce component
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

## Author
- Website - [Daniel González](https://odagora.com)
