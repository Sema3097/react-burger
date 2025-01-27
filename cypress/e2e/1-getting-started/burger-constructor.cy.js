const { testURL } = require("../../support/data");

/* eslint-disable cypress/unsafe-to-chain-command */
describe("Burger Constructor Drag-and-Drop", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/ingredients").as("getIngredients");

    cy.visit(testURL);

    cy.wait("@getIngredients");

    cy.get('[data-testid^="burger-item-"]').should("have.length.at.least", 1);
  });

  it("should drag a bun from the burger item list to the constructor and verify counts", () => {
    cy.get('[data-testid^="burger-item-"]').first().as("bun");

    cy.get("@bun").should("be.visible");

    cy.get("@bun")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("0");
      });

    cy.get('[data-testid="burger-constructor"]').as("constructor");

    cy.get("@bun")
      .trigger("dragstart", { force: true })
      .get("@constructor")
      .trigger("drop", { force: true });

    cy.get("@bun")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("2");
      });

    cy.get("@bun")
      .trigger("dragstart", { force: true })
      .get("@constructor")
      .trigger("drop", { force: true });

    cy.get("@bun")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("2");
      });
  });

  it("should drag other ingredients from the burger item list to the constructor and verify counts", () => {
    cy.get('[data-testid^="burger-item-"]')
      .not(":first")
      .last()
      .as("ingredient");

    cy.get("@ingredient").scrollIntoView().should("be.visible");

    cy.get("@ingredient")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("0");
      });

    cy.get('[data-testid="burger-constructor"]').as("constructor");

    cy.get("@ingredient")
      .trigger("dragstart", { force: true })
      .get("@constructor")
      .trigger("drop", { force: true });

    cy.get("@ingredient")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("1");
      });

    cy.get("@ingredient")
      .trigger("dragstart", { force: true })
      .get("@constructor")
      .trigger("drop", { force: true });

    cy.get("@ingredient")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("2");
      });
  });

  it("should correctly update counter for buns (type === bun) and other ingredients (type !== bun)", () => {
    cy.get('[data-testid^="burger-item-"]').first().as("bun");

    cy.get("@bun")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("0");
      });

    cy.get("@bun")
      .trigger("dragstart", { force: true })
      .get('[data-testid="burger-constructor"]')
      .trigger("drop", { force: true });

    cy.get("@bun")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("2");
      });

    cy.get("@bun")
      .trigger("dragstart", { force: true })
      .get('[data-testid="burger-constructor"]')
      .trigger("drop", { force: true });

    cy.get("@bun")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("2");
      });

    cy.get('[data-testid^="burger-item-"]')
      .not(":first")
      .last()
      .as("ingredient");

    cy.get("@ingredient")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("0");
      });

    cy.get("@ingredient")
      .trigger("dragstart", { force: true })
      .get('[data-testid="burger-constructor"]')
      .trigger("drop", { force: true });

    cy.get("@ingredient")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("1");
      });

    cy.get("@ingredient")
      .trigger("dragstart", { force: true })
      .get('[data-testid="burger-constructor"]')
      .trigger("drop", { force: true });

    cy.get("@ingredient")
      .find("[data-counter]")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("2");
      });
  });

  it("should correctly add buns and other ingredients in respective blocks", () => {
    cy.get('[data-testid^="burger-item-"]').first().as("bun");
    cy.get("@bun")
      .trigger("dragstart", { force: true })
      .get('[data-testid="burger-constructor"]')
      .trigger("drop", { force: true });

    cy.get('[data-testid="burger-constructor"]')
      .find(".constructor-element")
      .first()
      .should("contain.text", "(верх)");

    cy.get('[data-testid^="burger-item-"]')
      .not(":first")
      .last()
      .as("ingredient");
    cy.get("@ingredient")
      .trigger("dragstart", { force: true })
      .get('[data-testid="burger-constructor"]')
      .trigger("drop", { force: true });

    cy.get('[data-testid="burger-constructor"]')
      .find(".constructor-element")
      .last()
      .should("not.contain.text", "(верх)");
  });
});
