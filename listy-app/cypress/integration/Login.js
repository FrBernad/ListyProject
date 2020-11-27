context('Testing Login',() => {
  let url = 'http://localhost:8080/'

  before(()=> {
    cy.visit(url)
  })

  it('Login',() =>{
    cy.get('#input-20').type('agus@yopmail.com').should('have.value','agus@yopmail.com')
    cy.get('#input-24').type('1234567890').should('have.value','1234567890')
    cy.get('.v-form > .v-btn').click()
  })

  it('Create list', () => {
    cy.get('.mt-5 > .row > .d-flex > .v-btn').click();
    cy.get('#input-92').type('asado');
    cy.get('.justify-start > .v-btn').click();
  })


})
