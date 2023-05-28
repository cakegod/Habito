function checkGridCard(name: string, quantity: string, fun: string) {
  cy.getByData(`${name}-grid-card`).within(() => {
    cy.get("p").eq(0).should("have.text", name);
    cy.get("p").eq(1).should("have.text", quantity);
    cy.get("p").eq(2).should("have.text", fun);
  });
}

function checkDrawerCard(name: string, quantity: string, frequency: string) {
  cy.getByData(`${name}-drawer-card`).within(() => {
    cy.get("p").should("have.text", name);
    cy.get("span").eq(1).should("have.text", quantity);
    cy.get("span").eq(2).should("have.text", frequency);
  });
}

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

    it("allows users to add and update a frequency/time habit", () => {
      cy.getByData("Meditate").wait(500).click();

      // Shouldn't submit without input
      cy.getByData("btn-submit").click();
      cy.getByData("modal-title");
      cy.getByData("Meditate-drawer-card", false);

      // Shouldn't submit with invalid input
      cy.simpleInput("Meditate", "something");
      cy.getByData("modal-title");
      cy.getByData("Meditate-drawer-card", false);

      // Should submit with valid inputs
      cy.simpleInput("Meditate", "2", "hours");
      cy.getByData("input-dropdown").select(6);
      cy.getByData("btn-submit").click();

      // Drawer has the card with the inputted content
      checkDrawerCard("Meditate", "14 hours / week", "daily");

      cy.getByData("btn-calculate").wait(200).click();

      // Grid has the card with the inputted content
      checkGridCard("Meditate", "730 hours", "Or a lot of stress reduced!");

      // Should be able to update the card
      cy.getByData("Meditate-grid-card").wait(200).click();
      cy.getByData("input").clear();
      cy.simpleInput("Meditate", "54", "minutes");
      cy.getByData("input-dropdown").select(4);

      cy.getByData("btn-update").click();

      // Card on the grid should be updated
      checkGridCard("Meditate", "235 hours", "Or a lot of stress reduced!");

      cy.getByData("btn-info").click();

      // Card on the drawer should be updated
      checkDrawerCard("Meditate", "5 hours / week", "5 times / week");
    });

    it("allows users to add and update a liquid habit", () => {
      cy.getByData("Drink Water").wait(200).click();

      // Shouldn't submit without input
      cy.getByData("btn-submit").click();
      cy.getByData("modal-title");
      cy.getByData("Drink Water-drawer-card", false);

      // Shouldn't submit with invalid input
      cy.simpleInput("Drink Water", "something");
      cy.getByData("modal-title");
      cy.getByData("Drink Water-drawer-card", false);

      // Should submit with valid inputs
      cy.simpleInput("Drink Water", "2", "l");
      cy.getByData("btn-submit").click();

      // Drawer has the card with the inputted content
      checkDrawerCard("Drink Water", "14L / week", "daily");

      cy.getByData("btn-calculate").wait(200).click();

      // Grid has the card with the inputted content
      checkGridCard("Drink Water", "730L", "Or 14.6M raindrops!");

      // Should be able to update the card
      cy.getByData("Drink Water-grid-card").wait(200).click();
      cy.getByData("input").clear();
      cy.simpleInput("Drink Water", "20", "ml");

      cy.getByData("btn-update").click();

      // Card on the grid should be updated
      checkGridCard("Drink Water", "7.3L", "Or 146K raindrops!");

      cy.getByData("btn-info").click();

      // Card on the drawer should be updated
      checkDrawerCard("Drink Water", "140mL / week", "daily");
    });
  });
});
