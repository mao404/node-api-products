const { check } = require('express-validator')
const AppError = require('../../errors/appError')
const userService = require('../../services/userService')
const { ROLES, ADMIN_ROLE } = require('../../constants/index')
const { validationResult } = require('../common')
const { validJWT, hasRole } = require('../auth/')

const _nameRequired = check('name', 'Name required').not().isEmpty()
const _lastNameRequired = check('lastName', 'Last Name required').not().isEmpty()
const _emailRequired = check('email', 'Email required').not().isEmpty()
const _emailValid = check('email', 'Email is invalid').isEmail()
const _emailExist = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email)
        if (userFound) {
            throw new AppError('Email already exist in DB', 400)
        }
    }
);

const _optionalEmailValid = check('email', 'Email is invalid').optional().isEmail()
const _optionalEmailExist = check('email').optional().custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email)
        if (userFound) {
            throw new AppError('Email already exist in DB', 400)
        }
    }
);

const _passwordRequired = check('password', 'Password required').not().isEmpty()
const _roleValid = check('role').optional().custom(
    async (role = '') => {
        if (!ROLES.includes(role)) {
            throw new AppError('Invalid role', 400)
        }
    }
);
const _dateValid = check('birthDay').optional().isDate('MM-DD-YYYY')

const _idRequired = check('id', 'ID cant be empty').isMongoId().not().isEmpty()
const _idIsMongoDB = check('id', 'Is not a valid MongoDB ID').isMongoId()

const _idExist = check('id').custom(
    async (id = '') => {
        const userFound = await userService.findById(id)
        if (!userFound) {
            throw new AppError('The ID does not exist in DB', 400)
        }
    }
);



const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _lastNameRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _passwordRequired,
    _roleValid,
    _dateValid,
    validationResult
]

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsMongoDB,
    _idExist,
    _optionalEmailValid,
    _optionalEmailExist,
    _roleValid,
    _dateValid,
    validationResult
]

const getRequestByIdValidations = [
    validJWT,
    _idRequired,
    _idIsMongoDB,
    _idExist,
    validationResult
]

const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsMongoDB,
    _idExist,
    validationResult
]

const getAllRequestValidations = [
    validJWT
]


module.exports = {
    postRequestValidations,
    putRequestValidations,
    getRequestByIdValidations,
    deleteRequestValidations,
    getAllRequestValidations
}