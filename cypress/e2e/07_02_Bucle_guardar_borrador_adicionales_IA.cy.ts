import {
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import {
  adicionalesBucle1,
  CubicacionEditada,
} from 'cypress/fixtures/testedCubicacionBUCLE';

describe('GUARDAR BORRADOR ADICIONALES INFORME DE AVANCE', () => {
  beforeEach(() => {
    cy.viewport(1500, 700);
  });

  it('Debe desplegar detalles de la cubicacion "Cubicacion Bucle"', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('cctrabajador1', 'asdasd');
    cy._select_profile('Trabajador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('#table-ejecucion>p-table>div>.p-datatable-header>div>span>input')
      .clear()
      .type('jorge');

    cy.get('button[id="play-button"]').click();
  });

  // VERIFICAR TODOS LOS CASOS DE AGREGACION DE ADICIONALES

  // CASO 1: SERVICIO Y UNIDAD DE OBRA A AGREGAR YA EXISTE EN EL INFORME DE AVANCE
  it('Agregar el servicio J101 uo C926 debe desplegar mensaje "Servicio y unidad de obra ya existen en el informe de avance. Debe cambiar la cantidad en el informe de avance"', () => {
    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'MATRIZ');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'LINEAS');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-unidad-obra', 'C926 - CABLE 1800-26 PS');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.get(
      '#alert-sevicio-existente>p-message>div>span.p-inline-message-text'
    ).contains(
      'Servicio y unidad de obra ya existen en el informe de avance. Debe cambiar la cantidad en el informe de avance'
    );
  });

  // CASO 2.3: SERVICIO A AGREGAR YA EXISTE EN EL INFORME DE AVANCE PERO LA UO ES NUEVA -
  //        EL SERVICIO Y LA UO AUN NO SE HAN AGREGADO COMO ADICIONAL
  it('Agregar una nueva UO C048 al servicio J101, servicio que ya existe en el informe pero no se ha agregado aún como adicional', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'MATRIZ');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'LINEAS');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-unidad-obra', 'C048 - CABLE 900-26 SUB');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'C048')
      .siblings()
      .eq(0)
      .contains('CABLE 900-26 SUB');

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'J101')
      .siblings()
      .eq(2)
      .contains('Su cantidad se debe modificar desde el informe de avance');
  });

  // CASO 2.2: SERVICIO A AGREGAR YA EXISTE EN EL INFORME DE AVANCE PERO LA UO ES NUEVA -
  //        EL SERVICIO YA EXISTE COMO ADICIONAL Y LA UNIDAD DE OBRA NO HAN SIDO AGREGADA

  it('Agregar una nueva UO C870 al servicio J101, servicio que ya existe en el informe y que ya ha sido agregado con una uo adicional', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'MATRIZ');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'LINEAS');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-unidad-obra', 'C870 - CABLE PS 1212-26 SUB.');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'C870')
      .siblings()
      .eq(0)
      .contains('CABLE PS 1212-26 SUB.');

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'J101')
      .siblings()
      .eq(2)
      .contains('Su cantidad se debe modificar desde el informe de avance');
  });

  // CASO 2.1: SERVICIO A AGREGAR YA EXISTE EN EL INFORME DE AVANCE PERO LA UO ES NUEVA
  // Y EL SERVICIO Y LA UO YA HAN SIDO AGREGADOS COMO ADICIONALES

  it('Al presionar nuevamente el agregar debe desplegar mensaje error "El servicio/UO ya fue agregado como adicional"', () => {
    cy.get('#agregar-button').click();
    cy.get(
      '#alert-sevicio-existente>p-message>div>span.p-inline-message-text'
    ).contains('El servicio/UO ya fue agregado como adicional');
  });

  // CASO 3.1: EL SERVICIO Y LA UO NO EXISTEN EN EL INFORME DE AVANCE Y
  // SERVICIO/UO NO SE HA AGREGADO COMO ADICIONAL

  it('Agregar una nueva UO DT09 al servicio nuevo T057', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'DISTRIBUCION');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'DTH');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'T057 - ACTIVACION DEL AMPLIFICADOR EN DIRECTA'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-unidad-obra',
      'DT09 - AMPLIFICADOR FI TELEVES'
    );
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'DT09')
      .siblings()
      .eq(0)
      .contains('AMPLIFICADOR FI TELEVES');

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'T057')
      .siblings()
      .eq(0)
      .contains('ACTIVACION DEL AMPLIFICADOR EN DIRECTA');
  });

  // CASO 3.3: EL SERVICIO Y LA UO NO EXISTEN EN EL INFORME DE AVANCE Y
  // SERVICIO YA SE HA AGREGADO COMO ADICIONAL PERO LA UO AÚN NO
  it('Agregar una nueva UO DT07 al servicio nuevo T057 servicio ya agregado como adicional', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'DISTRIBUCION');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'DTH');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'T057 - ACTIVACION DEL AMPLIFICADOR EN DIRECTA'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-unidad-obra',
      'DT07 - ANTENA SATELITAL, MARCA AZURE SHINE, MODELO AZ-120FM, S/SERIGRAFÍA.'
    );
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.wait(1000);
    cy.get('.table-adicionales>zwc-table-servicios>form>table')
      .contains('td', 'DT07')
      .siblings()
      .eq(0)
      .contains(
        'ANTENA SATELITAL, MARCA AZURE SHINE, MODELO AZ-120FM, S/SERIGRAFÍA.'
      );
  });

  // AGREGAR ADICIONALES
  it('Al agregar un servicio adicional no existente en el informe de avance y presionar guardar borrador debe actualizar la pagina con el nuevo adicional en el carrito y no debe aparecer en el informe', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    // AGREGAR T051 con 2 UO DT04 - DT01
    // AGREGAR T052 con 1 UO DT01

    const dataServiciosAdicionales = adicionalesBucle1;

    dataServiciosAdicionales.items.forEach(item => {
      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy._select_dropdown('#select-actividad', item.actividad.toUpperCase());

      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy._select_dropdown(
        '#select-tipo-servicio',
        item.tipo_servicio.toUpperCase()
      );
      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy._select_dropdown('#select-servicio', item.nombre);

      item.unidad_obras.forEach((uo, index) => {
        cy.get('body').trigger('keydown', { keyCode: 27 });
        cy._select_dropdown('#select-unidad-obra', uo.nombre);
        cy.get('body').trigger('keydown', { keyCode: 27 });
        cy.get('#agregar-button').click();

        if (uo.nombre.split('-')[1].trim() !== 'SIN UO') {
          cy.get('table')
            .contains('td', uo.nombre.split('-')[1].trim())
            .siblings()
            .eq(2)
            .find('p-inputnumber>span>input')
            .clear()
            .type(`{del}${uo.cantidad}{enter}`);
        }
      });
      cy.get('table')
        .contains('td', item.nombre.split('-')[1].trim())
        .siblings()
        .eq(2)
        .find('p-inputnumber>span>input')
        .clear()
        .type(`{del}${item.cantidad}{enter}`);
    });

    cy.wait(100);
    cy.get('button[id="guardar-borrador-button"]').click();

    // EL FORMULARIO DE INFORME DE AVANCE DEBE QUEDAR COMO ANTES
    // LA TABLA DE ADICIONALES DEBE CONTENER LOS AGREGADOS RECIENTEMENTE

    const data = CubicacionEditada;

    cy.wait('@HTTPRESPONSE').then(() => {
      cy.get('.table-informe-avance>zwc-table-servicios>form>table>tbody')
        .find('tr')
        .should('have.length', 16);

      data.items.forEach(servicio => {
        cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(0)
          .contains(servicio.nombre.split('-')[1].trim());

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(1)
        //   .contains(servicio.tipo_servicio);

        cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(2)
          .find('p-inputnumber>span>input')
          .invoke('val')
          .then(val => {
            expect(val).to.eql(
              servicio.cantidad.split(',')[1] === undefined
                ? servicio.cantidad + ',00'
                : +servicio.cantidad.split(',')[1] > 9
                ? servicio.cantidad
                : servicio.cantidad + 0
            );
          });

        servicio.unidad_obras.forEach((uo, index) => {
          if (uo.nombre !== '0 - SIN UO') {
            cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              .contains('td', uo.nombre.split('-')[0].trim())
              .siblings()
              .eq(0)
              .contains(uo.nombre.split('-')[1].trim());

            // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
            //   .contains('td', uo.nombre.split('-')[0].trim())
            //   .siblings()
            //   .eq(1)
            //   .contains(servicio.actividad);

            if (uo.nombre !== '0 - SIN UO') {
              cy.get('table')
                .contains('td', uo.nombre.split('-')[0].trim())
                .siblings()
                .eq(2)
                .find('p-inputnumber>span>input')
                .invoke('val')
                .then(val => {
                  expect(val).to.eql(
                    uo.cantidad.split(',')[1] === undefined
                      ? uo.cantidad + ',00'
                      : +uo.cantidad.split(',')[1] > 9
                      ? uo.cantidad
                      : uo.cantidad + 0
                  );
                });
            }
          }
        });
      });

      cy.get('.table-adicionales>zwc-table-servicios>form>table>tbody')
        .find('tr')
        .should('have.length', 11);

      dataServiciosAdicionales.items.forEach(servicio => {
        cy.get('.table-adicionales>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(0)
          .contains(servicio.nombre.split('-')[1].trim());

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(1)
        //   .contains(servicio.tipo_servicio);

        cy.get('.table-adicionales>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(2)
          .find('p-inputnumber>span>input')
          .invoke('val')
          .then(val => {
            expect(val).to.eql(
              servicio.cantidad.split(',')[1] === undefined
                ? servicio.cantidad + ',00'
                : +servicio.cantidad.split(',')[1] > 9
                ? servicio.cantidad
                : servicio.cantidad + 0
            );
          });

        servicio.unidad_obras.forEach((uo, index) => {
          cy.get('.table-adicionales>zwc-table-servicios>form>table')
            .contains('td', uo.nombre.split('-')[0].trim())
            .siblings()
            .eq(0)
            .contains(uo.nombre.split('-')[1].trim());

          // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          //   .contains('td', uo.nombre.split('-')[0].trim())
          //   .siblings()
          //   .eq(1)
          //   .contains(servicio.actividad);

          if (uo.nombre !== '0 - SIN UO') {
            cy.get('table')
              .contains('td', uo.nombre.split('-')[0].trim())
              .siblings()
              .eq(2)
              .find('p-inputnumber>span>input')
              .invoke('val')
              .then(val => {
                expect(val).to.eql(
                  uo.cantidad.split(',')[1] === undefined
                    ? uo.cantidad + ',00'
                    : +uo.cantidad.split(',')[1] > 9
                    ? uo.cantidad
                    : uo.cantidad + 0
                );
              });
          }
        });
      });
    });

    cy.wait(1000);
  });

  // ELIMINAR ADICIONALES REVISAR
  it.skip('Al eliminar una uo y un servicio estos no deben aparecer al apretar guardar borrador', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    // ELIMINAR SERVICIO T052
    cy.get(
      '.table-adicionales>zwc-table-servicios>form>table>tbody>tr:nth-child(10)>td:nth-child(5)>button'
    ).click();
    // ELIMINAR UO DT04
    cy.get(
      '.table-adicionales>zwc-table-servicios>form>table>tbody>tr:nth-child(8)>td:nth-child(5)>button'
    ).click();

    cy.get('button[id="guardar-borrador-button"]').click();

    cy.wait('@HTTPRESPONSE').then(() => {
      const data = CubicacionEditada;

      cy.get('.table-informe-avance>zwc-table-servicios>form>table>tbody')
        .find('tr')
        .should('have.length', 16);

      data.items.forEach(servicio => {
        cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(0)
          .contains(servicio.nombre.split('-')[1].trim());

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(1)
        //   .contains(servicio.tipo_servicio);

        cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(2)
          .find('p-inputnumber>span>input')
          .invoke('val')
          .then(val => {
            expect(val).to.eql(
              servicio.cantidad.split(',')[1] === undefined
                ? servicio.cantidad + ',00'
                : +servicio.cantidad.split(',')[1] > 9
                ? servicio.cantidad
                : servicio.cantidad + 0
            );
          });

        servicio.unidad_obras.forEach((uo, index) => {
          if (uo.nombre !== '0 - SIN UO') {
            cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              .contains('td', uo.nombre.split('-')[0].trim())
              .siblings()
              .eq(0)
              .contains(uo.nombre.split('-')[1].trim());

            // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
            //   .contains('td', uo.nombre.split('-')[0].trim())
            //   .siblings()
            //   .eq(1)
            //   .contains(servicio.actividad);

            if (uo.nombre !== '0 - SIN UO') {
              cy.get('table')
                .contains('td', uo.nombre.split('-')[0].trim())
                .siblings()
                .eq(2)
                .find('p-inputnumber>span>input')
                .invoke('val')
                .then(val => {
                  expect(val).to.eql(
                    uo.cantidad.split(',')[1] === undefined
                      ? uo.cantidad + ',00'
                      : +uo.cantidad.split(',')[1] > 9
                      ? uo.cantidad
                      : uo.cantidad + 0
                  );
                });
            }
          }
        });
      });

      cy.get('.table-adicionales>zwc-table-servicios>form>table>tbody')
        .find('tr')
        .should('have.length', 8);
    });

    cy.wait(1000);
  });

  // AGREGAR NUEVAMENTE LOS ADICIONALES REVISAR
  it.skip('Al agregar un servicio adicional no existente en el informe de avance y presionar guardar borrador debe actualizar la pagina con el nuevo adicional en el carrito y no debe aparecer en el informe', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    // AGREGAR T051 con 2 UO DT04 - DT01
    // AGREGAR T052 con 1 UO DT01

    const dataServiciosAdicionales = adicionalesBucle1;

    dataServiciosAdicionales.items.forEach(item => {
      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy._select_dropdown('#select-actividad', item.actividad.toUpperCase());

      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy._select_dropdown(
        '#select-tipo-servicio',
        item.tipo_servicio.toUpperCase()
      );
      cy.get('body').trigger('keydown', { keyCode: 27 });
      cy._select_dropdown('#select-servicio', item.nombre);

      item.unidad_obras.forEach((uo, index) => {
        cy.get('body').trigger('keydown', { keyCode: 27 });
        cy._select_dropdown('#select-unidad-obra', uo.nombre);
        cy.get('body').trigger('keydown', { keyCode: 27 });
        cy.get('#agregar-button').click();

        if (uo.nombre.split('-')[1].trim() !== 'SIN UO') {
          cy.get('table')
            .contains('td', uo.nombre.split('-')[1].trim())
            .siblings()
            .eq(2)
            .find('p-inputnumber>span>input')
            .clear()
            .type(`{del}${uo.cantidad}{enter}`);
        }
      });
      cy.get('table')
        .contains('td', item.nombre.split('-')[1].trim())
        .siblings()
        .eq(2)
        .find('p-inputnumber>span>input')
        .clear()
        .type(`{del}${item.cantidad}{enter}`);
    });

    cy.wait(100);
    cy.get('button[id="guardar-borrador-button"]').click();

    // EL FORMULARIO DE INFORME DE AVANCE DEBE QUEDAR COMO ANTES
    // LA TABLA DE ADICIONALES DEBE CONTENER LOS AGREGADOS RECIENTEMENTE

    const data = CubicacionEditada;

    cy.wait('@HTTPRESPONSE').then(() => {
      cy.get('.table-informe-avance>zwc-table-servicios>form>table>tbody')
        .find('tr')
        .should('have.length', 16);

      data.items.forEach(servicio => {
        cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(0)
          .contains(servicio.nombre.split('-')[1].trim());

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(1)
        //   .contains(servicio.tipo_servicio);

        cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(2)
          .find('p-inputnumber>span>input')
          .invoke('val')
          .then(val => {
            expect(val).to.eql(
              servicio.cantidad.split(',')[1] === undefined
                ? servicio.cantidad + ',00'
                : +servicio.cantidad.split(',')[1] > 9
                ? servicio.cantidad
                : servicio.cantidad + 0
            );
          });

        servicio.unidad_obras.forEach((uo, index) => {
          if (uo.nombre !== '0 - SIN UO') {
            cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              .contains('td', uo.nombre.split('-')[0].trim())
              .siblings()
              .eq(0)
              .contains(uo.nombre.split('-')[1].trim());

            // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
            //   .contains('td', uo.nombre.split('-')[0].trim())
            //   .siblings()
            //   .eq(1)
            //   .contains(servicio.actividad);

            if (uo.nombre !== '0 - SIN UO') {
              cy.get('table')
                .contains('td', uo.nombre.split('-')[0].trim())
                .siblings()
                .eq(2)
                .find('p-inputnumber>span>input')
                .invoke('val')
                .then(val => {
                  expect(val).to.eql(
                    uo.cantidad.split(',')[1] === undefined
                      ? uo.cantidad + ',00'
                      : +uo.cantidad.split(',')[1] > 9
                      ? uo.cantidad
                      : uo.cantidad + 0
                  );
                });
            }
          }
        });
      });

      cy.get('.table-adicionales>zwc-table-servicios>form>table>tbody')
        .find('tr')
        .should('have.length', 11);

      dataServiciosAdicionales.items.forEach(servicio => {
        cy.get('.table-adicionales>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(0)
          .contains(servicio.nombre.split('-')[1].trim());

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(1)
        //   .contains(servicio.tipo_servicio);

        cy.get('.table-adicionales>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(2)
          .find('p-inputnumber>span>input')
          .invoke('val')
          .then(val => {
            expect(val).to.eql(
              servicio.cantidad.split(',')[1] === undefined
                ? servicio.cantidad + ',00'
                : +servicio.cantidad.split(',')[1] > 9
                ? servicio.cantidad
                : servicio.cantidad + 0
            );
          });

        servicio.unidad_obras.forEach((uo, index) => {
          cy.get('.table-adicionales>zwc-table-servicios>form>table')
            .contains('td', uo.nombre.split('-')[0].trim())
            .siblings()
            .eq(0)
            .contains(uo.nombre.split('-')[1].trim());

          // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          //   .contains('td', uo.nombre.split('-')[0].trim())
          //   .siblings()
          //   .eq(1)
          //   .contains(servicio.actividad);

          if (uo.nombre !== '0 - SIN UO') {
            cy.get('table')
              .contains('td', uo.nombre.split('-')[0].trim())
              .siblings()
              .eq(2)
              .find('p-inputnumber>span>input')
              .invoke('val')
              .then(val => {
                expect(val).to.eql(
                  uo.cantidad.split(',')[1] === undefined
                    ? uo.cantidad + ',00'
                    : +uo.cantidad.split(',')[1] > 9
                    ? uo.cantidad
                    : uo.cantidad + 0
                );
              });
          }
        });
      });
    });

    cy.wait(1000);
  });

  // CASO 4 PENDIENTE CORRECCION: AGREGAR UNA UO ADICIONAL A UN SERVICIO ADICIONAL AGREGADO GUARDADO PREVIAMENTE REVISAR
  it.skip('Agregar uo nueva DT19 al servicio T057', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.wait(1500);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', 'DISTRIBUCION');

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', 'DTH');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown(
      '#select-servicio',
      'T057 - ACTIVACION DEL AMPLIFICADOR EN DIRECTA'
    );

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-unidad-obra', 'DT19 - CABLE COAXIAL RG6');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();

    cy.wait(100);
    cy.get('button[id="guardar-borrador-button"]').click();

    cy.wait(2000).then(() => {
      cy.get('.table-adicionales>zwc-table-servicios>form>table')
        .contains('td', 'DT19')
        .siblings()
        .eq(0)
        .contains('CABLE COAXIAL RG6');
    });
  });
});
