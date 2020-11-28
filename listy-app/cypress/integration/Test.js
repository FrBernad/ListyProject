context('Testing Listy',() => {
  let url = 'http://localhost:8080/home'

  before(()=> {
    cy.visit(url)
  })

  it('Login',() =>{
    cy.get('#loginEmail').type('agus@yopmail.com').should('have.value','agus@yopmail.com')
    cy.get('#loginPassword').type('1234567890').should('have.value','1234567890')
    cy.get('.v-form > .v-btn').click()
    cy.wait(2000)

  })

  it('Create list', () => {
    cy.wait(1000)
    cy.get('#createList').click();
    cy.get('#listName').type('asado');
    cy.get('.justify-start > .v-btn').click();
    cy.wait(2000)
  })

  it('Fav List and Change name', () => {
    cy.wait(1000);
    cy.get('.col-md-6').click()
    cy.get('.pa-5 > .row > .justify-space-around > :nth-child(1) > .v-btn__content').click()
    cy.get('#listName').clear().type('AsadoFacultad');
    cy.get(':nth-child(3) > .v-btn__content').click();
    cy.get('.pa-5 > :nth-child(1) > .justify-space-around > :nth-child(2) > .v-btn__content').click();
    cy.get(':nth-child(2) > .d-flex > .v-btn--contained').click()
    cy.get('.px-5 > .row > :nth-child(2) > .v-btn').click();
    cy.wait(1000);
    cy.get('.swal2-confirm').click();
    cy.wait(2000)


  })


  it('Favorites', () => {
    cy.get('[href="/home/destacadas"]').click()
    cy.get('.col-md-6').click()
    cy.get('#listName').invoke('val').should('equal','AsadoFacultad');
    cy.get('.pa-5 > .row > .justify-space-around > :nth-child(1) > .v-btn__content').click()
    cy.get('.col > .v-btn').click();
    cy.get('#forgot').click();
    cy.get('#productName').type('Coca');
    cy.get('#productQuantity').type('1');
    cy.get('#productPrice').type('300');
    cy.get('.justify-end > .d-flex > .v-btn--contained').click()
    cy.get('.px-5 > .row > :nth-child(2) > .v-btn').click()
    cy.wait(1000)
    cy.get('.swal2-confirm').click()
    cy.get(':nth-child(5) > .v-btn__content').click()
    cy.wait(2000)
    cy.get('.swal2-confirm').click()
    cy.wait(2000)
  })

  it('Create group', () => {
    cy.get('[href="/home/grupos"]').click()
    cy.get('#createGroup').click()
    cy.get('#groupName').clear().type('ITBA')
    cy.get('.justify-end > .d-flex > .v-btn--contained').click()
    cy.wait(1000)
    cy.get('.px-6 > .col-md-6').click()
    cy.get(':nth-child(3) > .v-btn__content').click()
    cy.wait(2000)
    cy.get('.swal2-confirm').click()

  })
})
