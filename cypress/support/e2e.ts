/* eslint-disable @typescript-eslint/no-namespace */
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      removeCurrentUser(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.findByLabelText(/e-mail/i).type(email);
    cy.findByLabelText(/hasło/i).type(password);
    cy.findByRole('button', { name: /zaloguj się/i }).click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
  });
});

Cypress.Commands.add('removeCurrentUser', (email, password) => {
  cy.login(email, password);
  const token = localStorage.getItem('bearerToken');

  cy.request({
    url: 'https://localhost:7004/api/user',
    headers: { authorization: `Bearer ${token}` },
  }).then((response) => {
    const id = response.body['id'];
    cy.request({
      method: 'DELETE',
      url: `https://localhost:7004/api/user?id=${id}`,
      headers: { authorization: `Bearer ${token}` },
    });
  });
});
