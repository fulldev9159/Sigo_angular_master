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

    let fila = '.carrito-container> table > tbody > tr:nth-child(1) > td';

    // SERVICIO J451
    cy.get(fila)
      .eq(0)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(1)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].nombre
          .split('-')[1]
          .trim()
      );
    cy.get(fila).eq(2).contains('Cables');
    cy.get(fila).eq(3).contains('4.53');
    cy.get(fila)
      .eq(4)
      .contains(BucleApoCobra.items[0].tipos_servicio[0].servicios[0].precio);
    cy.get(fila).eq(5).contains('$816,85');
    cy.get(fila)
      .eq(6)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[0].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(7)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[0].nombre
          .split('-')[1]
          .trim()
      );
    // cy.get(fila).eq(8).contains('Matriz');
    cy.get(fila).eq(9).contains('10');
    cy.get(fila).eq(10).contains('$56,8');
    cy.get(fila).eq(11).contains('$568');

    // SERVICIO J451 UO 2
    fila = '.carrito-container> table > tbody > tr:nth-child(2) > td';
    cy.get(fila)
      .eq(0)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[1].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(1)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[1].nombre
          .split('-')[1]
          .trim()
      );
    // cy.get(fila).eq(2).contains('Matriz');
    cy.get(fila).eq(3).contains('1');
    cy.get(fila)
      .eq(4)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[1]
          .precio
      );
    cy.get(fila).eq(5).contains('$0');

    // SERVICIO J456
    fila = '.carrito-container> table > tbody > tr:nth-child(3) > td';

    cy.get(fila)
      .eq(0)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(1)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].nombre
          .split('-')[1]
          .trim()
      );
    cy.get(fila).eq(2).contains('Cables');
    cy.get(fila).eq(3).contains('105.7');
    cy.get(fila)
      .eq(4)
      .contains(BucleApoCobra.items[0].tipos_servicio[0].servicios[1].precio);
    cy.get(fila).eq(5).contains('$519.380,2');
    cy.get(fila)
      .eq(6)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[0].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(7)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[0].nombre
          .split('-')[1]
          .trim()
      );
    // cy.get(fila).eq(8).contains('Matriz');
    cy.get(fila).eq(9).contains('5.24');
    cy.get(fila).eq(10).contains('$57.200,64');
    cy.get(fila).eq(11).contains('$299.731');

    // SERVICIO J456 UO D240
    fila = '.carrito-container> table > tbody > tr:nth-child(4) > td';
    cy.get(fila)
      .eq(0)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[1].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(1)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[1].nombre
          .split('-')[1]
          .trim()
      );
    // cy.get(fila).eq(2).contains('Matriz');
    cy.get(fila).eq(3).contains('100');
    cy.get(fila)
      .eq(4)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[1]
          .precio
      );
    cy.get(fila).eq(5).contains('$320.000');

    // SERVICIO J456 UO D239
    fila = '.carrito-container> table > tbody > tr:nth-child(5) > td';
    cy.get(fila)
      .eq(0)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[2].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(1)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[2].nombre
          .split('-')[1]
          .trim()
      );
    // cy.get(fila).eq(2).contains('Matriz');
    cy.get(fila).eq(3).contains('1');
    cy.get(fila)
      .eq(4)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[2]
          .precio
      );
    cy.get(fila).eq(5).contains('$0');

    // SERVICIO J456 UO D238
    fila = '.carrito-container> table > tbody > tr:nth-child(6) > td';
    cy.get(fila)
      .eq(0)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[3].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(1)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[3].nombre
          .split('-')[1]
          .trim()
      );
    // cy.get(fila).eq(2).contains('Matriz');
    cy.get(fila).eq(3).contains('1');
    cy.get(fila)
      .eq(4)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[3]
          .precio
      );
    cy.get(fila).eq(5).contains('$0');

    // SERVICIO J456 UO D006
    fila = '.carrito-container> table > tbody > tr:nth-child(7) > td';
    cy.get(fila)
      .eq(0)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[4].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(1)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[4].nombre
          .split('-')[1]
          .trim()
      );
    // cy.get(fila).eq(2).contains('Matriz');
    cy.get(fila).eq(3).contains('1');
    cy.get(fila)
      .eq(4)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[4]
          .precio
      );
    cy.get(fila).eq(5).contains('$0');

    cy.get('td[class="total-servicio-monto"]').contains('$2.923.750,85');
    cy.get('td[class="total-uo-monto"]').contains('$2.222.723,55');
    cy.get('td[class="total-cubicacion-monto"]').contains('$5.146.474,41');

    cy.get('button.p-dialog-header-close').click();
    // REVISAR CASO EN QUE SE ESCOGA VER DETALLE DE OTRO SERVICIO
  });

  it('clonar cubicacion', () => {
    cy.intercept('POST', '/cubicacion/cubicacion/save').as(
      'HTTPRESPONSE-CUBICACION-SAVE'
    );
    cy.get(`input[name='filter-nombre-cubicacion']`).clear();
    cy._filter_table('filter-nombre-cubicacion', 'Cubicacion Bucle');
    cy.get('tbody').find('tr').should('have.length', 1);
    cy.get('button[id="button-clonar-cubicacion"]').click();

    cy.get('input[name="input-nombre-clone-cubicacion"]')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('Cubicacion Bucle');
      });

    cy._check_input('input[name="input-nombre-clone-cubicacion"]', 'required');

    cy.get('input[name="input-nombre-clone-cubicacion"]').clear();
    cy.get('input[name="input-nombre-clone-cubicacion"]').type(
      'Cloned Cubicacion Bucle'
    );

    cy.get('button[id="clonar-cubicacion"]').click();

    cy.wait('@HTTPRESPONSE-CUBICACION-SAVE').then(() => {
      cy.get(`input[name='filter-nombre-cubicacion']`).clear();
      cy._filter_table('filter-nombre-cubicacion', 'Cloned Cubicacion Bucle');
      cy.get('tbody').find('tr').should('have.length', 1);

      cy.get('button[id="button-detalle-cubicacion"]').click();

      let fila = '.carrito-container> table > tbody > tr:nth-child(1) > td';

      // SERVICIO J451
      cy.get(fila)
        .eq(0)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[0].nombre
            .split('-')[0]
            .trim()
        );
      cy.get(fila)
        .eq(1)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[0].nombre
            .split('-')[1]
            .trim()
        );
      cy.get(fila).eq(2).contains('Cables');
      cy.get(fila).eq(3).contains('4.53');
      cy.get(fila)
        .eq(4)
        .contains(BucleApoCobra.items[0].tipos_servicio[0].servicios[0].precio);
      cy.get(fila).eq(5).contains('$816,85');
      cy.get(fila)
        .eq(6)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[0].nombre
            .split('-')[0]
            .trim()
        );
      cy.get(fila)
        .eq(7)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[0].nombre
            .split('-')[1]
            .trim()
        );
      // cy.get(fila).eq(8).contains('Matriz');
      cy.get(fila).eq(9).contains('10');
      cy.get(fila).eq(10).contains('$56,8');
      cy.get(fila).eq(11).contains('$568');

      // SERVICIO J451 UO 2
      fila = '.carrito-container> table > tbody > tr:nth-child(2) > td';
      cy.get(fila)
        .eq(0)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[1].nombre
            .split('-')[0]
            .trim()
        );
      cy.get(fila)
        .eq(1)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[1].nombre
            .split('-')[1]
            .trim()
        );
      // cy.get(fila).eq(2).contains('Matriz');
      cy.get(fila).eq(3).contains('1');
      cy.get(fila)
        .eq(4)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[1]
            .precio
        );
      cy.get(fila).eq(5).contains('$0');

      // SERVICIO J456
      fila = '.carrito-container> table > tbody > tr:nth-child(3) > td';

      cy.get(fila)
        .eq(0)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].nombre
            .split('-')[0]
            .trim()
        );
      cy.get(fila)
        .eq(1)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].nombre
            .split('-')[1]
            .trim()
        );
      cy.get(fila).eq(2).contains('Cables');
      cy.get(fila).eq(3).contains('105.7');
      cy.get(fila)
        .eq(4)
        .contains(BucleApoCobra.items[0].tipos_servicio[0].servicios[1].precio);
      cy.get(fila).eq(5).contains('$519.380,2');
      cy.get(fila)
        .eq(6)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[0].nombre
            .split('-')[0]
            .trim()
        );
      cy.get(fila)
        .eq(7)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[0].nombre
            .split('-')[1]
            .trim()
        );
      // cy.get(fila).eq(8).contains('Matriz');
      cy.get(fila).eq(9).contains('5.24');
      cy.get(fila).eq(10).contains('$57.200,64');
      cy.get(fila).eq(11).contains('$299.731');

      // SERVICIO J456 UO D240
      fila = '.carrito-container> table > tbody > tr:nth-child(4) > td';
      cy.get(fila)
        .eq(0)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[1].nombre
            .split('-')[0]
            .trim()
        );
      cy.get(fila)
        .eq(1)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[1].nombre
            .split('-')[1]
            .trim()
        );
      // cy.get(fila).eq(2).contains('Matriz');
      cy.get(fila).eq(3).contains('100');
      cy.get(fila)
        .eq(4)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[1]
            .precio
        );
      cy.get(fila).eq(5).contains('$320.000');

      // SERVICIO J456 UO D239
      fila = '.carrito-container> table > tbody > tr:nth-child(5) > td';
      cy.get(fila)
        .eq(0)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[2].nombre
            .split('-')[0]
            .trim()
        );
      cy.get(fila)
        .eq(1)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[2].nombre
            .split('-')[1]
            .trim()
        );
      // cy.get(fila).eq(2).contains('Matriz');
      cy.get(fila).eq(3).contains('1');
      cy.get(fila)
        .eq(4)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[2]
            .precio
        );
      cy.get(fila).eq(5).contains('$0');

      // SERVICIO J456 UO D238
      fila = '.carrito-container> table > tbody > tr:nth-child(6) > td';
      cy.get(fila)
        .eq(0)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[3].nombre
            .split('-')[0]
            .trim()
        );
      cy.get(fila)
        .eq(1)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[3].nombre
            .split('-')[1]
            .trim()
        );
      // cy.get(fila).eq(2).contains('Matriz');
      cy.get(fila).eq(3).contains('1');
      cy.get(fila)
        .eq(4)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[3]
            .precio
        );
      cy.get(fila).eq(5).contains('$0');

      // SERVICIO J456 UO D006
      fila = '.carrito-container> table > tbody > tr:nth-child(7) > td';
      cy.get(fila)
        .eq(0)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[4].nombre
            .split('-')[0]
            .trim()
        );
      cy.get(fila)
        .eq(1)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[4].nombre
            .split('-')[1]
            .trim()
        );
      // cy.get(fila).eq(2).contains('Matriz');
      cy.get(fila).eq(3).contains('1');
      cy.get(fila)
        .eq(4)
        .contains(
          BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[4]
            .precio
        );
      cy.get(fila).eq(5).contains('$0');

      cy.get('td[class="total-servicio-monto"]').contains('$2.923.750,85');
      cy.get('td[class="total-uo-monto"]').contains('$2.222.723,55');
      cy.get('td[class="total-cubicacion-monto"]').contains('$5.146.474,41');

      cy.get('button.p-dialog-header-close').click();
    });
  });

  it('eliminar Cubicacion', () => {
    cy.wait(1);
    cy.get(`input[name='filter-nombre-cubicacion']`).clear();
    cy._filter_table('filter-nombre-cubicacion', 'Cloned Cubicacion Bucle');
    cy.get('tbody').find('tr').should('have.length', 1);
    cy.get('button[id="button-eliminar-cubicacion"]').click();

    cy.get('#mensaje-confirmacion').contains(
      '¿Está seguro que desea eliminar esta cubicación ID:5?'
    );
    cy.get('button[id="button-confirmar"]').click();
    cy.get(`input[name='filter-nombre-cubicacion']`).clear();
    cy._filter_table('filter-nombre-cubicacion', 'Cloned Cubicacion Bucle');
    cy.get('tbody').find('tr').should('have.length', 0);
  });
});
