let firstItemPrice, secondItemPrice;
const taxRate = 0.0975;

beforeEach(() => {
  cy.visit('/')
    .get('[data-testid="menu"]').find('.price')
    .then((prices) => {
      firstItemPrice = parseFloat(prices[0].textContent.replace(/[^0-9.-]+/g, ""));
      secondItemPrice = parseFloat(prices[1].textContent.replace(/[^0-9.-]+/g, ""));
    })
    .get('[data-testid="menu"] button').eq(0).click({ force: true })
    .get('[data-testid="menu"] button').eq(1).click({ force: true })
});

describe('Add multiple items in cart', () => {
  it('should add multiple different items to cart', () => {
    cy.get('[data-testid="menu"] button').eq(0).should('have.class', 'in-cart')
      .get('[data-testid="menu"] button').eq(1).should('have.class', 'in-cart')
      .get('[data-testid="cart-summary"] li').should('have.length', 2)
  })

  it('should update the cart totals correctly', () => {
    // Calculate expected values
    const expectedSubTotal = firstItemPrice + secondItemPrice;
    const expectedTax = expectedSubTotal * taxRate;
    const expectedTotal = expectedSubTotal + expectedTax;

    // Assert that the subtotal is equal to the item price
    cy.get('[data-testid="subtotal"]').invoke('text')
      .then((subTotalText) => {
        const subTotal = parseFloat(subTotalText.replace(/[^0-9.-]+/g, ""));
        expect(subTotal).to.equal(expectedSubTotal);
      })

    // Assert that the tax is equal to the expected tax
    cy.get('[data-testid="tax"]').invoke('text')
      .then((taxText) => {
        const tax = parseFloat(taxText.replace(/[^0-9.-]+/g, ""));
        expect(tax).to.closeTo(expectedTax, 0.01);
      })

    // Assert that the total is equal to the expected total
    cy.get('[data-testid="total"]').invoke('text')
      .then((totalText) => {
        const total = parseFloat(totalText.replace(/[^0-9.-]+/g, ""));
        expect(total).to.closeTo(expectedTotal, 0.01);
      })
  })
})

describe('Delete one of multiple items in cart', () => {
  it('should remove an item from the cart', () => {
    cy.get('.decrease').eq(1).click()
      .get('.remove').eq(1).click()
      .get('[data-testid="menu"] button').eq(0).should('have.class', 'in-cart')
      .get('[data-testid="menu"] button').eq(1).should('not.have.class', 'in-cart')
      .get('[data-testid="cart-summary"] li').should('have.length', 1)
  })

  it('should update the cart totals correctly', () => {
    const expectedSubTotal = firstItemPrice;
    const expectedTax = expectedSubTotal * taxRate;
    const expectedTotal = expectedSubTotal + expectedTax;

    cy.get('.decrease').eq(1).click()
      .get('.remove').eq(1).click()
      .then(() => {
        // Assert that the subtotal is equal to the first item price
        cy.get('[data-testid="subtotal"]').invoke('text')
          .then((subTotalText) => {
            const subTotal = parseFloat(subTotalText.replace(/[^0-9.-]+/g, ""));
            expect(subTotal).to.equal(expectedSubTotal);
          })

        // Assert that the tax is equal to the expected tax
        cy.get('[data-testid="tax"]').invoke('text')
          .then((taxText) => {
            const tax = parseFloat(taxText.replace(/[^0-9.-]+/g, ""));
            expect(tax).to.closeTo(expectedTax, 0.01);
          })

        // Assert that the total is equal to the expected total
        cy.get('[data-testid="total"]').invoke('text')
          .then((totalText) => {
            const total = parseFloat(totalText.replace(/[^0-9.-]+/g, ""));
            expect(total).to.closeTo(expectedTotal, 0.01);
          })
      })
  })
})

