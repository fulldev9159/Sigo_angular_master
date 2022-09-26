import { crearCubicacion } from 'cypress/fixtures/testedCubicacion';

describe('Create Cubicacion', () => {
  it('should let enter to create cubicacion', () => {
    cy.viewport(1500, 1700);
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-create-cub"]').click();
  });

  it('create BUCLE CUB', () => {
    const data = crearCubicacion;

    // INTERCEPTORS
    cy.intercept('POST', '/cubicacion/agencias_from_contrato/get').as(
      'HTTPRESPONSE-AGENCIA'
    );
    cy.intercept(
      'POST',
      '/cubicacion/proveedores_from_agencia_contrato/get'
    ).as('HTTPRESPONSE-PROVEEDORES');

    cy.intercept(
      'POST',
      '/cubicacion/actividad_from_cmarco_has_proveedor/get'
    ).as('HTTPRESPONSE-ACTIVIDAD');

    cy.intercept('POST', '/cubicacion/tipo_servicio/get').as(
      'HTTPRESPONSE-TIPO-SERVICIO'
    );

    cy.intercept('POST', 'cubicacion/combo_servicios/get').as(
      'HTTPRESPONSE-SERVICIO'
    );

    cy.intercept('POST', '/cubicacion/unidades_obra_from_servicio/get').as(
      'HTTPRESPONSE-UNIDAD-OBRA'
    );
    cy.intercept('POST', '/cubicacion/datos_unidad_obra_material/get').as(
      'HTTPRESPONSE-UNIDAD-OBRA-DETALLE'
    );

    // FORMULARIO

    cy.get('input[name="input-nombre-cubicacion"]').type(
      'Cubicacion Bucle Cypress'
    );
    cy.get('#select-tipo-cubicacion')
      .click()
      .contains('ul li > span', 'Full')
      .click();
    cy._select_dropdown('#select-contrato_marco', 'BUCLE');
    cy.get('input[name="input-direccion-desde"]').type('a');
    cy.get('input[name="input-altura-desde"]').type('a');
    cy.get('input[name="input-direccion-hasta"]').type('a');
    cy.get('input[name="input-altura-hasta"]').type('a');
    cy.get('textarea[id="input-descripcion"]').type(
      'Una cubicación para realizar pruebas cypress'
    );
    cy.wait('@HTTPRESPONSE-AGENCIA').then(() => {
      cy._select_dropdown('#select-agencia', 'APOQUINDO');
    });
    cy.wait('@HTTPRESPONSE-PROVEEDORES').then(() => {
      cy._select_dropdown(
        '#select-proveedor',
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
    });

    data.items.forEach(item => {
      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy.wait(150).then(() => {
        cy._select_dropdown('#select-actividad', item.actividad.toUpperCase());
      });
      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy.wait(150).then(() => {
        cy._select_dropdown(
          '#select-tipo-servicio',
          item.tipo_servicio.toUpperCase()
        );
      });
      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy.wait(150).then(() => {
        cy._select_dropdown('#select-servicio', item.nombre);
      });
      item.unidad_obras.forEach((uo, index) => {
        cy.get('input[name="input-nombre-cubicacion"]').click();
        cy.wait(250).then(() => {
          cy._select_dropdown('#select-unidad-obra', uo.nombre);
          cy.get('input[name="input-nombre-cubicacion"]').click();
          cy.wait(400).then(() => {
            cy.get('#agregar-button').click();
          });
        });

        let column = index === 0 ? 9 : 2;
        if (uo.nombre.split('-')[1].trim() !== 'SIN UO') {
          cy.get('table')
            .contains('td', uo.nombre.split('-')[1].trim())
            .siblings()
            .eq(column)
            .find('p-inputnumber>span>input')
            .clear()
            .type(`${uo.cantidad}{enter}`);
        }
      });
      cy.get('table')
        .contains('td', item.nombre.split('-')[1].trim())
        .siblings()
        .eq(2)
        .find('p-inputnumber>span>input')
        .clear()
        .type(`${item.cantidad}{enter}`);
    });

    cy.get('button[id="crear-cubicacion"]').click();
  });
});
