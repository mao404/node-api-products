const {check} = require('express-validator')
const { validationResult } = require('../common')


const _emailRequired = check('email', 'Email required').not().isEmpty()
const _emailValid = check('email', 'Email is invalid').isEmail()
const _passwordRequired = check('password', 'Password required').not().isEmpty()

const postLoginRequestValidations = [
    _emailRequired,
    _emailValid,
    _passwordRequired,
    validationResult
]

module.exports = {
    postLoginRequestValidations,
}