import { testedViewports } from 'cypress/fixtures/testedViewports';

describe('02_PERFIL_SPEC', () => {
  describe('Perfil Select responsive spec', () => {
    it('should display perfil select', () => {
      cy.visit('http://localhost:4206/login/auth');
      cy._login('mgestor1', 'asas');
    });
    testedViewports.forEach(vieport => {
      it(`should display sigo titulo,subtitulo, dropdown, perfil select button and logout  on ${vieport}`, () => {
        cy.viewport(vieport);
        cy.get('.titulo-principal').contains('SIGO');
        cy.get('.perfil-select-titulo').contains('Perfil');
        cy.get('p-dropdown').should('be.visible');
        cy.get('#perfil-select-button').should('be.visible');
        cy.get('#logout').should('be.visible');
      });
    });
  });

  describe('Perfil Select form', () => {
    it(
      'should redirect to login auth if press logouth',
      {
        retries: 2,
      },
      () => {
        cy.visit('http://localhost:4206/login/auth');
        cy._login('mgestor1', 'asdasd');
        cy.get('#logout').click();
        cy.location('pathname').should('eq', '/login/auth');
      }
    );

    it('button select should be disabled', () => {
      cy.visit('http://localhost:4206/login/auth');
      cy._login('mgestor1', 'asdasd');
      cy.get('#perfil-select-button').should('be.disabled');
    });

    it(
      'if touch select and not select perfil should display requiered message',
      {
        retries: 2,
      },
      () => {
        cy.visit('http://localhost:4206/login/auth');
        cy._login('mgestor1', 'asdasd');
        cy.get('#perfil-select-button').should('be.disabled');
        cy.get('p-dropdown').click();
        cy.get('.perfil-select-titulo').click();
        cy.get('#input-dropdown+zwc-input-alert>small').contains(
          'Este campo es requerido'
        );
      }
    );

    it(
      'should redirect to home if select perfil',
      {
        retries: 2,
      },
      () => {
        cy.get('p-dropdown').click();
        cy.get('.p-ripple').click();
        cy.get('#perfil-select-button').click();
        cy.location('pathname').should('eq', '/home');
        cy.get('#logout').click();
      }
    );

    it(
      'should display errr message for user doesnt exist and keep in login page',
      {
        retries: 2,
      },
      () => {
        cy.visit('http://localhost:4206/login/auth');
        cy.get('input[name="username"]').clear().type('asdas');
        cy.get('input[name="password"]').clear().type('password');
        cy.get('#login-button').click();
        cy.get('.snackbar-container').should('exist');
      }
    );
  });
});
