// https://on.cypress.io/api

describe('Todo List page tests', () => {
  it('root url should launch the Todo list page', () => {
    cy.fixture('todoListFixture').then((todoListFixture) => {
      cy.visit('/')
      cy.contains(todoListFixture.listPageHeading).should('exist')
    })
  })
  it('clicking on the Add Todo link should take the user to the /to-do/new route', () => {
    cy.visit('/')
    cy.get('[data-testid="add-new-todo"]').click()
    cy.url().should('include', '/to-do/new')
  })
  describe('Todo data persistence', () => {
    it('should add a todo, check it exists, and ensure it persists after refreshing', () => {
      cy.fixture('addEditTodoFixture').then((addEditTodoFixture) => {
        cy.visit('/to-do/new')
        cy.get('[data-testid="todo-description-input"]').type(addEditTodoFixture.newTodoDescription)
        cy.get('[data-testid="todo-priority-select"]').select(1)
        cy.get('[data-testid="todo-submit-button"]').click()

        cy.contains(addEditTodoFixture.addSuccessMessage)

        cy.get('[data-testid="go-to-list-page"]').click()

        cy.url().should('eq', `${Cypress.config().baseUrl}/`)

        cy.contains(addEditTodoFixture.newTodoDescription).should('exist')

        cy.reload()
        cy.contains(addEditTodoFixture.newTodoDescription).should('exist')
      })
    })
  })
})
