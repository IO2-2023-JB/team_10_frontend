describe('User registers and logs in', () => {
  const testerId = crypto.randomUUID().substring(0, 8);
  const userEmail = `test-${testerId}@mojewidelo.pl`;
  const userNickname = `tester-${testerId}`;
  const userName = 'Tester';
  const userSurname = 'Cypressowy';

  const passwordWeak = 'passwd';
  const passwordStrong = 'Qwerty1@';

  it('registers', () => {
    cy.visit('/');
    cy.url().should('equal', `${Cypress.config().baseUrl}/login`);

    cy.findByRole('link', { name: /zarejestruj się/i }).click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/register`);

    cy.findByLabelText(/e-mail/i).type(userEmail);
    cy.findByLabelText(/nazwa użytkownika/i).type(userNickname);
    cy.findByLabelText(/imię/i).type(userName);
    cy.findByLabelText(/nazwisko/i).type(userSurname);

    cy.findByLabelText(/^hasło/i).type(passwordWeak);
    cy.findByLabelText(/powtórz hasło/i).click();
    cy.findByText(/hasło za słabe/i).should('exist');

    cy.findByLabelText(/^hasło/i)
      .clear()
      .type(passwordStrong);
    cy.findByLabelText(/powtórz hasło/i).type(passwordWeak);
    cy.findByRole('button', { name: /zarejestruj się/i }).click();
    cy.findByText(/hasła się nie zgadzają/i).should('exist');

    cy.findByLabelText(/powtórz hasło/i)
      .clear()
      .type(passwordStrong);
    cy.findByRole('button', { name: /zarejestruj się/i }).click();

    cy.url().should('equal', `${Cypress.config().baseUrl}/login`);
    cy.findByText(/pomyślnie zarejestrowano/i).should('exist');
  });

  it('logs in', () => {
    cy.visit('/login');
    cy.findByLabelText(/e-mail/i).type(userEmail);

    cy.findByLabelText(/hasło/i).type(passwordWeak);
    cy.findByRole('button', { name: /zaloguj się/i }).click();
    cy.findByText(/401/).should('exist');

    cy.findByLabelText(/hasło/i).clear().type(passwordStrong);
    cy.findByRole('button', { name: /zaloguj się/i }).click();

    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
  });

  it('views profile', () => {
    cy.login(userEmail, passwordStrong);
    cy.visit('/');
    cy.findByRole('link', { name: /twój profil/i }).click();

    cy.findByText(userName, { exact: false }).should('exist');
    cy.findByText(userSurname, { exact: false }).should('exist');
    cy.findByText(userNickname, { exact: false }).should('exist');
  });

  after(() => {
    cy.removeCurrentUser(userEmail, passwordStrong);
  });
});
