describe('List', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('list text', () => {
    cy.get('span').contains('List').should('exist');
  });
});
