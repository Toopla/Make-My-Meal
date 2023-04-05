describe('Test d\'inscription', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  });

  it('Doit pouvoir remplir et soumettre le formulaire d\'inscription', () => {
    cy.get('form')
        .find('[id="username"]')
        .type('john')
        .should('have.value', 'john');
    cy.get('form')
        .find('[id="password"]')
        .type('password')
        .should('have.value', 'password');
    cy.get('form')
        .find('[id="firstname"]')
        .type('John')
        .should('have.value', 'John');
    cy.get('form')
        .find('[id="lastname"]')
        .type('Doe')
        .should('have.value', 'Doe');
    cy.get('form')
        .find('[id="adresse"]')
        .type('Paris')
        .should('have.value', 'Paris');
    cy.get('form')
        .find('[id="mail"]')
        .type('john.doe@example.com')
        .should('have.value', 'john.doe@example.com');
    cy.get('form')
        .find('[id="role"]')
        .select('client')
        .should('have.value', 'client');
    cy.get('form')
        .find('[type="submit"]')
        .click();
    cy.url().should('include', '/login');
  });

  it('Doit afficher une alerte si certains champs sont vides', () => {
    cy.get('form')
        .find('[type="submit"]')
        .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Certains champs sont vides');
    });
  });
});