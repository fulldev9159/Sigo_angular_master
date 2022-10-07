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
    cy.viewport(1500, 1700);
    const data = crearCubicacion;
    // FORMULARIO
    cy.get('input[name="input-nombre-cubicacion"]').type(
      'Cubicacion Bucle Cypress'
    );
    cy._select_dropdown('#select-tipo-cubicacion', 'Full');
    cy._select_dropdown('#select-contrato_marco', 'BUCLE');
    cy.get('input[name="input-direccion-desde"]').type('a');
    cy.get('input[name="input-altura-desde"]').type('a');
    cy.get('input[name="input-direccion-hasta"]').type('a');
    cy.get('input[name="input-altura-hasta"]').type('a');
    cy.get('textarea[id="input-descripcion"]').type(
      'Una cubicación para realizar pruebas cypress'
    );
    cy._select_dropdown('#select-agencia', 'APOQUINDO');
    cy._select_dropdown(
      '#select-proveedor',
      '330000659 - COBRA CHILE SERVICIOS S.A.'
    );

    data.items.forEach(item => {
      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy._select_dropdown('#select-actividad', item.actividad.toUpperCase());

      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy._select_dropdown(
        '#select-tipo-servicio',
        item.tipo_servicio.toUpperCase()
      );
      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy._select_dropdown('#select-servicio', item.nombre);

      item.unidad_obras.forEach((uo, index) => {
        cy.get('input[name="input-nombre-cubicacion"]').click();
        cy._select_dropdown('#select-unidad-obra', uo.nombre);
        cy.get('input[name="input-nombre-cubicacion"]').click();
        cy.get('#agregar-button').click();

        // let column = index === 0 ? 9 : 2;
        if (uo.nombre.split('-')[1].trim() !== 'SIN UO') {
          cy.get('table')
            .contains('td', uo.nombre.split('-')[1].trim())
            .siblings()
            .eq(2)
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
