/// <reference types="cypress" />

describe("renders the departures", () => {
  it("map renders correctly", () => {
    cy.visit("/");

    cy.get('[data-testid="departure-station"]').should("be.visible");
    cy.get('[data-testid="departure-item"]').should("be.visible");
  });
});
