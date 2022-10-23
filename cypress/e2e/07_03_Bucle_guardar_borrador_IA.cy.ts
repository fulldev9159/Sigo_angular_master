import {
  getTipoServiciosContratoMOCK200ok,
  ServiciosAgenciaContratoProveedorMOCK200OK,
  UnidadObraServicioMOCK200OK,
} from '@mocksOT';
import {
  adicionalesBucle1,
  CubicacionEditada,
} from 'cypress/fixtures/testedCubicacionBUCLE';

describe('GUARDAR BORRADOR CAMBIOS INFORME DE AVANCE', () => {
  beforeEach(() => {
    cy.viewport(1500, 700);
  });

  it('Debe desplegar detalles de la cubicacion "Cubicacion Bucle"', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('cctrabajador1', 'asdasd');
    cy._select_profile('Trabajador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('button[id="play-button"]').click();
  });

  it('Al realizar cambios al servicio J730 y presionar guardar borrador los cambios debe permanecer', () => {
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
});
