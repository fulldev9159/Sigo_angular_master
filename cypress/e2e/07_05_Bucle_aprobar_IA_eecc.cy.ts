import { informeAvanceFinalTrabajador } from 'cypress/fixtures/testedCubicacionBUCLE';

describe('APROBAR INFORME AVANCE ADMIN CONTRATISTA', () => {
  beforeEach(() => {
    cy.viewport(1500, 700);
  });

  it('Acceder al informe de avance"', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('ccadmincontrato1', 'asdasd');
    cy._select_profile('Administrador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('button[id="play-button"]').click();
  });

  it('revisión data inicial', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    //
    const data = informeAvanceFinalTrabajador;

    cy.wait('@HTTPRESPONSE').then(() => {
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

        cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(3)
          .contains(servicio.precio);

        cy.get('.table-informe-avance>zwc-table-servicios>form>table')
          .contains('td', servicio.nombre.split('-')[0].trim())
          .siblings()
          .eq(4)
          .contains(servicio.total);

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

              cy.get('.table-informe-avance>zwc-table-servicios>form>table')
                .contains('td', uo.nombre.split('-')[0].trim())
                .siblings()
                .eq(3)
                .contains(uo.precio);

              cy.get('.table-informe-avance>zwc-table-servicios>form>table')
                .contains('td', uo.nombre.split('-')[0].trim())
                .siblings()
                .eq(4)
                .contains(uo.total);
            }
          }
        });
      });
    });

    cy.get(
      '.table-informe-avance>zwc-table-servicios>form>table>tfoot>tr>td[id="total-servicio-monto"]'
    ).contains(data.totalServicios);
    cy.get(
      '.table-informe-avance>zwc-table-servicios>form>table>tfoot>tr>td[id="total-uo-monto"]'
    ).contains(data.totalUOs);
    cy.get(
      '.table-informe-avance>zwc-table-servicios>form>table>tfoot>tr>td[id="total-cubicacion-monto"]'
    ).contains(data.total);
  });
});
