/* eslint-disable cypress/no-unnecessary-waiting */

const { testURL } = require("../../support/data");
const { dataTestModal } = require("../../support/data");
const { burgerMenuInner } = require("../../support/data");

describe("BurgerIngredients component", () => {
  beforeEach(() => {
    cy.visit(testURL);
  });

  it("should navigate to the correct route and open the modal on Link click", () => {
    cy.get("h1").contains("Булки").scrollIntoView();

    cy.get(burgerMenuInner).first().click();
    cy.wait(500);

    cy.url().should("include", "/ingredients/");

    cy.get(dataTestModal)
      .should("be.visible")
      .within(() => {
        cy.get("h2").should("not.contain", "Подождите...").and("exist");
        cy.get('[data-test="ingredient-details"]').should("exist");
      });
  });

  it("should close the modal when clicking on the overlay or CloseIcon or pressing Escape", () => {
    cy.get(burgerMenuInner).first().click();
    cy.wait(500);
    cy.url().should("include", "/ingredients/");

    cy.get(dataTestModal).should("be.visible");

    cy.get('[data-test="modal-overlay"]').click({ force: true });
    cy.wait(500);

    cy.get(dataTestModal).should("not.exist");
    cy.url().should("not.include", "/ingredients/");

    cy.get(burgerMenuInner).first().click();
    cy.wait(500);
    cy.url().should("include", "/ingredients/");

    cy.get(dataTestModal)
      .should("be.visible")
      .find(".uikit_cross__t9Hcn")
      .should("be.visible")
      .click();
    cy.wait(500);

    cy.get(dataTestModal).should("not.exist");
    cy.url().should("not.include", "/ingredients/");

    cy.get(burgerMenuInner).first().click();
    cy.wait(500);
    cy.url().should("include", "/ingredients/");

    cy.get("body").type("{esc}");
    cy.wait(500);

    cy.get(dataTestModal).should("not.exist");
    cy.url().should("not.include", "/ingredients/");
  });
});
