describe("app", () => {
  describe("home", () => {
    it("clicking home button travels to app route", () => {
      cy.visit("/");
      cy.getByData("button").click();
      cy.url().should("include", "/app");
    });
  });

  describe("habit list", () => {
    beforeEach(() => {
      cy.visit("/app");
    });

    it("allows users to add a frequency/time habit", () => {
      cy.getByData("Meditate").wait(200).click();
      cy.getByData("modal-title").should("contain.text", "Meditate");

      cy.getByData("input").type("2");
      cy.getByData("input-select").select("hours");
      cy.getByData("input-dropdown").select(6);
      cy.getByData("submit-btn").click();

      cy.getByData("Meditate-drawer-card-name").should(
        "contain.text",
        "Meditate"
      );
      cy.getByData("Meditate-drawer-card")
        .first()
        .should("contain.text", "14 hours / week")
        .and("contain.text", "daily");

      cy.getByData("btn-calculate").wait(200).click();

      cy.getByData("Meditate-grid-card");
      cy.getByData("Meditate-grid-card-name").should("have.text", "Meditate");
      cy.getByData("Meditate-grid-card-value").should("have.text", "730 hours");
      cy.getByData("Meditate-grid-card-fun").should(
        "have.text",
        "Or a lot of stress reduced!"
      );
    });

    it("allows users to add a liquid habit", () => {
      cy.getByData("Drink Water").wait(200).click();
      cy.getByData("modal-title").should("contain.text", "Drink Water");

      cy.getByData("input").type("2");
      cy.getByData("input-select").select("l");
      cy.getByData("submit-btn").click();

      cy.getByData("Drink Water-drawer-card-name").should(
        "contain.text",
        "Drink Water"
      );
      cy.getByData("Drink Water-drawer-card")
        .first()
        .should("contain.text", "14L / week")
        .and("contain.text", "daily");

      cy.getByData("btn-calculate").wait(200).click();

      cy.getByData("Drink Water-grid-card");
      cy.getByData("Drink Water-grid-card-name").should(
        "have.text",
        "Drink Water"
      );
      cy.getByData("Drink Water-grid-card-value").should("have.text", "730L");
      cy.getByData("Drink Water-grid-card-fun").should(
        "have.text",
        "Or 14.6M raindrops!"
      );
    });
  });
});
