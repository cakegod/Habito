describe("app", () => {
  describe("home", () => {
    it("clicking home button travels to app route", () => {
      cy.visit("/");
      cy.getByData("button").click();
      cy.url().should("include", "/app");
    });

    it("clicking logo travels to home", () => {
      cy.visit("/app");
      cy.getByData("logo").click();
      cy.url().should("include", "/");
    });
  });

  describe("habit list", () => {
    beforeEach(() => {
      cy.visit("/app");
    });

    it("allows users to add a frequency/time habit", () => {
      cy.getByData("Meditate").wait(300).click();

      // Submit without input
      cy.getByData("submit-btn").click();
      cy.getByData("modal-title");
      cy.getByData("Meditate-drawer-card", false);

      // Submit with invalid input
      cy.simpleInput("Meditate", "something");
      cy.getByData("modal-title");
      cy.getByData("Meditate-drawer-card", false);

      // Submit with valid inputs
      cy.simpleInput("Meditate", "2", "hours");
      cy.getByData("input-dropdown").select(6);
      cy.getByData("submit-btn").click();

      // Check card drawer content
      cy.getByData("Meditate-drawer-card").within(() => {
        cy.get("p").should("have.text", "Meditate");
        cy.get("span").eq(1).should("have.text", "14 hours / week");
        cy.get("span").eq(2).should("have.text", "daily");
      });

      cy.getByData("btn-calculate").wait(200).click();

      // Check card in grid content
      cy.getByData("Meditate-grid-card").within(() => {
        cy.get("p").eq(0).should("have.text", "Meditate");
        cy.get("p").eq(1).should("have.text", "730 hours");
        cy.get("p").eq(2).should("have.text", "Or a lot of stress reduced!");
      });
    });

    it("allows users to add a liquid habit", () => {
      cy.getByData("Drink Water").wait(200).click();

      // Submit without input
      cy.getByData("submit-btn").click();
      cy.getByData("modal-title");
      cy.getByData("Drink Water-drawer-card", false);

      // Submit with invalid input
      cy.simpleInput("Drink Water", "something");
      cy.getByData("modal-title");
      cy.getByData("Drink Water-drawer-card", false);

      // Submit with valid inputs
      cy.simpleInput("Drink Water", "2", "l");
      cy.getByData("submit-btn").click();

      // Check card drawer content
      cy.getByData("Drink Water-drawer-card").within(() => {
        cy.get("p").should("have.text", "Drink Water");
        cy.get("span").eq(1).should("have.text", "14L / week");
        cy.get("span").eq(2).should("have.text", "daily");
      });

      cy.getByData("btn-calculate").wait(200).click();

      // Check card in grid content
      cy.getByData("Drink Water-grid-card").within(() => {
        cy.get("p").eq(0).should("have.text", "Drink Water");
        cy.get("p").eq(1).should("have.text", "730L");
        cy.get("p").eq(2).should("have.text", "Or 14.6M raindrops!");
      });
    });
  });
});
