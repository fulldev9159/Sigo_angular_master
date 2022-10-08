import { crearCubicacion } from 'cypress/fixtures/testedCubicacion';

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

        // cy.get('.carrito-container>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(5)
        //   .contains(servicio.unidad_obras[0].nombre.split('-')[0].trim());

        // cy.get('.carrito-container>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(6)
        //   .contains(servicio.unidad_obras[0].nombre.split('-')[1].trim());

        // cy.get('.carrito-container>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(7)
        //   .contains(servicio.actividad);

        // if (servicio.unidad_obras[0].nombre !== '0 - SIN UO') {
        //   cy.get('.carrito-container>table')
        //     .contains('td', servicio.nombre.split('-')[0].trim())
        //     .siblings()
        //     .eq(8)
        //     .contains(servicio.unidad_obras[0].cantidad);

        //   cy.get('.carrito-container>table')
        //     .contains('td', servicio.nombre.split('-')[0].trim())
        //     .siblings()
        //     .eq(9)
        //     .contains(servicio.unidad_obras[0].precio);

        //   cy.get('.carrito-container>table')
        //     .contains('td', servicio.nombre.split('-')[0].trim())
        //     .siblings()
        //     .eq(10)
        //     .contains(servicio.unidad_obras[0].total);
        // }

        servicio.unidad_obras.forEach((uo, index) => {
          // if (index !== 0) {
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
          // }
        });
      });

      cy.get('td[id="total-servicio-monto"]').contains(data.totalServicios);
      cy.get('td[id="total-uo-monto"]').contains(data.totalUOs);
      cy.get('td[id="total-cubicacion-monto"]').contains(data.total);

      cy.get('button.p-dialog-header-close').click();
    });
  });
});
