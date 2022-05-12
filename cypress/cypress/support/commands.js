// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password, perfil) => {
  cy.visit('http://localhost:4201/auth/login');
  cy.get('#text').type(username);
  cy.get('#password').type(password);
  cy.get('#login').click();

  cy.get(' app-select > select').select(perfil);
  cy.get('#login').click();
});

Cypress.Commands.add(
  'createCub',
  (
    nombre,
    tipo_cub,
    contrato,
    agencia,
    proveedor,
    actividad,
    tipo_servicio,
    servicio,
    uo
  ) => {
    cy.get('#nomnbreCub>app-input>input').type(nombre);
    cy.get('#tipoCub > app-select > select').select(tipo_cub);
    cy.get('#contratosUser > app-select > select').select(contrato);
    cy.get('#agencias > app-select > select').select(agencia);
    cy.get('#proveedores > app-select > select').select(proveedor);
    cy.get('#direcciondesde > app-input > input').type('las casas norte');
    cy.get('#alturadesde > app-input > input').type('1714');
    cy.get('#direccionhasta > app-input > input').type('las casas sur');
    cy.get('#alturahasta > app-input > input').type('1817');
    cy.get('#descripcion > app-textarea > textarea').type('Cub descripción');
    cy.get('#actividad > app-select > select').select(actividad);
    cy.get('#tiposervicio > app-select > select').select(tipo_servicio);
    cy.get('#servicios > app-select > select ').select(servicio);
    cy.get('#unidad-obra > app-select > select').select(uo);
    cy.contains('Agregar').click();
    cy.get('#create-button').click();
  }
);
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
