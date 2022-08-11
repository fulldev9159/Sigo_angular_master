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

declare namespace Cypress {
  interface Chainable {
    _login(username: string, password: string): void;
    _select_profile(profile: string): void;
    _check_input(selector: string, validator: string): void;
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
