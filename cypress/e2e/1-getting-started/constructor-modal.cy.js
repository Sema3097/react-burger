const { testURL } = require("../../support/data");
const { burgerBun } = require("../../support/data");
const { dataTestidBurgerConstructor } = require("../../support/data");
const { preloaderContainer } = require("../../support/data");
const { OrderDetails_container } = require("../../support/data");

/* eslint-disable cypress/no-unnecessary-waiting */
describe("BurgerConstructor Modal Tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      statusCode: 200,
      body: {
        data: [
          {
            _id: "bun-1",
            name: "Булка тестовая",
            type: "bun",
            price: 50,
            image: "https://via.placeholder.com/150",
          },
        ],
      },
    });
    cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", {
      statusCode: 200,
      body: { user: { email: "test@test.com", name: "Test User" } },
    });
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      statusCode: 200,
      body: { success: true, name: "Test Order", order: { number: 12345 } },
    }).as("createOrder");
    localStorage.setItem("accessToken", "fake-valid-token");
    cy.visit(testURL);
  });

  it("should open the modal with preloader on order button click", () => {
    cy.get(burgerBun).should("exist");
    const dataTransfer = new DataTransfer();
    cy.get(burgerBun).trigger("dragstart", {
      dataTransfer,
    });
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get(dataTestidBurgerConstructor)
      .trigger("drop", { dataTransfer })
      .trigger("dragend", { dataTransfer });
    cy.get("button").contains("Оформить заказ").click();
    cy.get('[data-test="modal"]').should("be.visible");
    cy.get(preloaderContainer, { timeout: 15000 }).should("be.visible");
    cy.wait("@createOrder", { timeout: 15000 }).then(() => {
      cy.get(OrderDetails_container).should("be.visible");
      cy.get('[data-test="OrderDetails_container"] h1').should(
        "contain",
        "12345"
      );
      cy.get('[data-test="OrderDetails_container"] h3').should(
        "contain",
        "идентификатор заказа"
      );
      cy.get('[data-test="OrderDetails_container"] p').should(
        "contain",
        "Ваш заказ начали готовить"
      );
    });
  });

  it("should close the modal when clicking on CloseIcon", () => {
    cy.get(burgerBun).should("exist");
    const dataTransfer = new DataTransfer();
    cy.get(burgerBun).trigger("dragstart", {
      dataTransfer,
    });
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get(dataTestidBurgerConstructor)
      .trigger("drop", { dataTransfer })
      .trigger("dragend", { dataTransfer });
    cy.get("button").contains("Оформить заказ").click();
    cy.get('[data-test="modal"]').should("be.visible");
    cy.get(preloaderContainer, { timeout: 17500 }).should("be.visible");
    cy.wait("@createOrder", { timeout: 17500 }).then(() => {
      cy.get(OrderDetails_container).should("be.visible");
      cy.get('[data-test="OrderDetails_container"] h1').should(
        "contain",
        "12345"
      );
      cy.get('[data-test="OrderDetails_container"] h3').should(
        "contain",
        "идентификатор заказа"
      );
      cy.get('[data-test="OrderDetails_container"] p').should(
        "contain",
        "Ваш заказ начали готовить"
      );
    });
    cy.get(".uikit_cross__t9Hcn").click({ force: true });
    cy.get('[data-test="modal"]').should("not.exist");
  });

  it("should close the modal when clicking on ModalOverlay", () => {
    cy.get(burgerBun).should("exist");
    const dataTransfer = new DataTransfer();
    cy.get(burgerBun).trigger("dragstart", {
      dataTransfer,
    });
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get(dataTestidBurgerConstructor)
      .trigger("drop", { dataTransfer })
      .trigger("dragend", { dataTransfer });
    cy.get("button").contains("Оформить заказ").click();
    cy.get('[data-test="modal"]').should("be.visible");
    cy.get(preloaderContainer, { timeout: 20000 }).should("be.visible");
    cy.wait("@createOrder", { timeout: 20000 }).then(() => {
      cy.get(OrderDetails_container).should("be.visible");
      cy.get('[data-test="OrderDetails_container"] h1').should(
        "contain",
        "12345"
      );
      cy.get('[data-test="OrderDetails_container"] h3').should(
        "contain",
        "идентификатор заказа"
      );
      cy.get('[data-test="OrderDetails_container"] p').should(
        "contain",
        "Ваш заказ начали готовить"
      );
    });
    cy.get('[data-test="modal-overlay"]').click({ force: true });
    cy.wait(2000);
    cy.get('[data-test="modal"]').should("not.exist");
  });

  it("should close the modal when pressing the Escape key", () => {
    cy.get(burgerBun).should("exist");
    const dataTransfer = new DataTransfer();
    cy.get(burgerBun).trigger("dragstart", {
      dataTransfer,
    });
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get(dataTestidBurgerConstructor)
      .trigger("drop", { dataTransfer })
      .trigger("dragend", { dataTransfer });
    cy.get("button").contains("Оформить заказ").click();
    cy.get('[data-test="modal"]').should("be.visible");
    cy.get(preloaderContainer, { timeout: 22500 }).should("be.visible");
    cy.wait("@createOrder", { timeout: 22500 }).then(() => {
      cy.get(OrderDetails_container).should("be.visible");
      cy.get('[data-test="OrderDetails_container"] h1').should(
        "contain",
        "12345"
      );
      cy.get('[data-test="OrderDetails_container"] h3').should(
        "contain",
        "идентификатор заказа"
      );
      cy.get('[data-test="OrderDetails_container"] p').should(
        "contain",
        "Ваш заказ начали готовить"
      );
    });
    cy.get("body").type("{esc}");
    cy.wait(2000);
    cy.get('[data-test="modal"]').should("not.exist");
  });
});
