describe('BurgerIngredients component', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); 
  });

  it('should navigate to the correct route and open the modal on Link click', () => {
    cy.get('h1').contains('Булки').scrollIntoView();

    cy.get('[class*="burger_menu_inner"] a').first().click();

    cy.url().should('include', '/ingredients/');

    cy.get('[data-test="modal"]').should('be.visible').within(() => {
      cy.get('h2').should('not.contain', 'Подождите...').and('exist');

      cy.get('[data-test="ingredient-details"]').should('exist');
    });
  });

  it('should close the modal when clicking on the overlay or CloseIcon or pressing Escape', () => {
    cy.get('[class*="burger_menu_inner"] a').first().click();
    cy.url().should('include', '/ingredients/');
  
    cy.get('[data-test="modal"]').should('be.visible');
  
    cy.get('[data-test="modal-overlay"]').click({ force: true });
  
    cy.get('[data-test="modal"]').should('not.exist');
    cy.url().should('not.include', '/ingredients/');
  
    cy.get('[class*="burger_menu_inner"] a').first().click();
    cy.url().should('include', '/ingredients/');
  
    cy.get('[data-test="modal"]')
      .should('be.visible')
      .find('.uikit_cross__t9Hcn') 
      .should('be.visible')  
      .click();
  
    cy.get('[data-test="modal"]').should('not.exist');
    cy.url().should('not.include', '/ingredients/');
  
    cy.get('[class*="burger_menu_inner"] a').first().click();
    cy.url().should('include', '/ingredients/');
  
    cy.get('body').type('{esc}');
  
    cy.get('[data-test="modal"]').should('not.exist');
    cy.url().should('not.include', '/ingredients/');
  });
});