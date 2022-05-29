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
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

Cypress.Commands.add('login', (username, password, perfil) => {
  cy.visit('http://localhost:4201/auth/login');
  cy.get('#text').type(username);
  cy.get('#password').type(password);
  cy.get('#login').click();

  cy.get(' app-select > select').select(perfil);
  cy.get('#login').click();
});

Cypress.Commands.add(
  'cubBase',
  (nombre, tipo_cub, contrato, agencia, proveedor) => {
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
  }
);
Cypress.Commands.add('cubFiltros', (actividad, tipo_servicio) => {
  cy.get('#actividad > app-select > select').select(actividad);
  cy.get('#tiposervicio > app-select > select').select(tipo_servicio);
});

Cypress.Commands.add('cubAddService', (servicio, uob) => {
  cy.get('#servicios > app-select > select ').select(servicio, { force: true });
  cy.get('#unidad-obra > app-select > select').select(uob);
  // cy.contains('Agregar').click();
  cy.get('#button-agregar>button').click();
  cy.wait(500);
});

Cypress.Commands.add('cubAddUOB', uob => {
  cy.get('#unidad-obra > app-select > select').select(uob);
  cy.contains('Agregar').click();
  cy.wait(500);
});

Cypress.Commands.add(
  'cubCheckTableDataServUO',
  (
    num_fila,
    servicio,
    tipo_servicio,
    cantidad_servicio,
    serv_precio,
    uo,
    actividad,
    uo_cantidad,
    uo_precio
  ) => {
    const fila = `.table-carrito > table > tbody > tr:nth-child(${num_fila}) > td`;
    cy.get(fila).eq(0).contains(servicio.split('-')[0].trim());
    cy.get(fila).eq(1).contains(servicio.split('-')[1].trim());
    cy.get(fila).eq(2).contains(tipo_servicio);
    cy.get(fila + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(cantidad_servicio);
      });
    cy.get(fila)
      .eq(4)
      .contains(
        `${formatter.format(serv_precio).toString().replace('.', ',')}`
      );
    cy.get(fila)
      .eq(5)
      .contains(
        `$${(serv_precio * cantidad_servicio).toString().replace('.', ',')}`
      );

    cy.get(fila).eq(7).contains(uo.split('-')[0].trim());
    cy.get(fila).eq(8).contains(uo.split('-')[1].trim());
    cy.get(fila).eq(9).contains(actividad);
    cy.get(fila + ':nth-child(11)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(uo_cantidad);
      });
    cy.get(fila).eq(11).contains('CLP');
    cy.get(fila)
      .eq(12)
      .contains(
        `${formatter
          .format(uo_precio)
          .toString()
          .replace('.', ',')
          .replace(',', '.')}`
      );
    cy.get(fila)
      .eq(13)
      .contains(
        `${formatter
          .format(uo_precio * uo_cantidad)
          .toString()
          .replace('.', ',')
          .replace(',', '.')}`
      );
  }
);

Cypress.Commands.add(
  'cubCheckTableDataUOB',
  (num_fila, uo, actividad, uo_cantidad, uo_precio) => {
    const fila = `.table-carrito > table > tbody > tr:nth-child(${num_fila}) > td`;

    cy.get(fila).eq(0).contains(uo.split('-')[0].trim());
    cy.get(fila).eq(1).contains(uo.split('-')[1].trim());
    cy.get(fila).eq(2).contains(actividad);
    cy.get(fila + ':nth-child(4)>app-input>input')
      .invoke('val')
      .then(val => {
        expect(parseInt(val)).to.eql(uo_cantidad);
      });
    cy.get(fila).eq(4).contains('CLP');
    cy.get(fila)
      .eq(5)
      .contains(
        `${formatter
          .format(uo_precio)
          .toString()
          .replace('.', ',')
          .replace(',', '.')}`
      );
    cy.get(fila)
      .eq(6)
      .contains(
        `${formatter
          .format(uo_precio * uo_cantidad)
          .toString()
          .replace('.', ',')
          .replace(',', '.')}`
      );
  }
);

Cypress.Commands.add('cubTablaTotales', (servicios, uobs) => {
  let total_servicos = 0;
  let total_uobs = 0;
  let total = 0;

  for (let i = 0; i < servicios.length; i++) {
    total_servicos =
      total_servicos + servicios[i].precio * servicios[i].cantidad;
  }
  for (let i = 0; i < uobs.length; i++) {
    total_uobs = total_uobs + uobs[i].precio * uobs[i].cantidad;
  }
  total = total_servicos + total_uobs;

  cy.get(
    '#table-totales>div.col-3 > table > tr:nth-child(1) > td:nth-child(2)'
  ).contains(
    `${formatter.format(total_servicos).toString().replace('.', ',')}`
  );
  cy.get(
    '#table-totales>div.col-3 > table > tr:nth-child(2) > td:nth-child(2)'
  ).contains(
    `${formatter
      .format(total_uobs)
      .toString()
      .replace('.', ',')
      .replace(',', '.')}`
  );
  cy.get(
    '#table-totales>div.col-3 > table > tr:nth-child(3) > td:nth-child(2)'
  ).contains(
    `${formatter
      .format(total)
      .toString()
      .replace('.', '-')
      .replace(',', '.')
      .replace('-', ',')}`
  );
});
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
