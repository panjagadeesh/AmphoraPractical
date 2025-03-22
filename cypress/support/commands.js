// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().should('have.property', 'document').its('readyState').should('eq', 'complete');
});

// Custom command to check if element is visible and clickable
Cypress.Commands.add('isVisibleAndClickable', (selector) => {
  cy.get(selector).should('be.visible').and('be.enabled');
});

// Custom command to wait for API response
Cypress.Commands.add('waitForApiResponse', (alias) => {
  cy.wait(alias).then((interception) => {
    expect(interception.response.statusCode).to.be.oneOf([200, 201, 204]);
  });
}); 