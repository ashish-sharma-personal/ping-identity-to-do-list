// https://on.cypress.io/api

describe('Todo List page tests', () => {
  it('root url should launch the Todo list page', () => {
    cy.visit('/')
    cy.contains('h2', 'Todo List')
  })
  it('clicking on the Add Todo link should take the user to the /to-do/new route', () => {
    cy.visit('/')
    cy.get('[data-testid="add-new-todo"]').click()
    cy.url().should('include', '/to-do/new')
  })
})
