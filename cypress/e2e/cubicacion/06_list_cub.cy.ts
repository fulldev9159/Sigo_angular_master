import { BucleApoCobra } from 'cypress/fixtures/testedCubicacion';

describe('Listar Cubicaciones', () => {
  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#listar-cubicacion-sidebar').click();
  });

  it('Debe desplegar 4 cubicaciones', () => {
    cy.viewport(1500, 700);
    // cy.get('tbody').find('tr').should('have.length', 4);
    cy._filter_table('filter-nombre-cubicacion', 'Cubicacion Bucle');
    cy.get('tbody').find('tr').should('have.length', 1);
  });

  it('Debe desplegar detalles de la cubicacion "Cubicacion Bucle"', () => {
    cy.get('button[id="button-detalle-cubicacion"]').click();

    cy.get('.carrito-container> table > tbody > tr:nth-child(1) > td')
      .eq(0)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].nombre
          .split('-')[0]
          .trim()
      );
    cy.get('.carrito-container> table > tbody > tr:nth-child(1) > td')
      .eq(1)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].nombre
          .split('-')[1]
          .trim()
      );
    cy.get('.carrito-container> table > tbody > tr:nth-child(1) > td')
      .eq(2)
      .contains('Cables');
  });
});
