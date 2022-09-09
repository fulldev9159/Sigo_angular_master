import { BucleApoCobra } from 'cypress/fixtures/testedCubicacion';

describe('Create Cubicacion', () => {
  it('should let enter to create cubicacion', () => {
    cy.viewport(1500, 1700);
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#crear-cubicacion-sidebar').click();
  });

  it('create BUCLE CUB', () => {
    cy.viewport(1500, 1700);
    const data = BucleApoCobra;

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

    cy.get('input[name="input-nombre-cubicacion"]').type('Cubicacion Bucle');
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
        cy._select_dropdown('#select-actividad', item.actividad);
      });
      item.tipos_servicio.forEach(tipo_servicio => {
        cy.get('input[name="input-nombre-cubicacion"]').click();
        cy.wait(50).then(() => {
          cy._select_dropdown(
            '#select-tipo-servicio',
            tipo_servicio.tipo_servicio
          );
        });

        tipo_servicio.servicios.forEach(servicio => {
          cy.get('input[name="input-nombre-cubicacion"]').click();
          cy.wait(150).then(() => {
            cy._select_dropdown('#select-servicio', servicio.nombre);
          });
          servicio.unidad_obras.forEach(uo => {
            cy.get('input[name="input-nombre-cubicacion"]').click();
            cy.wait(250).then(() => {
              cy._select_dropdown('#select-unidad-obra', uo.nombre);
              cy.get('input[name="input-nombre-cubicacion"]').click();
              cy.wait(400).then(() => {
                cy.get('#agregar-button').click();
              });
            });
          });
        });
      });
    });
  });

  it('cambiar cantidades', () => {
    cy.viewport(1500, 1700);
    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(1) > td:nth-child(4)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}4.53{enter}');

    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(1) > td:nth-child(11)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}10{enter}');

    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(3) > td:nth-child(11)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}5.24{enter}');

    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(4) > td:nth-child(4)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}100{enter}');

    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(3) > td:nth-child(4)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}105.70{enter}');

    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(8) > td:nth-child(4)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}501,1{enter}');

    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(14) > td:nth-child(11)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}9.4{enter}');

    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(15) > td:nth-child(4)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}430,2{enter}');

    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(16) > td:nth-child(4)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}2{enter}');

    cy.get(
      '.carrito-container> table > tbody > tr:nth-child(17) > td:nth-child(4)>p-inputnumber>span>input'
    )
      .clear()
      .type('{del}10{enter}');

    cy.get('button[id="crear-cubicacion"]').click();
  });
});
