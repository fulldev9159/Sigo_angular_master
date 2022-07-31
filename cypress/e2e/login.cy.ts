import { testedViewports } from 'cypress/fixtures/testedViewports';

describe('login spec', () => {
  it('Home page should redirect to login', () => {
    cy.visit('http://localhost:4206/home');
    cy.location('pathname').should('eq', '/login/auth');
  });

  it('perfil select page should redirect to login', () => {
    localStorage.clear();
    cy.visit('http://localhost:4206/login/perfil-select');
    cy.location('pathname').should('eq', '/login/auth');
  });

  testedViewports.forEach(vieport => {
    describe(`on ${vieport}`, () => {
      beforeEach(() => {
        cy.viewport(vieport);
        cy.visit('http://localhost:4206/login/auth');
      });

      it('should display sigo titulo', () => {
        cy.get('.titulo-principal').contains('SIGO');
      });

      it('should display input username', () => {
        cy.get('input[name="username"]').should('exist');
      });

      it('should display input password', () => {
        cy.get('input[name="password"]').should('exist');
      });

      it('should display button login', () => {
        cy.get('#login-button').should('exist');
      });
    });
  });

  it('should display error input if empty username', () => {
    cy.get('input[name="username"]').type('masdasdasd');
    cy.get('input[name="username"]').clear();
    cy.get('input[name="username"]+label+zwc-input-alert>small').contains(
      'Este campo es requerido'
    );
  });

  it('should display error input if empty password', () => {
    cy.get('input[name="password"]').type('masdasdasd');
    cy.get('input[name="password"]').clear();
    cy.get('input[name="password"]+label+zwc-input-alert>small').contains(
      'Este campo es requerido'
    );
  });

  it('should display errr message for user doesnt exist and keep in login page', () => {
    cy.get('input[name="username"]').type('masdasdasd');
    cy.get('input[name="password"]').type('sdasd');
    cy.get('#login-button').click();
    cy.get('.snackbar-container').should('exist');
    cy.location('pathname').should('eq', '/login/auth');
  });

  it('should redirect to perfil select page', () => {
    cy.get('input[name="username"]').clear().type('mgestor1');
    cy.get('input[name="password"]').clear().type('sdasd');
    cy.get('#login-button').click();
    cy.location('pathname').should('eq', '/login/perfil-select');
  });

  it('should redirect to perfil select if user access to login page again after success login', () => {
    localStorage.clear();
    cy.visit('http://localhost:4206/login/auth');
    cy.get('input[name="username"]').clear().type('mgestor1');
    cy.get('input[name="password"]').clear().type('sdasd');
    cy.get('#login-button').click();
    cy.wait(1000);
    cy.visit('http://localhost:4206/login/auth');
    cy.location('pathname').should('eq', '/login/perfil-select');
  });
});
