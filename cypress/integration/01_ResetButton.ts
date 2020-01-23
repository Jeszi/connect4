describe("UI", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });
  it("should find reset button", () => {
    cy.get(`div[data-test-id="reset-button"]`).should("have.length", 1);
  });
});
