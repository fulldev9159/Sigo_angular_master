describe('Flujo OT', () => {
  const nombre = 'OT BUCLE informe avance 1';

  beforeEach(() => {
    cy.viewport(1500, 1700);
  });

  it('Crear cubicaciones', () => {
    cy.login('msupervisor1', '123', 'Supervisor (Telefónica)');
    cy.contains('Listar OTs').click();
    cy.get(
      '#p-tabpanel-0 > app-table > .card > p-table > .p-datatable-sm > .p-datatable-header > .p-d-flex > .p-input-icon-left > .p-inputtext'
    ).type(nombre);
  });
});
