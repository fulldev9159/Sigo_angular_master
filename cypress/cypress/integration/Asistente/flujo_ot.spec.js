describe.skip('Flujo OT', () => {
  const nombre = 'OT BUCLE informe avance 1';

  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('Aceptar OT Supervisor', () => {
    cy.login('msupervisor1', '123', 'Supervisor (Telefónica)');
    cy.contains('Listar OTs').click();
    cy.get(
      '#p-tabpanel-0 > app-table > .card > p-table > .p-datatable-sm > .p-datatable-header > .p-d-flex > .p-input-icon-left > .p-inputtext'
    ).type(nombre);
    cy.get('.p-button-text').click();
    cy.contains('Aceptar OT').click();
    cy.get('.btn-primary').click();
  });

  it('Aceptar OT jefe area', () => {
    cy.login('mjefearea1', '123', 'Jefe de Área Telefónica');
    cy.contains('Listar OTs').click();
    cy.get(
      '#p-tabpanel-0 > app-table > .card > p-table > .p-datatable-sm > .p-datatable-header > .p-d-flex > .p-input-icon-left > .p-inputtext'
    ).type(nombre);
    cy.get('.p-button-text').click();
    cy.contains('Aceptar OT').click();
    cy.get('.btn-primary').click();
  });

  it.only('Aceptar OT Contratista', () => {
    cy.login('nadmincontrato1', '123', 'Administrador EECC');
    cy.contains('Listar OTs').click();
    cy.get(
      '#p-tabpanel-0 > app-table > .card > p-table > .p-datatable-sm > .p-datatable-header > .p-d-flex > .p-input-icon-left > .p-inputtext'
    ).type(nombre);
    cy.get('.p-button-text').click();
    cy.contains('Asignar Supervisor de trabajos').click();
    cy.get('.form-control').select('Gustavo NOKIA Contreras Cortes');
    cy.get('.btn-primary').click();
  });
});
