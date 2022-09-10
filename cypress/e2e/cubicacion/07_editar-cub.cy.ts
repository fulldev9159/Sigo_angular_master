import { BucleApoCobra } from 'cypress/fixtures/testedCubicacion';

describe('Editar cubicacion', () => {
  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('mgestor1', 'asdasd');
    cy._select_profile('Gestor/JP');
    cy.get('#listar-cubicacion-sidebar').click();
  });

  it('Debe desplegar 4 cubicaciones', () => {
    cy.viewport(1500, 700);
    // cy.get('tbody').find('tr').should('have.length', 4);
    cy._filter_table('filter-nombre-cubicacion', 'Cubicacion Bucle Test');
    cy.get('tbody').find('tr').should('have.length', 1);
  });

  it('Debe precargar los datos correspondientes', () => {
    cy.get('button[id="button-editar-cubicacion"]').click();
    cy.get('input[name="input-nombre-cubicacion"]')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('Cubicacion Bucle Test');
      });

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

    // SERVICIOS CARRITO
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
    cy.get(fila + ':nth-child(4)>p-inputnumber>span>input')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('4.53');
      });
    cy.get(fila)
      .eq(4)
      .contains(BucleApoCobra.items[0].tipos_servicio[0].servicios[0].precio);
    cy.get(fila).eq(5).contains('$816,85');
    cy.get(fila)
      .eq(7)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[0].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(8)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[0].unidad_obras[0].nombre
          .split('-')[1]
          .trim()
      );
    cy.get(fila).eq(9).contains('Matriz');
    cy.get(fila + ':nth-child(11)>p-inputnumber>span>input')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('10.00');
      });
    cy.get(fila).eq(11).contains('$56,8');
    cy.get(fila).eq(12).contains('$568');

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
    cy.get(fila).eq(2).contains('Matriz');
    cy.get(fila + ':nth-child(4)>p-inputnumber>span>input')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('1.00');
      });
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
    cy.get(fila + ':nth-child(4)>p-inputnumber>span>input')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('105.70');
      });
    cy.get(fila)
      .eq(4)
      .contains(BucleApoCobra.items[0].tipos_servicio[0].servicios[1].precio);
    cy.get(fila).eq(5).contains('$519.380,2');
    cy.get(fila)
      .eq(7)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[0].nombre
          .split('-')[0]
          .trim()
      );
    cy.get(fila)
      .eq(8)
      .contains(
        BucleApoCobra.items[0].tipos_servicio[0].servicios[1].unidad_obras[0].nombre
          .split('-')[1]
          .trim()
      );
    cy.get(fila).eq(9).contains('Matriz');
    cy.get(fila + ':nth-child(11)>p-inputnumber>span>input')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('5.24');
      });
    cy.get(fila).eq(11).contains('$57.200,64');
    cy.get(fila).eq(12).contains('$299.731');

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
    cy.get(fila).eq(2).contains('Matriz');
    cy.get(fila + ':nth-child(4)>p-inputnumber>span>input')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('100.00');
      });
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
    cy.get(fila).eq(2).contains('Matriz');
    cy.get(fila + ':nth-child(4)>p-inputnumber>span>input')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('1.00');
      });
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
    cy.get(fila).eq(2).contains('Matriz');
    cy.get(fila + ':nth-child(4)>p-inputnumber>span>input')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('1.00');
      });
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
    cy.get(fila).eq(2).contains('Matriz');
    cy.get(fila + ':nth-child(4)>p-inputnumber>span>input')
      .invoke('val')
      .then(val => {
        expect(val).to.eql('1.00');
      });
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
  });

  it('Realizar cambios', () => {
    // CAMBIAR FORMULARIO
    // CAMBIAR CARRITO
    // ELIMINAR 2 ITEMS
    // AGREGAR 3 ITEMS
    // GUARDAR
  });

  it('Comprobar cambios', () => {});
});
