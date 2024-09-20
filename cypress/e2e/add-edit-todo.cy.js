describe('Add Edit Todo page tests', () => {
  it('fill the form, submit the todo, and check that the todo is added on the list page', () => {
    cy.fixture('addEditTodoFixture').then((addEditTodoFixture) => {
      cy.visit('/to-do/new')
      cy.get('[data-testid="todo-description-input"]').type(addEditTodoFixture.newTodoDescription)
      cy.get('[data-testid="todo-priority-select"]').select(1)
      cy.get('[data-testid="todo-submit-button"]').click()

      cy.contains(addEditTodoFixture.addSuccessMessage)

      cy.get('[data-testid="go-to-list-page"]').click()

      cy.url().should('eq', `${Cypress.config().baseUrl}/`)

      cy.contains(addEditTodoFixture.newTodoDescription).should('exist')
    })
  })
})
