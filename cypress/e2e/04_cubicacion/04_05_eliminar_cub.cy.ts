import { crearCubicacion } from 'cypress/fixtures/testedCubicacion';

describe('Listar Cubicaciones', () => {
  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-list-cub"]').click();
  });

  it('eliminar Cubicacion', () => {
    cy.get(`input[name='filter-nombre-cubicacion']`).clear();
    cy._filter_table(
      'filter-nombre-cubicacion',
      'Cloned Cubicacion Bucle Cypress'
    );
    cy.get('tbody').find('tr').should('have.length', 1);
    cy.get('button[id="button-eliminar-cubicacion"]').click();

    cy.get('#mensaje-confirmacion').contains(
      '¿Está seguro que desea eliminar esta cubicación ID:8?'
    );
    cy.get('button[id="button-confirmar"]').click();
    cy.wait(1);
    cy.get(`input[name='filter-nombre-cubicacion']`).clear();
    cy._filter_table(
      'filter-nombre-cubicacion',
      'Cloned Cubicacion Bucle Cypress'
    );
    cy.get('tbody').find('tr').should('have.length', 0);
  });
});
