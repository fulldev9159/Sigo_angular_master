describe('My First Test', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:4201/auth/login');
  });
  it('Access Login', () => {
    cy.get('#text').should('be.enabled');
    cy.get('#password').should('be.enabled');
    cy.get('#login').should('be.disabled');
    cy.get('#text').type('mgestor1');
    cy.get('#password').type('M0v15tar.{enter}');

    cy.get(' app-select > select').select('Gestor/JP');
    cy.get('#login').should('be.enabled');
    cy.get('#login').click();
    // expect(location.href).to.eq('http://localhost:4201/auth/perfil-select');
  });
});
