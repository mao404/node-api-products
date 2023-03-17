const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../services/userService')
const AppError = require('../errors/appError')
const config = require('../config/')

const login = async(email, password) => {

    try {

        //Email validation
        const user = await userService.findByEmail(email)
        if (!user){
            throw new AppError('Authentication failed Email or Password is incorrect', 400)
        }

        //User is enabled
        if (!user.enable){
            throw new AppError('Authentication failed User disabled', 400)
        }

        //Password Validation
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword){
            throw new AppError('Authentication failed Email or Password is incorrect', 400)
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

_encrypt = (id) => {
    return jwt.sign({ id }, config.auth.secret, { expiresIn: config.auth.ttl });
}

module.exports = {
    login
}