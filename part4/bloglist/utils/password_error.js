class PasswordError extends Error {
	constructor(message = 'Something went wrong') {
		super(message)

		this.name = 'PasswordError'
		this.message = message
	}
}

module.exports = PasswordError