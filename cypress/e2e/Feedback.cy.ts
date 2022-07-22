/// <reference types="cypress" />

describe("sends a from", () => {
    it("is validated", () => {
        cy.visit("/");

        cy.get('[data-testid="avatar-btn"]').click().then(() => {})
        cy.get('[data-testid="feedback-link"]').click().then(() => {})

        cy.get('[data-testid="feedback-form"]').within(() => {
            cy.get('#firstname').type('H')
            cy.get('#lastname').type('Wurst')
            cy.get('#email').type('max@mustermannd.de')
            cy.get('select').select('opt-2')
            cy.get('#text').type('Hier steht mein Feedback')
        })

        //cy.get('[data-testid="feedback-form"]').submit() // Submit a form
        cy.get('[data-testid="submit-btn"]').click().then(() => {}) //nothing should happen
        cy.get('[data-testid="feedback-form"]').should('be.visible'); //should still be visible
        cy.get('[data-testid="response-message"]').should('not.exist'); //thank you message should be visible

        cy.get('#firstname').type('ans')

        cy.get('[data-testid="submit-btn"]').click().then(() => {})
        cy.get('[data-testid="response-message"]').should('be.visible'); //should not be visible
    })
})