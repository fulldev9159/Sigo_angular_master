import { crearCubicacion } from 'cypress/fixtures/testedCubicacionBUCLE';

describe('Clonar Cubicaciones', () => {
  beforeEach(() => {
    cy.viewport(1500, 700);
  });

  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-list-cub"]').click();
  });

  it('clonar cubicacion', () => {
    const data = crearCubicacion;

    cy.intercept('POST', '/cubicacion/cubicacion/save').as(
      'HTTPRESPONSE-CUBICACION-SAVE'
    );
    cy.intercept('POST', '/cubicacion/detalle/get2').as(
      'HTTPRESPONSE-GET-DETALLE-CUBICACION'
    );
    cy.get(`input[name='filter-nombre-cubicacion']`).clear();
    cy._filter_table('filter-nombre-cubicacion', 'Cubicacion Bucle Cypress');
    cy.get('tbody').find('tr').should('have.length', 1);
    cy.get('button[id="button-clonar-cubicacion"]').click();

    cy.get('input[name="input-nombre-clone-cubicacion"]')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('Cubicacion Bucle Cypress');
      });

    cy._check_input('input[name="input-nombre-clone-cubicacion"]', 'required');

    cy.get('input[name="input-nombre-clone-cubicacion"]').clear();
    cy.get('input[name="input-nombre-clone-cubicacion"]').type(
      'Cloned Cubicacion Bucle Cypress'
    );

    cy.get('button[id="clonar-cubicacion"]').click();
    cy.wait(2500);
    cy.wait('@HTTPRESPONSE-CUBICACION-SAVE').then(() => {
      cy.get(`input[name='filter-nombre-cubicacion']`).clear();
      cy._filter_table(
        'filter-nombre-cubicacion',
        'Cloned Cubicacion Bucle Cypress'
      );
      cy.get('tbody').find('tr').should('have.length', 1);

      cy.get('button[id="button-detalle-cubicacion"]').click();

      cy.wait('@HTTPRESPONSE-GET-DETALLE-CUBICACION').then(() => {
        crearCubicacion.items.forEach(servicio => {
          cy.get('.carrito-container>table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(0)
            .contains(servicio.nombre.split('-')[1].trim());

          cy.get('.carrito-container>table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(1)
            .contains(servicio.tipo_servicio);

          cy.get('.carrito-container>table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(2)
            .contains(servicio.cantidad);

          cy.get('.carrito-container>table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(3)
            .contains(servicio.precio);

          cy.get('.carrito-container>table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(4)
            .contains(servicio.total);

          servicio.unidad_obras.forEach((uo, index) => {
            cy.get('.carrito-container>table')
              .contains(
                'td',
                new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
              )
              .siblings()
              .eq(0)
              .contains(uo.nombre.split('-')[1].trim());

            cy.get('.carrito-container>table')
              .contains(
                'td',
                new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
              )
              .siblings()
              .eq(1)
              .contains(servicio.actividad);

            if (uo.nombre !== '0 - SIN UO') {
              cy.get('.carrito-container>table')
                .contains(
                  'td',
                  new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
                )
                .siblings()
                .eq(2)
                .contains(uo.cantidad);

              cy.get('.carrito-container>table')
                .contains(
                  'td',
                  new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
                )
                .siblings()
                .eq(3)
                .contains(uo.precio);

              cy.get('.carrito-container>table')
                .contains(
                  'td',
                  new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
                )
                .siblings()
                .eq(4)
                .contains(uo.total);
            }
          });
        });
      });

      cy.get('td[id="total-servicio-monto"]').contains(data.totalServicios, {
        timeout: 10000,
      });
      cy.get('td[id="total-uo-monto"]').contains(data.totalUOs, {
        timeout: 10000,
      });
      cy.get('td[id="total-cubicacion-monto"]').contains(data.total, {
        timeout: 10000,
      });

      cy.get('button.p-dialog-header-close').click();
    });
  });
});
