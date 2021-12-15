describe("Slider test", () => {
  it("Moves the slider to 600", () => {
    cy.visit("http://localhost:3000/");

    const steps = 600;
    const arrows = "{rightarrow}".repeat(steps);

    cy.get(".rc-slider-handle")
      .should("have.attr", "aria-valuenow", 0)
      .type(arrows);

    cy.get(".rc-slider-handle").should("have.attr", "aria-valuenow", 600);
  });
});

describe("Table test", () => {
  it("Visits the page, changes to table view, sorts by descending spend order", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Table");
    cy.contains("Table").click();
    cy.contains("Amount Spent");
    cy.contains("Amount Spent").click();
    cy.contains("Amount Spent").click();

    // TODO- Do some check on the table data to see if its sorted
  });
});
