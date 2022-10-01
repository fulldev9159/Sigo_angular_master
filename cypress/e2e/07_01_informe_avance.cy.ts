import {
  crearCubicacion,
  CubicacionEditada,
} from 'cypress/fixtures/testedCubicacion';

describe('INFORME DE AVANCE', () => {
  it('should let enter to create cubicacion', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('cctrabajador1', 'asdasd');
    cy._select_profile('Trabajador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('button[id="play-button"]').click();
  });

  it(
    'Debe desplegar detalles de la cubicacion "Cubicacion Bucle"',
    {
      retries: 2,
    },
    () => {
      cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');
      const data = CubicacionEditada;

      cy.wait('@HTTPRESPONSE').then(() => {
        data.items.forEach(servicio => {
          cy.get('.table-informe-avance>zwc-form-table-services>form>table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(0)
            .contains(servicio.nombre.split('-')[1].trim());

          // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          //   .contains('td', servicio.nombre.split('-')[0].trim())
          //   .siblings()
          //   .eq(1)
          //   .contains(servicio.tipo_servicio);

          cy.get('.table-informe-avance>zwc-form-table-services>form>table')
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

          // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          //   .contains('td', servicio.nombre.split('-')[0].trim())
          //   .siblings()
          //   .eq(3)
          //   .contains(servicio.precio);

          // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          //   .contains('td', servicio.nombre.split('-')[0].trim())
          //   .siblings()
          //   .eq(4)
          //   .contains(servicio.total);

          cy.get('.table-informe-avance>zwc-form-table-services>form>table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(3)
            .contains(servicio.unidad_obras[0].nombre.split('-')[0].trim());

          cy.get('.table-informe-avance>zwc-form-table-services>form>table')
            .contains('td', servicio.nombre.split('-')[0].trim())
            .siblings()
            .eq(4)
            .contains(servicio.unidad_obras[0].nombre.split('-')[1].trim());

          // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
          //   .contains('td', servicio.nombre.split('-')[0].trim())
          //   .siblings()
          //   .eq(7)
          //   .contains(servicio.actividad);

          if (servicio.unidad_obras[0].nombre !== '0 - SIN UO') {
            cy.get('.table-informe-avance>zwc-form-table-services>form>table')
              .contains(
                'td',
                servicio.unidad_obras[0].nombre.split('-')[0].trim()
              )
              .siblings()
              .eq(6)
              .find('p-inputnumber>span>input')
              .invoke('val')
              .then(val => {
                expect(val).to.eql(
                  servicio.unidad_obras[0].cantidad.split(',')[1] === undefined
                    ? servicio.unidad_obras[0].cantidad + ',00'
                    : +servicio.unidad_obras[0].cantidad.split(',')[1] > 9
                    ? servicio.unidad_obras[0].cantidad
                    : servicio.unidad_obras[0].cantidad + 0
                );
              });

            //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
            //     .contains('td', servicio.nombre.split('-')[0].trim())
            //     .siblings()
            //     .eq(9)
            //     .contains(servicio.unidad_obras[0].precio);

            //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
            //     .contains('td', servicio.nombre.split('-')[0].trim())
            //     .siblings()
            //     .eq(10)
            //     .contains(servicio.unidad_obras[0].total);
          }

          servicio.unidad_obras.forEach((uo, index) => {
            if (index !== 0) {
              cy.get('.table-informe-avance>zwc-form-table-services>form>table')
                .contains('td', uo.nombre.split('-')[0].trim())
                .siblings()
                .eq(0)
                .contains(uo.nombre.split('-')[1].trim());

              // cy.get('.table-informe-avance>zwc-form-table-services>form>table')
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

                //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
                //     .contains('td', uo.nombre.split('-')[0].trim())
                //     .siblings()
                //     .eq(3)
                //     .contains(uo.precio);

                //   cy.get('.table-informe-avance>zwc-form-table-services>form>table')
                //     .contains('td', uo.nombre.split('-')[0].trim())
                //     .siblings()
                //     .eq(4)
                //     .contains(uo.total);
              }
            }
          });
        });
      });
    }
  );
});
