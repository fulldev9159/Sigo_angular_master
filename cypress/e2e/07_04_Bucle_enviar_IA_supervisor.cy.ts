describe('ENVIAR INFORME DE AVANCE SUPERVISOR DE TRABAJOS', () => {
  beforeEach(() => {
    cy.viewport(1500, 700);
  });

  it('Acceder al informe de avance"', () => {
    cy.visit('http://localhost:4206/login/auth');
    cy._login('cctrabajador1', 'asdasd');
    cy._select_profile('Trabajador EECC');
    cy.get('button[id="navbar-list-ot"]').click();
    cy.get('#table-ejecucion>p-table>div>.p-datatable-header>div>span>input')
      .clear()
      .type('jorge');
    cy.get('button[id="play-button"]').click();
  });

  it('Al realizar últimos cambios al informe de avance', () => {
    cy.intercept('POST', '/ot/informe_avance/detalle/get').as('HTTPRESPONSE');

    cy.get('.table-informe-avance>zwc-table-servicios>.carrito-container>table')
      .contains('td', 'J451')
      .siblings()
      .eq(2)
      .find('p-inputnumber>span>input')
      .clear()
      .type(`20{enter}`);

    cy.get('.table-informe-avance>zwc-table-servicios>.carrito-container>table')
      .contains('td', 'D013')
      .siblings()
      .eq(2)
      .find('p-inputnumber>span>input')
      .clear()
      .type(`15{enter}`);

    cy.get('button[id="enviar-button"]').click();
    cy.get('#button-confirmar').click();

    cy.wait(1000);
  });
});
