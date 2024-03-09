describe('Initial state', () => {
  it('should display the menu items and an empty cart message', () => {
    cy.visit('/')
      .get('[data-testid="menu"]').should('exist')
      .get('[data-testid="empty-cart-message"]').should('exist')
      .get('[data-testid="empty-cart-message"]').should('contain', 'Your cart is empty.')
  })
})

