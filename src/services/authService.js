const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../loaders/logger')
const userService = require('../services/userService')
const AppError = require('../errors/appError')
const config = require('../config/')

const login = async(email, password) => {

    try {

        //Email validation
        const user = await userService.findByEmail(email)
        if (!user){
            throw new AppError('Authentication failed Email or Password is incorrect', 401)
        }

        //User is enabled
        if (!user.enable){
            throw new AppError('Authentication failed User disabled', 401)
        }

        //Password Validation
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword){
            throw new AppError('Authentication failed Email or Password is incorrect', 401)
        }

        //Generate JWT
        const token = _encrypt(user._id)


        return {
            token,
            name: user.name,
            role: user.role
        }

    } catch (error) {
        throw error
    }

}

const validToken = async (token) => {

    try {

        // Token validation as parameter
        if (!token) {
            throw new AppError('Authentication failed, token required', 401)
        }

        logger.info(`Token received ${token}`)

        // Validate the token comes from the server
        let id;
        try {
            const obj = jwt.verify(token, config.auth.secret)
            id = obj.id
        } catch (verifyError) {
            throw new AppError('Authentication failed, invalid token', 401)
        }

        logger.info(`User ID in the token: ${id}`)

        
        // IF token is valid, search up the user in DB through the ID
        const user = await userService.findById(id)
        if (!user) {
            throw new AppError('Authentication failed, invalid token', 401)
        }

        // Validate if the user is enabled
        if (!user.enable) {
            throw new AppError('Authentication failed, user disabled', 401)
        }
        // Return the user
        return user
        
    } catch (err) {
        throw err
    }

}

const validRole = (user, ...roles) => {
    if (!roles.includes(user.role)) {
        throw new AppError('Authorization failed, user without privileges', 403)
    }
    return true
}

_encrypt = (id) => {
    return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
}

module.exports = {
    login,
    validToken,
    validRole
}