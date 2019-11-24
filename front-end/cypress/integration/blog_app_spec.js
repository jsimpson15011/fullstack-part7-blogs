describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Joe Test',
        username: 'testuser',
        password: '1234'
      }
      const login = {
        username: 'testuser',
        password: '1234'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.contains('Login').click()
      cy.get('[data-cy=toggle]').click()
      cy.get('[data-cy=username]').type('testuser')
      cy.get('[data-cy=password]').type('1234')
      cy.get('[data-cy=login]').click()
    })

    it( 'shows name of user logged in', function () {
      cy.contains('Joe Test logged in')
    })
    describe('after a new blog is added', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('[data-cy=blog-title]').type('test blog')
        cy.get('[data-cy=blog-author]').type('test author')
        cy.get('[data-cy=blog-url]').type('testblogurl.com')
        cy.get('[data-cy=create]').click()
        cy.get('[data-cy=blog-link]')
        cy.get('[data-cy=message]')
        cy.get('[data-cy=blog-link]').click()
      })

      it('contains all correct blog info', function () {
        cy.contains('test blog')
        cy.contains('added by Joe Test')
        cy.contains('0 likes')
      })

      it('adds a comment', function () {
        cy.get('[data-cy=comment-field]').type('This is a test comment')
        cy.get('[data-cy=add-comment]').click()
        cy.get('[data-cy=comment]').contains('This is a test comment')
      })

      it('adds likes', function () {
        cy.get('[data-cy=like]').click()
        cy.contains('1 likes')
      })

      it('updates number of blogs on the users page', function () {
        cy.contains('Users').click()
        cy.get('[data-cy=blog-number]').contains('1')
      })

      it('adds the blog to the individual user page', function () {
        cy.contains('Users').click()
        cy.get('[data-cy=user-name]').contains('Joe Test').click()
        cy.get('[data-cy=blog-title]').contains('test blog')
      })
    })


    it('logs out and redirects to login page', function () {
      cy.get('[data-cy=logout]').click()
      cy.contains('login')
    })
  })
})