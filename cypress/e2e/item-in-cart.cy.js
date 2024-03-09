let itemPrice;
const taxRate = 0.0975;

beforeEach(() => {
  cy.visit('/')
    .get('[data-testid="menu"]').find('.price').first().invoke('text')
    .then((text) => {
      itemPrice= parseFloat(text.replace(/[^0-9.-]+/g, ""));
    })
    .get('[data-testid="menu"] button').first().click({ force: true })
})

describe('Add item to cart', () => {
  it('should add an item to the cart', () => {
    cy.get('[data-testid="menu"] button').first().should('have.class', 'in-cart')
      .get('[data-testid="cart-summary"] li').should('have.length', 1)
  })

  it('should update totals when an item is added to the cart', () => {
    cy.get('[data-testid="menu"]').find('.price').first().invoke('text')
      .then((text) => {
        itemPrice= parseFloat(text.replace(/[^0-9.-]+/g, ""));
      })
      .then(() => {
        // Calculate expected tax and total
        const expectedTax = itemPrice * taxRate;
        const expectedTotal = itemPrice + expectedTax;

        // Assert that the subtotal is equal to the item price
        cy.get('[data-testid="subtotal"]').invoke('text')
          .then((subTotalText) => {
            const subTotal = parseFloat(subTotalText.replace(/[^0-9.-]+/g, ""));
            expect(subTotal).to.equal(itemPrice);
          })

        // Calculate expected tax and total
        cy.get('[data-testid="tax"]').invoke('text')
          .then((taxText) => {
            const displayedTax = parseFloat(taxText.replace(/[^0-9.-]+/g, ""));
            expect(displayedTax).to.closeTo(expectedTax, 0.01);
          })

        // Retrieve and assert the displayed total value
        cy.get('[data-testid="total"]').invoke('text')
          .then((totalText) => {
            const displayedTotal = parseFloat(totalText.replace(/[^0-9.-]+/g, ""));
            expect(displayedTotal).to.closeTo(expectedTotal, 0.01);
          })
      })
  })
})

describe('Update item in cart', () => {
  it('should increase item quantity and cart total values', () => {
    cy.get('.increase').click()
      .then(() => {
          const newQuantity = 2;
          const expectedSubTotal = itemPrice * newQuantity;
          const expectedTax = expectedSubTotal * taxRate;
          const expectedTotal = expectedSubTotal + expectedTax;

          // Assert that the subtotal is equal to the item price
          cy.get('[data-testid="subtotal"]').invoke('text')
            .then((subTotalText) => {
              const subTotal = parseFloat(subTotalText.replace(/[^0-9.-]+/g, ""));
              expect(subTotal).to.equal(expectedSubTotal);
            })

          // Calculate expected tax and total
          cy.get('[data-testid="tax"]').invoke('text')
            .then((taxText) => {
              const displayedTax = parseFloat(taxText.replace(/[^0-9.-]+/g, ""));
              expect(displayedTax).to.closeTo(expectedTax, 0.01);
            })

            // Retrieve and assert the displayed total value
          cy.get('[data-testid="total"]').invoke('text')
            .then((totalText) => {
              const displayedTotal = parseFloat(totalText.replace(/[^0-9.-]+/g, ""));
              expect(displayedTotal).to.closeTo(expectedTotal, 0.01);
            })
        })
  })

  it('should decrease item quantity and cart total values', () => {
    cy.get('.decrease').click()
      .then(() => {
          const newQuantity = 0;
          const expectedSubTotal = itemPrice * newQuantity;
          const expectedTax = expectedSubTotal * taxRate;
          const expectedTotal = expectedSubTotal + expectedTax;

          // Assert that the subtotal is equal to the item price
          cy.get('[data-testid="subtotal"]').invoke('text')
            .then((subTotalText) => {
              const subTotal = parseFloat(subTotalText.replace(/[^0-9.-]+/g, ""));
              expect(subTotal).to.equal(expectedSubTotal);
            })

            // Calculate expected tax and total
          cy.get('[data-testid="tax"]').invoke('text')
            .then((taxText) => {
              const displayedTax = parseFloat(taxText.replace(/[^0-9.-]+/g, ""));
              expect(displayedTax).to.closeTo(expectedTax, 0.01);
            })

          // Retrieve and assert the displayed total value
          cy.get('[data-testid="total"]').invoke('text')
            .then((totalText) => {
              const displayedTotal = parseFloat(totalText.replace(/[^0-9.-]+/g, ""));
              expect(displayedTotal).to.closeTo(expectedTotal, 0.01);
            })
        })
  })
})

describe('Remove item from cart', () => {
  it('should remove an item from the cart', () => {
    cy.get('.decrease').click()
      .get('.remove').click({ force: true })
      .get('[data-testid="cart-summary"] li').should('have.length', 0)
      .get('[data-testid="menu"] button').first().should('not.have.class', 'in-cart')
  })

  it('should update totals when an item is removed from the cart', () => {
    cy.get('.decrease').click()
      .get('.remove').click({ force: true })
      .then(() => {
        cy.get('[data-testid="subtotal"]').invoke('text')
          .then((subTotalText) => {
            const subTotal = parseFloat(subTotalText.replace(/[^0-9.-]+/g, ""));
            expect(subTotal).to.equal(0);
          })
      })
  })
})

