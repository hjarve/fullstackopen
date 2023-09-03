import { func } from "prop-types";

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

    describe('when there is a blog post created', function() {
      beforeEach(function(){
        cy.get('#new-blog-button').click()

        cy.get('#title').type('new blog title')
        cy.get('#author').type('new blog author')
        cy.get('#url').type('www.newblog.com')
        cy.get('#submit-blog-button').click()
      })

      it('A user can like a blog', function() {
        cy.contains('new blog title new blog author').contains('view').click()
        cy.contains('new blog title new blog author').parent().find('#like-button').click()
        
        cy.contains('new blog title new blog author').parent().contains('likes 1')
      })

      it('A user who created a blog can delete it', function() {
        cy.contains('new blog title new blog author').contains('view').click()
        cy.contains('new blog title new blog author').parent().find('#remove-button').click()

        cy.contains('new blog title new blog author').should('not.exist')
      })

      it('Only the creator of a blog post can see its remove button', function() {
        const user2 = {
          name: 'User 2',
          username: 'user2',
          password: 'secretPass0rd'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2);

        cy.get('#logout-button').click()

        cy.get('#username').type('user2')
        cy.get('#password').type('secretPass0rd')
        cy.get('#login-button').click()

        cy.contains('new blog title new blog author').contains('view').click()
        cy.contains('new blog title new blog author').parent().should('not.contain', 'remove')
      })

      it('The blogs are ordered according to the number of likes', function() {
        cy.get('#new-blog-button').click()
        cy.get('#title').type('new blog title 2')
        cy.get('#author').type('new blog author 2')
        cy.get('#url').type('www.newblog2.com')
        cy.get('#submit-blog-button').click()

        cy.get('#new-blog-button').click()
        cy.get('#title').type('new blog title 3')
        cy.get('#author').type('new blog author 3')
        cy.get('#url').type('www.newblog3.com')
        cy.get('#submit-blog-button').click()

        cy.contains('new blog title new blog author').contains('view').click()
        cy.contains('new blog title new blog author').parent().find('#like-button').click()

        cy.contains('new blog title 2 new blog author 2').contains('view').click()
        cy.contains('new blog title 2 new blog author 2').parent().find('#like-button').as('likeButton2')
        cy.get('@likeButton2').click()
        cy.contains('new blog title 2 new blog author 2').parent().contains('likes 1')
        cy.get('@likeButton2').click()
        cy.contains('new blog title 2 new blog author 2').parent().contains('likes 2')
        cy.get('@likeButton2').click()

        cy.contains('new blog title 3 new blog author 3').contains('view').click()
        cy.contains('new blog title 3 new blog author 3').parent().find('#like-button').as('likeButton3')
        cy.get('@likeButton3').click()
        cy.contains('new blog title 3 new blog author 3').parent().contains('likes 1')
        cy.get('@likeButton3').click()

        cy.get('.blog').eq(0).should('contain', 'new blog title 2 new blog author 2')
        cy.get('.blog').eq(1).should('contain', 'new blog title 3 new blog author 3')
        cy.get('.blog').eq(2).should('contain', 'new blog title new blog author')
      })
    })
  })
  

})