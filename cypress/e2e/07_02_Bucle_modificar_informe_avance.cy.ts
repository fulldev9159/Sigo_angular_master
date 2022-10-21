import {
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import {
  adicionalesBucle1,
  CubicacionEditada,
} from 'cypress/fixtures/testedCubicacionBUCLE';

describe('INFORME DE AVANCE', () => {
  it('Debe desplegar detalles de la cubicacion "Cubicacion Bucle"', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('cctrabajador1', 'asdasd');
    cy._select_profile('Trabajador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('button[id="play-button"]').click();
  });

  // AGREGAR ADICIONALES
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

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(3)
        //   .contains(servicio.precio);

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(4)
        //   .contains(servicio.total);

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

              //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(3)
              //     .contains(uo.precio);

              //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(4)
              //     .contains(uo.total);
            }
          }
        });
      });

      cy.get('.table-adicionales>zwc-table-servicios>form>table>tbody')
        .find('tr')
        .should('have.length', 5);

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

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(3)
        //   .contains(servicio.precio);

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(4)
        //   .contains(servicio.total);

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

            //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
            //     .contains('td', uo.nombre.split('-')[0].trim())
            //     .siblings()
            //     .eq(3)
            //     .contains(uo.precio);

            //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
            //     .contains('td', uo.nombre.split('-')[0].trim())
            //     .siblings()
            //     .eq(4)
            //     .contains(uo.total);
          }
        });
      });
    });
  });

  // ELIMINAR ADICIONALES
  it.skip('Al eliminar una uo y un servicio estos no deben aparecer al apretar guardar borrador', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    // ELIMINAR SERVICIO T052
    cy.get(
      '.table-adicionales>zwc-table-servicios>form>table>tbody>tr:nth-child(4)>td:nth-child(5)>button'
    ).click();
    // ELIMINAR UO DT04
    cy.get(
      '.table-adicionales>zwc-table-servicios>form>table>tbody>tr:nth-child(2)>td:nth-child(5)>button'
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

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(3)
        //   .contains(servicio.precio);

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(4)
        //   .contains(servicio.total);

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

              //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(3)
              //     .contains(uo.precio);

              //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(4)
              //     .contains(uo.total);
            }
          }
        });
      });

      cy.get('.table-adicionales>zwc-table-servicios>form>table>tbody')
        .find('tr')
        .should('have.length', 2);
    });

    // ELIMINAR TODO
    cy.get(
      '.table-adicionales>zwc-table-servicios>form>table>tbody>tr:nth-child(1)>td:nth-child(5)>button'
    ).click();

    cy.get('button[id="guardar-borrador-button"]').click();

    cy.get('.table-informe-avance>zwc-table-servicios>form>table>tbody')
      .find('tr')
      .should('have.length', 16);

    cy.get('.table-adicionales>zwc-table-servicios>form>table>tbody')
      .find('tr')
      .should('have.length', 0);
  });

  // AGREGAR NUEVAMENTE LOS ADICIONALES
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

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(3)
        //   .contains(servicio.precio);

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(4)
        //   .contains(servicio.total);

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

              //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(3)
              //     .contains(uo.precio);

              //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
              //     .contains('td', uo.nombre.split('-')[0].trim())
              //     .siblings()
              //     .eq(4)
              //     .contains(uo.total);
            }
          }
        });
      });

      cy.get('.table-adicionales>zwc-table-servicios>form>table>tbody')
        .find('tr')
        .should('have.length', 5);

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

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(3)
        //   .contains(servicio.precio);

        // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
        //   .contains('td', servicio.nombre.split('-')[0].trim())
        //   .siblings()
        //   .eq(4)
        //   .contains(servicio.total);

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

            //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
            //     .contains('td', uo.nombre.split('-')[0].trim())
            //     .siblings()
            //     .eq(3)
            //     .contains(uo.precio);

            //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
            //     .contains('td', uo.nombre.split('-')[0].trim())
            //     .siblings()
            //     .eq(4)
            //     .contains(uo.total);
          }
        });
      });
    });
  });

  it.skip('Al intenet agregar el mismo adicional anterior debe desplegar el siguiente mensaje de error "" ', () => {});

  it('Agregar la UO C048 al servicio J101', () => {
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

  it.skip('Al agregar una uo adicional a un servicio original existente debe mostrar un servicio dummy y al presionar guardar borrador debe actualizar la pagina con ese nuevo adicional', () => {});

  it.skip('Al realizar cambios al servicio J730 y presionar guardar borrador los cambios debe permanecer', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.get('.table-informe-avance>zwc-table-servicios>.carrito-container>table')
      .contains('td', 'J730')
      .siblings()
      .eq(2)
      .find('p-inputnumber>span>input')
      .clear()
      .type(`24{enter}`);

    cy.get('button[id="guardar-borrador-button"]').click();

    cy.wait('@HTTPRESPONSE').then(() => {
      cy.get(
        '.table-informe-avance>zwc-table-servicios>.carrito-container>table'
      )
        .contains('td', 'J730')
        .siblings()
        .eq(2)
        .find('p-inputnumber>span>input')
        .invoke('val')
        .then(val => {
          expect(val).to.eql('24,00');
        });
    });
  });

  it.skip('Al realizar todos los cambios al informe de avance', () => {});
  it.skip('Enviar informe de avance debe desplegar el mensaje y redirigir al listar ot', () => {
    cy.get('button[id="enviar-button"]').click();
  });
});

// it('El mensaje de alerta debería desaparecer si cambio de actividad', () => {
//   // cy._select_dropdown(
//   //   '#select-servicio',
//   //   'J912 - ABRIR EMPALME COM. TIPO MECANICO TTRC O EFA'
//   // );
//   // cy.get(
//   //   '#alert-sevicio-existente>p-message>div>span.p-inline-message-text'
//   // ).should('not.exist');
// });

// TODO: PENDIENTE HASTA QUE SE PROGRAME EL GUARDAR INFORME DE AVANCE
// it('Al guardar borrador sin hacer ningun cambio debería recargar los mismos datos anteriores', () => {
//   cy.get('button[id="guardar-borrador-button"]').click();

//   cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

//   const data = CubicacionEditada;

//   cy.wait('@HTTPRESPONSE').then(() => {
//     data.items.forEach(servicio => {
//       cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//         .contains('td', servicio.nombre.split('-')[0].trim())
//         .siblings()
//         .eq(0)
//         .contains(servicio.nombre.split('-')[1].trim());

//       // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//       //   .contains('td', servicio.nombre.split('-')[0].trim())
//       //   .siblings()
//       //   .eq(1)
//       //   .contains(servicio.tipo_servicio);

//       cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//         .contains('td', servicio.nombre.split('-')[0].trim())
//         .siblings()
//         .eq(2)
//         .find('p-inputnumber>span>input')
//         .invoke('val')
//         .then(val => {
//           expect(val).to.eql(
//             servicio.cantidad.split(',')[1] === undefined
//               ? servicio.cantidad + ',00'
//               : +servicio.cantidad.split(',')[1] > 9
//               ? servicio.cantidad
//               : servicio.cantidad + 0
//           );
//         });

//       // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//       //   .contains('td', servicio.nombre.split('-')[0].trim())
//       //   .siblings()
//       //   .eq(3)
//       //   .contains(servicio.precio);

//       // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//       //   .contains('td', servicio.nombre.split('-')[0].trim())
//       //   .siblings()
//       //   .eq(4)
//       //   .contains(servicio.total);

//       cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//         .contains('td', servicio.nombre.split('-')[0].trim())
//         .siblings()
//         .eq(3)
//         .contains(servicio.unidad_obras[0].nombre.split('-')[0].trim());

//       cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//         .contains('td', servicio.nombre.split('-')[0].trim())
//         .siblings()
//         .eq(4)
//         .contains(servicio.unidad_obras[0].nombre.split('-')[1].trim());

//       // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//       //   .contains('td', servicio.nombre.split('-')[0].trim())
//       //   .siblings()
//       //   .eq(7)
//       //   .contains(servicio.actividad);

//       if (servicio.unidad_obras[0].nombre !== '0 - SIN UO') {
//         cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//           .contains(
//             'td',
//             servicio.unidad_obras[0].nombre.split('-')[0].trim()
//           )
//           .siblings()
//           .eq(6)
//           .find('p-inputnumber>span>input')
//           .invoke('val')
//           .then(val => {
//             expect(val).to.eql(
//               servicio.unidad_obras[0].cantidad.split(',')[1] === undefined
//                 ? servicio.unidad_obras[0].cantidad + ',00'
//                 : +servicio.unidad_obras[0].cantidad.split(',')[1] > 9
//                 ? servicio.unidad_obras[0].cantidad
//                 : servicio.unidad_obras[0].cantidad + 0
//             );
//           });

//         //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//         //     .contains('td', servicio.nombre.split('-')[0].trim())
//         //     .siblings()
//         //     .eq(9)
//         //     .contains(servicio.unidad_obras[0].precio);

//         //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//         //     .contains('td', servicio.nombre.split('-')[0].trim())
//         //     .siblings()
//         //     .eq(10)
//         //     .contains(servicio.unidad_obras[0].total);
//       }

//       servicio.unidad_obras.forEach((uo, index) => {
//         if (index !== 0) {
//           cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//             .contains('td', uo.nombre.split('-')[0].trim())
//             .siblings()
//             .eq(0)
//             .contains(uo.nombre.split('-')[1].trim());

//           // cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//           //   .contains('td', uo.nombre.split('-')[0].trim())
//           //   .siblings()
//           //   .eq(1)
//           //   .contains(servicio.actividad);

//           if (uo.nombre !== '0 - SIN UO') {
//             cy.get('table')
//               .contains('td', uo.nombre.split('-')[0].trim())
//               .siblings()
//               .eq(2)
//               .find('p-inputnumber>span>input')
//               .invoke('val')
//               .then(val => {
//                 expect(val).to.eql(
//                   uo.cantidad.split(',')[1] === undefined
//                     ? uo.cantidad + ',00'
//                     : +uo.cantidad.split(',')[1] > 9
//                     ? uo.cantidad
//                     : uo.cantidad + 0
//                 );
//               });

//             //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//             //     .contains('td', uo.nombre.split('-')[0].trim())
//             //     .siblings()
//             //     .eq(3)
//             //     .contains(uo.precio);

//             //   cy.get('.table-informe-avance>zwc-table-servicios>form>table')
//             //     .contains('td', uo.nombre.split('-')[0].trim())
//             //     .siblings()
//             //     .eq(4)
//             //     .contains(uo.total);
//           }
//         }
//       });
//     });
//   });
// });
