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
    _logout(): void;
    _select_profile(profile: string): void;
    _check_input(selector: string, validator: string): void;
    _check_dropdown_required(selector: string): void;
    _check_dropdown_data(selector: string, data: any, order: string): void;
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
    _check_dropdown_async(
      url: string,
      first_selector: string,
      seleccion: string,
      second_selector: string,
      datos: any
    ): void;
    _check_dropdown(selector: string, datos: any): void;
    _select_dropdown_async(
      url: string,
      first_selector: string,
      first_seleccion: string,
      second_selector: string,
      second_seleccion: string
    ): void;
    _check_info_base_ot(
      tipo_contrato: string,
      nombre_contrato: string,
      cub_id: number,
      cub_nom: string,
      etapa: string,
      estado: string,
      propietario: string,
      responsable: string
    ): void;
  }
}
Cypress.Commands.add('_login', (username, password) => {
  cy.intercept('POST', '/login/start').as('loginHTTTP');
  cy.get('input[name="username"]').clear().type(username);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('#login-button').click();
  cy.wait('@loginHTTTP').then(() => {
    cy.get('.p-inputtext').type('asdas');
    cy.get('#login-button').click();
    cy.wait(500);
  });
});

Cypress.Commands.add('_logout', () => {
  cy.get('#logout').click();
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
  cy.get('.pi-spinner', { timeout: 5000 }).should('not.exist');
  cy.get(selector + '>div>div>.p-dropdown-items-wrapper', {
    timeout: 5000,
  }).should('not.exist');
  cy.get(selector).click();
  cy.get(selector).click();
  cy.get(selector + '>div>div>.p-dropdown-items-wrapper', {
    timeout: 5000,
  }).should('not.exist');
  cy.get(selector + '+zwc-input-alert>small').contains(
    'Este campo es requerido'
  );
});

Cypress.Commands.add('_check_dropdown_data', (selector, data, order) => {
  let indexSplit = order.split('.');
  indexSplit.length;
  let datos = data
    .sort((a: any, b: any) => {
      let indexSplit = order.split('.');
      if (indexSplit.length === 1)
        return a[indexSplit[0]] > b[indexSplit[0]] ? 1 : -1;
      if (indexSplit.length === 2)
        return a[indexSplit[0]][indexSplit[1]] > b[indexSplit[0]][indexSplit[1]]
          ? 1
          : -1;
      return a;
    })
    .map((value: any) => {
      let indexSplit = order.split('.');
      if (indexSplit.length === 1) return value[indexSplit[0]];
      if (indexSplit.length === 2) return value[indexSplit[0]][indexSplit[1]];
    });
  cy.get(selector).click();
  cy.get('li.p-ripple').each(($el, index, $list) => {
    expect($el.text()).eq(datos[index]);
  });
  cy.get(selector).click();
  cy.get(selector + '>div>div>.p-dropdown-items-wrapper', {
    timeout: 5000,
  }).should('not.exist');
});

Cypress.Commands.add('_select_dropdown', (selector, item) => {
  cy.get('.pi-spinner', { timeout: 5000 }).should('not.exist');

  cy.get(selector + '>div>div>.p-dropdown-items-wrapper', {
    timeout: 5000,
  }).should('not.exist');
  cy.get(selector)
    .click()
    .contains('ul li > span', item, { timeout: 118000 })
    .click();
  cy.get(selector + '>.p-dropdown>span').contains(item, { timeout: 8000 });
  cy.get(selector + '>div>div>.p-dropdown-items-wrapper', {
    timeout: 5000,
  }).should('not.exist');
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
  // cy.get(`input[name='${name}']`).clear();
  // cy.get(`input[name='${name}']`).type(`{del}${search}`);
  cy.get('.p-inputtext').clear();
  cy.get('.p-inputtext').type(`{del}${search}`);
  cy.wait(500);
});

Cypress.Commands.add('_change_cantidad_servicio', (servicio_cod, cantidad) => {
  cy.get('.carrito-container>table')
    .contains('td', servicio_cod)
    .siblings()
    .eq(2)
    .find('p-inputnumber>span>input')
    .clear()
    .type(`${cantidad}{enter}`);
});

Cypress.Commands.add('_change_cantidad_uo', (column, uo_cod, cantidad) => {
  cy.get('.carrito-container>table')
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
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-actividad', actividad);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-tipo-servicio', tipo_servicio);

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-servicio', servicio);

    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy._select_dropdown('#select-unidad-obra', uo);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('#agregar-button').click();
  }
);

Cypress.Commands.add('_check_table_servicio_input', data => {
  data.items.forEach(servicio => {
    cy.get('.carrito-container>table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(0)
      .contains(servicio.nombre.split('-')[1].trim());

    cy.get('.carrito-container>table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(1)
      .contains(servicio.tipo_servicio);

    cy.get('.carrito-container>table')
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

    cy.get('.carrito-container>table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(3)
      .contains(servicio.precio);

    cy.get('.carrito-container>table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(4)
      .contains(servicio.total);

    servicio.unidad_obras.forEach((uo, index) => {
      cy.get('.carrito-container>table')
        .contains(
          'td',
          new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
        )
        .siblings()
        .eq(0)
        .contains(uo.nombre.split('-')[1].trim());

      // cy.get('.carrito-container>table')
      //   .contains(
      //     'td',
      //     new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
      //   )
      //   .siblings()
      //   .eq(1)
      //   .contains(servicio.actividad);

      if (uo.nombre !== '0 - SIN UO') {
        cy.get('.carrito-container>table')
          .contains(
            'td',
            new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
          )
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

        cy.get('.carrito-container>table')
          .contains(
            'td',
            new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
          )
          .siblings()
          .eq(3)
          .contains(uo.precio);

        cy.get('.carrito-container>table')
          .contains(
            'td',
            new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
          )
          .siblings()
          .eq(4)
          .contains(uo.total);
      }
    });
  });

  cy.get('td[id="total-servicio-monto"]').contains(data.totalServicios);
  cy.get('td[id="total-uo-monto"]').contains(data.totalUOs);
  cy.get('td[id="total-cubicacion-monto"]').contains(data.total);
});

Cypress.Commands.add('_check_table_servicio_view', data => {
  data.items.forEach(servicio => {
    cy.get('.carrito-container>table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(0)
      .contains(servicio.nombre.split('-')[1].trim());

    // cy.get('.carrito-container>table')
    //   .contains('td', servicio.nombre.split('-')[0].trim())
    //   .siblings()
    //   .eq(1)
    //   .contains(servicio.tipo_servicio);

    cy.get('.carrito-container>table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(2)
      .contains(servicio.cantidad);

    cy.get('.carrito-container>table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(3)
      .contains(servicio.precio);

    cy.get('.carrito-container>table')
      .contains('td', servicio.nombre.split('-')[0].trim())
      .siblings()
      .eq(4)
      .contains(servicio.total);

    servicio.unidad_obras.forEach((uo, index) => {
      cy.get('.carrito-container>table')
        .contains(
          'td',
          new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
        )
        .siblings()
        .eq(0)
        .contains(uo.nombre.split('-')[1].trim());

      if (uo.nombre !== '0 - SIN UO') {
        // cy.get('.carrito-container>table')
        //   .contains(
        //     'td',
        //     new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
        //   )
        //   .siblings()
        //   .eq(1)
        //   .contains(servicio.actividad);

        cy.get('.carrito-container>table')
          .contains(
            'td',
            new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
          )
          .siblings()
          .eq(2)
          .contains(uo.cantidad);

        cy.get('.carrito-container>table')
          .contains(
            'td',
            new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
          )
          .siblings()
          .eq(3)
          .contains(uo.precio);

        cy.get('.carrito-container>table')
          .contains(
            'td',
            new RegExp('^' + uo.nombre.split('-')[0].trim() + '$', 'g')
          )
          .siblings()
          .eq(4)
          .contains(uo.total);
      }
    });
  });

  cy.get('td[id="total-servicio-monto"]').contains(data.totalServicios);
  cy.get('td[id="total-uo-monto"]').contains(data.totalUOs);
  cy.get('td[id="total-cubicacion-monto"]').contains(data.total);
});

Cypress.Commands.add(
  '_check_dropdown_async',
  (
    url: string,
    first_selector: string,
    seleccion: string,
    second_selector: string,
    datos: any
  ) => {
    cy.intercept('POST', url).as('HTTPRESPONSE');
    cy._select_dropdown(first_selector, seleccion);

    cy.wait('@HTTPRESPONSE').then(() => {
      cy._check_dropdown_required(second_selector);
      cy.get(second_selector).click();
      cy.get('li.p-ripple').each(($el, index, $list) => {
        expect($el.text()).eq(datos[index]);
      });
      cy.get(second_selector).click();
    });
  }
);

Cypress.Commands.add('_check_dropdown', (selector: string, datos: any) => {
  cy._check_dropdown_required(selector);

  cy.get(selector).click();
  cy.get('li.p-ripple').each(($el, index, $list) => {
    expect($el.text()).eq(datos[index]);
  });
  cy.get(selector).click();
});

Cypress.Commands.add(
  '_select_dropdown_async',
  (
    url: string,
    first_selector: string,
    first_seleccion: string,
    second_selector: string,
    second_seleccion: string
  ) => {
    cy.intercept('POST', url).as('HTTPRESPONSE');
    cy._select_dropdown(first_selector, first_seleccion);
    cy.get(first_selector).click();
    cy.wait('@HTTPRESPONSE').then(() => {
      cy._select_dropdown(second_selector, second_seleccion);
      cy.get(second_selector).click();
    });
  }
);

Cypress.Commands.add(
  '_check_info_base_ot',
  (
    tipo_contrato,
    nombre_contrato,
    cub_id,
    cub_nom,
    etapa,
    estado,
    propietario,
    responsable
  ) => {
    let base = '.table-info> :nth-child(1) > :nth-child(2)';
    cy.get(
      '.info-base > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(2)'
    ).contains(tipo_contrato);
    cy.get(
      '.info-base > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(2)'
    ).contains(nombre_contrato);
    cy.get(
      '.info-base > :nth-child(1) > :nth-child(2) > :nth-child(3) > :nth-child(2)'
    ).contains(cub_id);
    cy.get(
      '.info-base > :nth-child(1) > :nth-child(2) > :nth-child(4) > :nth-child(2)'
    ).contains(cub_nom);
    cy.get(
      '.info-base > :nth-child(1) > :nth-child(2) > :nth-child(7) > :nth-child(2)'
    ).contains(etapa);
    cy.get(
      '.info-base > :nth-child(1) > :nth-child(2) > :nth-child(8) > :nth-child(2)'
    ).contains(estado);
    cy.get(
      '.info-base > :nth-child(1) > :nth-child(2) > :nth-child(9) > :nth-child(2)'
    ).contains(propietario);
    cy.get(
      '.info-base > :nth-child(1) > :nth-child(2) > :nth-child(10) > :nth-child(2)'
    ).contains(responsable);
  }
);
