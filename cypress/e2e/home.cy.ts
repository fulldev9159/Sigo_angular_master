import { testedViewports } from 'cypress/fixtures/testedViewports';

describe('Home Spec', () => {
  // it('should display home', () => {
  //   cy.visit('http://localhost:4206/login/auth');
  //   cy._login('mgestor1', 'asdasd');
  //   cy._select_profile('Gestor/JP');
  // });

  testedViewports.forEach(vieport => {
    describe(`on ${vieport}`, () => {
      beforeEach(() => {
        cy.viewport(vieport);
        cy.visit('http://localhost:4206/login/auth');
        cy._login('mgestor1', 'asdasd');
        cy._select_profile('Gestor/JP');
      });

      it('in start display sidebar', () => {
        cy.get('.layout-container').should('exist');
        if (vieport === 'iphone-x' || vieport === 'ipad-2') {
          cy.get('.layout-sidebar').should('not.be.visible');
        }
        if (vieport === 'macbook-13' || vieport === 'macbook-16') {
          cy.get('.layout-sidebar').should('be.visible');
        }
      });

      it('in click togle display sidebar', () => {
        cy.get('.layout-container').should('exist');
        cy.get('#toggle').click();
        if (vieport === 'iphone-x' || vieport === 'ipad-2') {
          cy.get('.layout-sidebar').should('be.visible');
          cy.get('.layout-mask').click();
          cy.get('.layout-sidebar').should('not.be.visible');
        }
        if (vieport === 'macbook-13' || vieport === 'macbook-16') {
          cy.get('.layout-sidebar').should('not.be.visible');
          cy.get('#toggle').click();
          cy.get('.layout-sidebar').should('be.visible');
        }
      });
    });
  });
});
