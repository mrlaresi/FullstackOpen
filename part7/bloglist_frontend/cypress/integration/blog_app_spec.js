describe('Blog', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user2 = {
			name: 'Hessu Hopo',
			username: 'hoopo',
			password: 'höhö'
		}
		cy.createUser({
			name: 'Pelle Peloton',
			username: 'ppeloton',
			password: 'salaisuus' })
		cy.visit('http://localhost:3000')
		// I was getting XHR request aborted issues and this seemed to fix them
		// I assume Cypress tried to continue onwards before mongodb returned anything
		cy.wait(100)
	})

	it('Login form is shown', function() {
		cy.contains('Log in to the application')
		cy.contains('Username')
		cy.contains('Password')
	})

	describe('Login', function() {
		it('Login with no credentials fails', function() {
			cy.get('#buttonLogin').click()
			cy.get('#errorMessage')
				.contains('Wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
			cy.get('html').should('not.contain', 'logged in')
		})

		it('Login succeeds with correct credentials', function() {
			cy.get('#inputUsername').type('ppeloton')
			cy.get('#inputPassword').type('salaisuus')
			cy.get('#buttonLogin').click()
			cy.contains('Pelle Peloton logged in')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'ppeloton', password: 'salaisuus' })
		})

		it('Creating new blog works', function() {
			cy.contains('Create new blog').click()
			cy.get('#inputTitle').type('Testing with cypress')
			cy.get('#inputAuthor').type('Cypress')
			cy.get('#inputUrl').type('cypress.io')
			cy.get('#buttonSubmit').click()
			cy.get('#errorMessage')
				.contains('A new blog' && 'added')
				.should('have.css', 'color', 'rgb(0, 128, 0)')
			cy.contains('Testing with cypress by Cypress' && 'Show')
		})

		describe('And few blogs exist', function() {
			beforeEach(function () {
				cy.createBlog({
					title: 'Sudenpennut',
					author: 'Sudenpennut',
					url: 'sudenpennut.fi'
				})
				cy.createBlog({
					title: 'Maailmantalous',
					author: 'Roope-Setä',
					url: 'rahasailio.fi',
				})
				cy.createBlog({
					title: 'Hoponpoppoo',
					author: 'Hessu Hopo',
					url: 'hoponpoppoo.fi',
					likes: 2
				})
			})

			it('It can be liked', function() {
				cy.contains('Maailmantalous').parent().as('theParent')
				cy.get('@theParent').find('#visibilityButton').click()
				cy.get('@theParent').find('#likeButton').click()
				cy.get('@theParent').contains('Likes: 1')
			})

			it.only('Blogs are sorted by likes', function() {
				cy.get('.blog').then(blogs => {
					expect(blogs).to.have.length(3)
					console.log(parseInt(blogs.find('#likes')[0].textContent))
					for (let i = 0; i < blogs.length; i++) {
						if (i < blogs.length - 1) {
							expect(parseInt(blogs.find('#likes')[i].textContent)).to.be.least(parseInt(blogs.find('#likes')[i+1].textContent))
						} else {
							expect(parseInt(blogs.find('#likes')[i-1].textContent)).to.be.least(parseInt(blogs.find('#likes')[i].textContent))
						}
					}
				})
			})

			it('It can be deleted', function() {
				cy.contains('Maailmantalous').parent().as('theParent')
				cy.get('@theParent').find('#visibilityButton').click()
				cy.get('@theParent').find('#removeButton').click()
				cy.should('not.contain', 'Maailmantalous')
			})

			it('It cannot be deleted when other user tries to delete it', function() {
				cy.createUser({ name: 'Hessu Hopo', username: 'hoopo', password: 'höhö' })
				cy.login({ username: 'hoopo', password:'höhö' })
				cy.contains('Maailmantalous').parent().as('theParent')
				cy.get('@theParent').find('#visibilityButton').click()
				cy.get('@theParent').find('#removeButton')
					.should('not.exist')
			})
		})
	})
})