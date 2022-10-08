import {
  crearCubicacion,
  CubicacionEditada,
} from 'cypress/fixtures/testedCubicacion';

let w = 1900;
let h = 1200;

describe('Editar cubicacion', () => {
  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-list-cub"]').click();
  });

  it('Debe desplegar 4 cubicaciones', () => {
    cy.viewport(w, h);
    // cy.get('tbody').find('tr').should('have.length', 4);
    cy._filter_table('filter-nombre-cubicacion', 'Cubicacion Bucle Cypress');
    cy.get('tbody').find('tr').should('have.length', 1);
  });

  it('Debe precargar los datos correspondientes', () => {
    cy.viewport(w, h);
    const data = crearCubicacion;
    cy.get('button[id="button-editar-cubicacion"]').click();
    cy.get('input[name="input-nombre-cubicacion"]')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('Cubicacion Bucle Cypress');
      });
    cy.wait(1000);
    cy.get('#select-tipo-cubicacion>.p-dropdown>span').contains('Full');
    cy.get('#select-contrato_marco>.p-dropdown>span').contains('BUCLE');
    cy.wait(1000).then(() => {
      cy.get('#select-agencia>.p-dropdown>span').contains('APOQUINDO');
    });
    cy.wait(1000).then(() => {
      cy.get('#select-proveedor>.p-dropdown>span').contains(
        '330000659 - COBRA CHILE SERVICIOS S.A.'
      );
    });

    cy.get('input[name="input-direccion-desde"]')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('a');
      });
    cy.get('input[name="input-altura-desde"]')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('a');
      });
    cy.get('input[name="input-direccion-hasta"]')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('a');
      });
    cy.get('input[name="input-altura-hasta"]')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('a');
      });
    cy.get('textarea[id="input-descripcion"]')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('Una cubicación para realizar pruebas cypress');
      });

    cy._check_table_servicio_input(crearCubicacion);

    // crearCubicacion.items.forEach(servicio => {
    //   cy.get('.carrito-container>table')
    //     .contains('td', servicio.nombre.split('-')[0].trim())
    //     .siblings()
    //     .eq(0)
    //     .contains(servicio.nombre.split('-')[1].trim());

    //   cy.get('.carrito-container>table')
    //     .contains('td', servicio.nombre.split('-')[0].trim())
    //     .siblings()
    //     .eq(1)
    //     .contains(servicio.tipo_servicio);

    //   cy.get('.carrito-container>table')
    //     .contains('td', servicio.nombre.split('-')[0].trim())
    //     .siblings()
    //     .eq(2)
    //     .find('p-inputnumber>span>input')
    //     .invoke('val')
    //     .then(val => {
    //       expect(val).to.eql(
    //         servicio.cantidad.split(',')[1] === undefined
    //           ? servicio.cantidad + ',00'
    //           : +servicio.cantidad.split(',')[1] > 9
    //           ? servicio.cantidad
    //           : servicio.cantidad + 0
    //       );
    //     });

    //   cy.get('.carrito-container>table')
    //     .contains('td', servicio.nombre.split('-')[0].trim())
    //     .siblings()
    //     .eq(3)
    //     .contains(servicio.precio);

    //   cy.get('.carrito-container>table')
    //     .contains('td', servicio.nombre.split('-')[0].trim())
    //     .siblings()
    //     .eq(4)
    //     .contains(servicio.total);

    //   servicio.unidad_obras.forEach((uo, index) => {
    //     // if (index !== 0) {
    //     cy.get('.carrito-container>table')
    //       .contains(
    //         'td',
    //         new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
    //       )
    //       .siblings()
    //       .eq(0)
    //       .contains(uo.nombre.split('-')[1].trim());

    //     cy.get('.carrito-container>table')
    //       .contains(
    //         'td',
    //         new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
    //       )
    //       .siblings()
    //       .eq(1)
    //       .contains(servicio.actividad);

    //     if (uo.nombre !== '0 - SIN UO') {
    //       cy.get('.carrito-container>table')
    //         .contains(
    //           'td',
    //           new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
    //         )
    //         .siblings()
    //         .eq(2)
    //         .find('p-inputnumber>span>input')
    //         .invoke('val')
    //         .then(val => {
    //           expect(val).to.eql(
    //             uo.cantidad.split(',')[1] === undefined
    //               ? uo.cantidad + ',00'
    //               : +uo.cantidad.split(',')[1] > 9
    //               ? uo.cantidad
    //               : uo.cantidad + 0
    //           );
    //         });

    //       cy.get('.carrito-container>table')
    //         .contains(
    //           'td',
    //           new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
    //         )
    //         .siblings()
    //         .eq(3)
    //         .contains(uo.precio);

    //       cy.get('.carrito-container>table')
    //         .contains(
    //           'td',
    //           new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
    //         )
    //         .siblings()
    //         .eq(4)
    //         .contains(uo.total);
    //     }
    //     // }
    //   });
    //   // }
    // });

    cy.get('td[id="total-servicio-monto"]').contains(data.totalServicios);
    cy.get('td[id="total-uo-monto"]').contains(data.totalUOs);
    cy.get('td[id="total-cubicacion-monto"]').contains(data.total);
  });

  it('Realizar cambios', () => {
    cy.viewport(w, h);
    const data = crearCubicacion;
    // CAMBIAR FORMULARIO
    cy.get('input[name="input-nombre-cubicacion"]')
      .clear()
      .type('Cubicacion Bucle Cypress Editada');
    cy.get('input[name="input-direccion-desde"]')
      .clear()
      .type('direccion editada');
    cy.get('input[name="input-altura-desde"]')
      .clear()
      .type('direccion editada');
    cy.get('input[name="input-direccion-hasta"]')
      .clear()
      .type('direccion editada');
    cy.get('input[name="input-altura-hasta"]')
      .clear()
      .type('direccion editada');

    // CAMBIAR CARRITO
    // ELIMINAR EL SERVICIO J456 Y LA UNIDAD OBRA H001
    cy.get('.carrito-container>table')
      .contains('td', 'J456')
      .siblings()
      .eq(5)
      .find('button')
      .click();

    cy.get('.carrito-container>table')
      .contains('td', 'H001')
      .siblings()
      .eq(5)
      .find('button')
      .click();

    // CAMBIAR CANTIDAD J451 A 15
    cy._change_cantidad_servicio('J451', '15');
    // UO D012 A 14
    cy._change_cantidad_uo(2, 'D012', '14');
    // UO C926 A 150,37
    cy._change_cantidad_uo(2, 'C926', '150,37');
    // H006 A 9
    cy._change_cantidad_uo(2, 'H006', '9');
    // H002 A 150
    cy._change_cantidad_uo(2, 'H002', '150');

    // AGREGAR J726
    cy._add_service_carrito(
      'FIBRA OPTICA',
      'LINEAS',
      'J726 - INST. REPARTIDOR MURAL, 1 VERTICAL, TIPO 2/3 VERTICALES',
      '0 - SIN UO'
    );
    cy._change_cantidad_servicio('J726', '15');
    // AGREGAR J730
    cy._add_service_carrito(
      'FIBRA OPTICA',
      'LINEAS',
      'J730 - INST. ESCALERILLA SOPORTE',
      'H134 - ESCALERILLA PC TIPO NEC 200*32'
    );
    cy._change_cantidad_servicio('J730', '16');
    cy._change_cantidad_uo(2, 'H134', '26');

    // AGREGAR C105 - CABLE PS 600-26 SUB. A J101
    cy._add_service_carrito(
      'MATRIZ',
      'LINEAS',
      'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      'C105 - CABLE PS 600-26 SUB.'
    );
    cy._change_cantidad_uo(2, 'C105', '80,32');

    // VERIFICAR CARRITO
    let dataEdit = CubicacionEditada;
    cy._check_table_servicio_input(dataEdit);

    // GUARDAR
    cy.get('button[id="editar-cubicacion"]').click();

    cy.wait(700);
  });

  it('Comprobar cambios', () => {
    cy.intercept('POST', '/cubicacion/detalle/get2').as(
      'HTTPRESPONSE-GET-DETALLE-CUBICACION'
    );
    cy.viewport(w, h);
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('button[id="navbar-list-cub"]').click();

    cy._filter_table(
      'filter-nombre-cubicacion',
      'Cubicacion Bucle Cypress Editada'
    );
    cy.get('tbody').find('tr').should('have.length', 1);
    cy.get('button[id="button-detalle-cubicacion"]').click();
    let dataEdit = CubicacionEditada;
    cy.wait('@HTTPRESPONSE-GET-DETALLE-CUBICACION').then(() => {
      cy.wait(500);
      cy._check_table_servicio_view(dataEdit);
    });
  });
});
