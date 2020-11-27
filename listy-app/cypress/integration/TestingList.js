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

  it('Fav List and Change name', () => {

    cy.get('.col-md-6').click()
    cy.get('.pa-5 > .row > .justify-space-around > :nth-child(1) > .v-btn__content').click()
    cy.get('#input-94').type('Facultad');
    cy.get(':nth-child(3) > .v-btn__content').click();
    cy.get('.pa-5 > :nth-child(1) > .justify-space-around > :nth-child(2) > .v-btn__content').click();
    cy.get(':nth-child(2) > .d-flex > .v-btn--contained').click()
    cy.get('.px-5 > .row > :nth-child(2) > .v-btn').click();
    cy.get('.swal2-confirm').click();
   /* cy.url().then(($url) => {
        if($url.includes(path)) {
            cy.log("Yes")
        } else  {
            cy.log("No")
          }
    })
VER COMO COMPARAR CLIPBOARD CON URL*/
  })



})
