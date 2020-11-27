context('Lists',() => {
  let url = 'http://localhost:8080/home'

  before(()=> {
    cy.visit(url)
  })

  it('Login',() =>{
    cy.get('#input-20').type('agus@yopmail.com').should('have.value','agus@yopmail.com')
    cy.get('#input-24').type('1234567890').should('have.value','1234567890')
    cy.get('.v-form > .v-btn').click()
  })

  it('Favorites', () => {
    cy.get('[href="/home/destacadas"]').click()
    cy.get('.col-md-6').click()
    cy.get('#input-97').invoke('val').should('equal','asadoFacultad');
    cy.get('.pa-5 > .row > .justify-space-around > :nth-child(1) > .v-btn__content').click()
    cy.get('.col > .v-btn').click();
    cy.get('#forgot').click();
    cy.get('#input-174').type('Coca');
    cy.get('#input-137').type('1');
    cy.get('#input-140').type('300');
    cy.get('.justify-end > .d-flex > .v-btn--contained').click()
    cy.get('.px-5 > .row > :nth-child(2) > .v-btn').click()
    cy.get('.swal2-confirm').click()

  })
})



