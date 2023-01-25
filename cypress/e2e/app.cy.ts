describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("clicking home button travels to app route", () => {
    cy.getByData("button").should("exist").click();
    cy.url().should("include", "/app");
  });

  it("pressing a card open the modal", () => {
    cy.visit("http://localhost:3000/app");
    cy.getByData("Meditate").should("exist").wait(150).click();
    cy.getByData("modal-title").should("exist").should("contain", "Meditate");
  });
});
