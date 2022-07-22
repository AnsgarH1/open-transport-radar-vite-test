/// <reference types="cypress" />

describe("renders the map", () => {
    it("map renders correctly", () => {
        cy.visit("/");
        cy.get('[data-testid="map-button"]').click().then(() => {
            cy.wait(1)
        })

        cy.get('[data-testid="map-item"]').should('be.visible');
        cy.get('[data-testid="map-button"]').should('not.exist');
        cy.get('[data-testid="map"]').should('be.visible')

    })
})