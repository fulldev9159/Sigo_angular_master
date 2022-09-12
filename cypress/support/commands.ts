/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => {  })
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

interface DATA_TABLE_SERVICE_UO {
  fila: number;
  servicio: string;
  tipo_servicio: string;
  cantidad_servicio: number;
  precio: string;
  total: string;
  uo: string;
  actividad: string;
  uo_precio: string;
  uo_total: string;
  cantidad_uo: number;
}

interface DATA_TABLE_UO {
  fila: number;
  uo: string;
  actividad: string;
  uo_precio: string;
  uo_total: string;
  cantidad_uo: number;
}

interface DATA_TABLE {
  contrato: string;
  agencia: string;
  proveedor: string;
  totalServicios: string;
  totalUOs: string;
  total: string;
  items: {
    nombre: string;
    precio: string;
    cantidad: string;
    total: string;
    tipo_servicio: string;
    actividad: string;
    unidad_obras: {
      nombre: string;
      precio: string;
      cantidad: string;
      total: string;
    }[];
  }[];
}
declare namespace Cypress {
  interface Chainable {
    _login(username: string, password: string): void;
    _select_profile(profile: string): void;
    _check_input(selector: string, validator: string): void;
    _check_dropdown_required(selector: string): void;
    _select_dropdown(selector: string, item: string): void;
    _check_table_cub_service_uo(servicio_uo: DATA_TABLE_SERVICE_UO): void;
    _check_table_cub_uo(uo: DATA_TABLE_UO): void;
    _filter_table(name: string, search: string): void;
    _change_cantidad_servicio(servicio_cod: string, cantidad: string): void;
    _change_cantidad_uo(column: number, uo_cod: string, cantidad: string): void;
    _add_service_carrito(
      actividad: string,
      tipo_servicio: string,
      servicio: string,
      uo: string
    ): void;
    _check_table_servicio_input(data: DATA_TABLE): void;
    _check_table_servicio_view(data: DATA_TABLE): void;
  }
}
Cypress.Commands.add('_login', (username, password) => {
  cy.get('input[name="username"]').clear().type(username);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('#login-button').click();
});

Cypress.Commands.add('_select_profile', profile => {
  cy.get('#select_profile').click();
  cy.get('li.p-ripple').each(($el, index, $list) => {
    if ($el.text() === profile) {
      $el.trigger('click');
    }
  });
  cy.get('#perfil-select-button').click();
});

Cypress.Commands.add('_check_input', (selector, validator) => {
  cy.get(selector).should('be.enabled');
  if (validator === 'required') {
    cy.get(selector).type('das');
    cy.get(selector).clear();
    cy.get(selector + '+zwc-input-alert>small').contains(
      'Este campo es requerido'
    );
  }
});

Cypress.Commands.add('_check_dropdown_required', selector => {
  cy.get(selector).click();
  cy.get(selector).click();
  cy.get(selector + '+zwc-input-alert>small').contains(
    'Este campo es requerido'
  );
});

Cypress.Commands.add('_select_dropdown', (selector, item) => {
  cy.get(selector).click().contains('ul li > span', item).click();
});

Cypress.Commands.add('_check_table_cub_service_uo', servicio_uo => {
  const fila = `.carrito-container> table > tbody > tr:nth-child(${servicio_uo.fila}) > td`;
  cy.get(fila).eq(0).contains(servicio_uo.servicio.split('-')[0].trim());
  cy.get(fila).eq(1).contains(servicio_uo.servicio.split('-')[1].trim());
  cy.get(fila).eq(2).contains(servicio_uo.tipo_servicio);
  cy.get(fila + ':nth-child(4)>p-inputnumber>span>input')
    .invoke('val')
    .then(val => {
      expect(val).to.eql(servicio_uo.cantidad_servicio.toFixed(2));
    });
  cy.get(fila).eq(4).contains(servicio_uo.precio);

  cy.get(fila).eq(7).contains(servicio_uo.uo.split('-')[0].trim());
  cy.get(fila).eq(8).contains(servicio_uo.uo.split('-')[1].trim());
  cy.get(fila).eq(9).contains(servicio_uo.actividad);
  cy.get(fila + ':nth-child(11)>p-inputnumber>span>input')
    .invoke('val')
    .then(val => {
      expect(val).to.eql(servicio_uo.cantidad_uo.toFixed(2));
    });
  cy.get(fila).eq(11).contains(servicio_uo.uo_precio);
  cy.get(fila).eq(12).contains(servicio_uo.uo_total);
});

Cypress.Commands.add('_check_table_cub_uo', uo => {
  const fila = `.carrito-container> table > tbody > tr:nth-child(${uo.fila}) > td`;
  cy.get(fila).eq(0).contains(uo.uo.split('-')[0].trim());
  cy.get(fila).eq(1).contains(uo.uo.split('-')[1].trim());
  cy.get(fila).eq(2).contains(uo.actividad);
  cy.get(fila + ':nth-child(4)>p-inputnumber>span>input')
    .invoke('val')
    .then(val => {
      expect(val).to.eql(uo.cantidad_uo.toFixed(2));
    });
  cy.get(fila).eq(4).contains(uo.uo_precio);
  cy.get(fila).eq(5).contains(uo.uo_total);
});

Cypress.Commands.add('_filter_table', (name, search) => {
  cy.get(`input[name='${name}']`).type(`{del}${search}`);
});

Cypress.Commands.add('_change_cantidad_servicio', (servicio_cod, cantidad) => {
  cy.get('table')
    .contains('td', servicio_cod)
    .siblings()
    .eq(2)
    .find('p-inputnumber>span>input')
    .clear()
    .type(`${cantidad}{enter}`);
});

Cypress.Commands.add('_change_cantidad_uo', (column, uo_cod, cantidad) => {
  cy.get('table')
    .contains('td', uo_cod)
    .siblings()
    .eq(column)
    .find('p-inputnumber>span>input')
    .clear()
    .type(`${cantidad}{enter}`);
});

Cypress.Commands.add(
  '_add_service_carrito',
  (actividad: string, tipo_servicio: string, servicio: string, uo: string) => {
    cy.get('input[name="input-nombre-cubicacion"]').click();
    cy.wait(1000).then(() => {
      cy._select_dropdown('#select-actividad', actividad);
    });
    cy.get('input[name="input-nombre-cubicacion"]').click();
    cy.wait(1000).then(() => {
      cy._select_dropdown('#select-tipo-servicio', tipo_servicio);
    });
    cy.get('input[name="input-nombre-cubicacion"]').click();
    cy.wait(1000).then(() => {
      cy._select_dropdown('#select-servicio', servicio);
    });

    cy.get('input[name="input-nombre-cubicacion"]').click();
    cy.wait(1000).then(() => {
      cy._select_dropdown('#select-unidad-obra', uo);
      cy.get('input[name="input-nombre-cubicacion"]').click();
      cy.wait(1000).then(() => {
        cy.get('#agregar-button').click();
      });
    });
  }
);

Cypress.Commands.add('_check_table_servicio_input', data => {
  data.items.forEach(servicio => {
    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(0)
      .contains(servicio.nombre.split('-')[1].trim());

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(1)
      .contains(servicio.tipo_servicio);

    cy.get('table')
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

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(3)
      .contains(servicio.precio);

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(4)
      .contains(servicio.total);

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(6)
      .contains(servicio.unidad_obras[0].nombre.split('-')[0].trim());

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(7)
      .contains(servicio.unidad_obras[0].nombre.split('-')[1].trim());

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(8)
      .contains(servicio.actividad);

    if (servicio.unidad_obras[0].nombre !== '0 - SIN UO') {
      cy.get('table')
        .contains('td', servicio.unidad_obras[0].nombre.split('-')[0].trim())
        .siblings()
        .eq(9)
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

      cy.get('table')
        .contains('td', servicio.unidad_obras[0].nombre.split('-')[0].trim())
        .siblings()
        .eq(10)
        .contains(servicio.unidad_obras[0].precio);

      cy.get('table')
        .contains('td', servicio.unidad_obras[0].nombre.split('-')[0].trim())
        .siblings()
        .eq(11)
        .contains(servicio.unidad_obras[0].total);

      servicio.unidad_obras.forEach((uo, index) => {
        if (index !== 0) {
          cy.get('table')
            .contains('td', uo.nombre.split('-')[0].trim())
            .siblings()
            .eq(0)
            .contains(uo.nombre.split('-')[1].trim());

          cy.get('table')
            .contains('td', uo.nombre.split('-')[0].trim())
            .siblings()
            .eq(1)
            .contains(servicio.actividad);

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

            cy.get('table')
              .contains('td', uo.nombre.split('-')[0].trim())
              .siblings()
              .eq(3)
              .contains(uo.precio);

            cy.get('table')
              .contains('td', uo.nombre.split('-')[0].trim())
              .siblings()
              .eq(4)
              .contains(uo.total);
          }
        }
      });
    }
  });

  cy.get('td[class="total-servicio-monto"]').contains(data.totalServicios);
  cy.get('td[class="total-uo-monto"]').contains(data.totalUOs);
  cy.get('td[class="total-cubicacion-monto"]').contains(data.total);
});

Cypress.Commands.add('_check_table_servicio_view', data => {
  data.items.forEach(servicio => {
    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(0)
      .contains(servicio.nombre.split('-')[1].trim());

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(1)
      .contains(servicio.tipo_servicio);

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(2)
      .contains(servicio.cantidad);

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(3)
      .contains(servicio.precio);

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(4)
      .contains(servicio.total);

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(5)
      .contains(servicio.unidad_obras[0].nombre.split('-')[0].trim());

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(6)
      .contains(servicio.unidad_obras[0].nombre.split('-')[1].trim());

    cy.get('table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(7)
      .contains(servicio.actividad);

    if (servicio.unidad_obras[0].nombre !== '0 - SIN UO') {
      cy.get('table')
        .contains('td', servicio.nombre.split('-')[0].trim())
        .siblings()
        .eq(8)
        .contains(servicio.unidad_obras[0].cantidad);

      cy.get('table')
        .contains('td', servicio.nombre.split('-')[0].trim())
        .siblings()
        .eq(9)
        .contains(servicio.unidad_obras[0].precio);

      cy.get('table')
        .contains('td', servicio.nombre.split('-')[0].trim())
        .siblings()
        .eq(10)
        .contains(servicio.unidad_obras[0].total);
    }

    servicio.unidad_obras.forEach((uo, index) => {
      if (index !== 0) {
        cy.get('table')
          .contains('td', uo.nombre.split('-')[0].trim())
          .siblings()
          .eq(0)
          .contains(uo.nombre.split('-')[1].trim());

        cy.get('table')
          .contains('td', uo.nombre.split('-')[0].trim())
          .siblings()
          .eq(1)
          .contains(servicio.actividad);

        if (uo.nombre !== '0 - SIN UO') {
          cy.get('table')
            .contains('td', uo.nombre.split('-')[0].trim())
            .siblings()
            .eq(2)
            .contains(uo.cantidad);

          cy.get('table')
            .contains('td', uo.nombre.split('-')[0].trim())
            .siblings()
            .eq(3)
            .contains(uo.precio);

          cy.get('table')
            .contains('td', uo.nombre.split('-')[0].trim())
            .siblings()
            .eq(4)
            .contains(uo.total);
        }
      }
    });
  });

  cy.get('td[class="total-servicio-monto"]').contains(data.totalServicios);
  cy.get('td[class="total-uo-monto"]').contains(data.totalUOs);
  cy.get('td[class="total-cubicacion-monto"]').contains(data.total);
});
