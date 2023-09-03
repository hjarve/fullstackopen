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

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user17')
      cy.get('#password').type('secretPass0rd')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
      cy.get('.notification').should('contain', 'Wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('secretPass0rd')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#new-blog-button').click()

      cy.get('#title').type('new blog title')
      cy.get('#author').type('new blog author')
      cy.get('#url').type('www.newblog.com')
      cy.get('#submit-blog-button').click()

      cy.contains('A new blog new blog title by new blog author added')
      cy.get('#blog-list').should('contain', 'new blog title new blog author')
    })
  })
  

})