import { crearCubicacion } from 'cypress/fixtures/testedCubicacionBUCLE';
import { crearCubicacionFIJA } from 'cypress/fixtures/testedCubicacionFIJO';
import { crearCubicacionMOVIL } from 'cypress/fixtures/testedCubicacionMOVIL';
import { crearCubicacionORDINARIO } from 'cypress/fixtures/testedCubicacionOrdinario';

describe('Listar Cubicaciones', () => {
  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-list-cub"]').click();
  });

  it('Debe desplegar 4 cubicaciones', () => {
    cy.viewport(1500, 700);
    // cy.get('tbody').find('tr').should('have.length', 4);
    cy._filter_table('filter-nombre-cubicacion', 'Cubicacion Bucle Cypress');
    cy.get('tbody').find('tr').should('have.length', 1);
  });

  it('Debe desplegar detalles de la cubicacion "Cubicacion Bucle"', () => {
    cy.intercept('POST', '/cubicacion/detalle/get2').as(
      'HTTPRESPONSE-GET-DETALLE-CUBICACION'
    );

    cy.get('button[id="button-detalle-cubicacion"]').click();
    const data = crearCubicacion;

    cy.wait('@HTTPRESPONSE-GET-DETALLE-CUBICACION').then(() => {
      cy._check_table_servicio_view(data);

      cy.get('td[id="total-servicio-monto"]').contains(data.totalServicios);
      cy.get('td[id="total-uo-monto"]').contains(data.totalUOs);
      cy.get('td[id="total-cubicacion-monto"]').contains(data.total);

      cy.get('button.p-dialog-header-close').click();
      cy.wait(100);
    });
  });

  it('Debe desplegar detalles de la cubicacion "Cubicacion Fijo"', () => {
    cy.intercept('POST', '/cubicacion/detalle/get2').as(
      'HTTPRESPONSE-GET-DETALLE-CUBICACION'
    );

    cy._filter_table('filter-nombre-cubicacion', 'Cubicacion FIJA Cypress');
    cy.get('tbody').find('tr').should('have.length', 1);

    cy.get('button[id="button-detalle-cubicacion"]').click();
    const data = crearCubicacionFIJA;

    cy.wait('@HTTPRESPONSE-GET-DETALLE-CUBICACION').then(() => {
      cy._check_table_servicio_view(data);

      cy.get('td[id="total-servicio-monto"]').contains(data.totalServicios);
      cy.get('td[id="total-uo-monto"]').contains(data.totalUOs);
      cy.get('td[id="total-cubicacion-monto"]').contains(data.total);

      cy.get('button.p-dialog-header-close').click();
    });
  });

  it('Debe desplegar detalles de la cubicacion "Cubicacion Ordinario"', () => {
    cy.intercept('POST', '/cubicacion/detalle/get2').as(
      'HTTPRESPONSE-GET-DETALLE-CUBICACION'
    );

    cy._filter_table(
      'filter-nombre-cubicacion',
      'Cubicacion ORDINARIO Cypress'
    );
    cy.get('tbody').find('tr').should('have.length', 1);

    cy.get('button[id="button-detalle-cubicacion"]').click();
    const data = crearCubicacionORDINARIO;

    cy.wait('@HTTPRESPONSE-GET-DETALLE-CUBICACION').then(() => {
      cy._check_table_servicio_view(data);

      cy.get('td[id="total-servicio-monto"]').contains(data.totalServicios);
      cy.get('td[id="total-uo-monto"]').contains(data.totalUOs);
      cy.get('td[id="total-cubicacion-monto"]').contains(data.total);

      cy.get('button.p-dialog-header-close').click();
    });
  });

  it('Debe desplegar detalles de la cubicacion "Cubicacion Movil"', () => {
    cy.intercept('POST', '/cubicacion/detalle/get2').as(
      'HTTPRESPONSE-GET-DETALLE-CUBICACION'
    );

    cy._filter_table('filter-nombre-cubicacion', 'Cubicacion MOVIL Cypress');
    cy.get('tbody').find('tr').should('have.length', 1);

    cy.get('button[id="button-detalle-cubicacion"]').click();
    const data = crearCubicacionMOVIL;

    cy.wait('@HTTPRESPONSE-GET-DETALLE-CUBICACION').then(() => {
      cy._check_table_servicio_view(data);

      cy.get('td[id="total-servicio-monto"]').contains(data.totalServicios);
      cy.get('td[id="total-uo-monto"]').contains(data.totalUOs);
      cy.get('td[id="total-cubicacion-monto"]').contains(data.total);

      cy.get('button.p-dialog-header-close').click();
    });
  });
});
