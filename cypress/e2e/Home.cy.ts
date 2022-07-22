/// <reference types="cypress" />

describe("renders the home page", () => {
    it("renders correctly", () => {
        cy.visit("/");
        cy.get('[data-testid="main-grid"]').should('be.visible');
        cy.get('[data-testid="departure-item"]').should('be.visible');
        cy.get('[data-testid="map-item"]').should('be.visible');
        cy.get('[data-testid="map-button"]').should('be.visible');
        cy.get('[data-testid="map"]').should('not.exist')
    })
})