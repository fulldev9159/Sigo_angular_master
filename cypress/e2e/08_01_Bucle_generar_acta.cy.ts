import { InformeAvanceYadicionalesFinal } from 'cypress/fixtures/testedCubicacionBUCLE';

describe('GENERAR ACTA', () => {
  beforeEach(() => {
    cy.viewport(1500, 700);
  });

  it('revisión data inicial', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('ccadmincontrato1', 'asdasd');
    cy._select_profile('Administrador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('#table-ejecucion>p-table>div>.p-datatable-header>div>span>input')
      .clear()
      .type('OT Test Bucle Cypress');
    cy.get('button[id="play-button"]').click();

    cy.wait(2000).then(() => {
      // REVISAR INFORME DE AVANCE

      let data = InformeAvanceYadicionalesFinal;

      let table = '.table-acta';
      cy._check_table_servicio_view(data);

      cy.get(
        table +
          '>zwc-table-servicios>form>table>tfoot>tr>td[id="total-servicio-monto"]'
      ).contains(data.totalServicios);
      cy.get(
        table +
          '>zwc-table-servicios>form>table>tfoot>tr>td[id="total-uo-monto"]'
      ).contains(data.totalUOs);
      cy.get(
        table +
          '>zwc-table-servicios>form>table>tfoot>tr>td[id="total-cubicacion-monto"]'
      ).contains(data.total);
    });
  });
});
