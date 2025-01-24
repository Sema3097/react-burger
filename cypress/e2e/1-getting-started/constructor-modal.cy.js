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
    cy.visit("http://localhost:3000");
  });

  it("should open the modal with preloader on order button click", () => {
    cy.get('[data-testid="burger-item-bun-1"]').should("exist");
    const dataTransfer = new DataTransfer();
    cy.get('[data-testid="burger-item-bun-1"]').trigger("dragstart", {
      dataTransfer,
    });
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[data-testid="burger-constructor"]')
      .trigger("drop", { dataTransfer })
      .trigger("dragend", { dataTransfer });
    cy.get("button").contains("Оформить заказ").click();
    cy.get('[data-test="modal"]').should("be.visible");
    cy.get('[data-test="preloader_container"]', { timeout: 15000 }).should(
      "be.visible"
    );
    cy.wait("@createOrder", { timeout: 15000 }).then(() => {
      cy.get('[data-test="OrderDetails_container"]').should("be.visible");
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
    cy.get('[data-testid="burger-item-bun-1"]').should("exist");
    const dataTransfer = new DataTransfer();
    cy.get('[data-testid="burger-item-bun-1"]').trigger("dragstart", {
      dataTransfer,
    });
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[data-testid="burger-constructor"]')
      .trigger("drop", { dataTransfer })
      .trigger("dragend", { dataTransfer });
    cy.get("button").contains("Оформить заказ").click();
    cy.get('[data-test="modal"]').should("be.visible");
    cy.get('[data-test="preloader_container"]', { timeout: 15000 }).should(
      "be.visible"
    );
    cy.wait("@createOrder", { timeout: 15000 }).then(() => {
      cy.get('[data-test="OrderDetails_container"]').should("be.visible");
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
    cy.get('[data-testid="burger-item-bun-1"]').should("exist");
    const dataTransfer = new DataTransfer();
    cy.get('[data-testid="burger-item-bun-1"]').trigger("dragstart", {
      dataTransfer,
    });
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[data-testid="burger-constructor"]')
      .trigger("drop", { dataTransfer })
      .trigger("dragend", { dataTransfer });
    cy.get("button").contains("Оформить заказ").click();
    cy.get('[data-test="modal"]').should("be.visible");
    cy.get('[data-test="preloader_container"]', { timeout: 15000 }).should(
      "be.visible"
    );
    cy.wait("@createOrder", { timeout: 15000 }).then(() => {
      cy.get('[data-test="OrderDetails_container"]').should("be.visible");
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
    cy.wait(1000);
    cy.get('[data-test="modal"]').should("not.exist");
  });

  it("should close the modal when pressing the Escape key", () => {
    cy.get('[data-testid="burger-item-bun-1"]').should("exist");
    const dataTransfer = new DataTransfer();
    cy.get('[data-testid="burger-item-bun-1"]').trigger("dragstart", {
      dataTransfer,
    });
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[data-testid="burger-constructor"]')
      .trigger("drop", { dataTransfer })
      .trigger("dragend", { dataTransfer });
    cy.get("button").contains("Оформить заказ").click();
    cy.get('[data-test="modal"]').should("be.visible");
    cy.get('[data-test="preloader_container"]', { timeout: 15000 }).should(
      "be.visible"
    );
    cy.wait("@createOrder", { timeout: 15000 }).then(() => {
      cy.get('[data-test="OrderDetails_container"]').should("be.visible");
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
    cy.wait(1000);
    cy.get('[data-test="modal"]').should("not.exist");
  });
});
