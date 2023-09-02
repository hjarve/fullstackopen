describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User 1',
      username: 'user1',
      password: 'secretPass0rd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to the application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('secretPass0rd')
      cy.get('#login-button').click()

      cy.contains('User 1 logged in')
    })

    /*
    it('fails with wrong credentials', function() {
      // ...
    })
    */
  })
})