describe('My First Test', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:4201/app/dashboard');
  });
  it('Does not do much!', () => {
    cy.get('#text').type('mgestor1');
    cy.get('#password').type('M0v15tar.{enter}');
    expect(true).to.equal(true);
  });
});
