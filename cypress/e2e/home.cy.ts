describe('Home Spec', () => {
  it('should display home', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy.login('mgestor1', 'asdasd');
  });

  
});
