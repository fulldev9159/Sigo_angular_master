import { crearCubicacion } from 'cypress/fixtures/testedCubicacion';

describe('Listar Cubicaciones', () => {
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
          cy.get('table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(0)
            .contains(servicio.nombre.split('-')[1].trim());

          cy.get('table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(1)
            .contains(servicio.tipo_servicio);

          cy.get('table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(2)
            .contains(servicio.cantidad);

          cy.get('table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(3)
            .contains(servicio.precio);

          cy.get('table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(4)
            .contains(servicio.total);

          cy.get('table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(5)
            .contains(servicio.unidad_obras[0].nombre.split('-')[0].trim());

          cy.get('table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(6)
            .contains(servicio.unidad_obras[0].nombre.split('-')[1].trim());

          cy.get('table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(7)
            .contains(servicio.actividad);

          if (servicio.unidad_obras[0].nombre !== '0 - SIN UO') {
            cy.get('table')
              .contains('td', servicio.nombre.split('-')[0].trim())
              .siblings()
              .eq(8)
              .contains(servicio.unidad_obras[0].cantidad);

            cy.get('table')
              .contains('td', servicio.nombre.split('-')[0].trim())
              .siblings()
              .eq(9)
              .contains(servicio.unidad_obras[0].precio);

            cy.get('table')
              .contains('td', servicio.nombre.split('-')[0].trim())
              .siblings()
              .eq(10)
              .contains(servicio.unidad_obras[0].total);
          }

          servicio.unidad_obras.forEach((uo, index) => {
            if (index !== 0) {
              cy.get('table')
                .contains('td', uo.nombre.split('-')[0].trim())
                .siblings()
                .eq(0)
                .contains(uo.nombre.split('-')[1].trim());

              cy.get('table')
                .contains('td', uo.nombre.split('-')[0].trim())
                .siblings()
                .eq(1)
                .contains(servicio.actividad);

              if (uo.nombre !== '0 - SIN UO') {
                cy.get('table')
                  .contains('td', uo.nombre.split('-')[0].trim())
                  .siblings()
                  .eq(2)
                  .contains(uo.cantidad);

                cy.get('table')
                  .contains('td', uo.nombre.split('-')[0].trim())
                  .siblings()
                  .eq(3)
                  .contains(uo.precio);

                cy.get('table')
                  .contains('td', uo.nombre.split('-')[0].trim())
                  .siblings()
                  .eq(4)
                  .contains(uo.total);
              }
            }
          });
        });
      });

      cy.get('td[class="total-servicio-monto"]').contains(data.totalServicios);
      cy.get('td[class="total-uo-monto"]').contains(data.totalUOs);
      cy.get('td[class="total-cubicacion-monto"]').contains(data.total);

      cy.get('button.p-dialog-header-close').click();
    });
  });
});
