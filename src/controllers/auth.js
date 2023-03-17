const express = require('express')
const authService = require('../services/authService')
const Success = require('../handlers/successHandler')
const { request, response } = require('express')

//To add comments
const login = async(req = request, res = response, next) => {

    const { email, password } = req.body
    try {

        res.json(new Success(await authService.login(email, password)))

    } catch (err) {
        next(err)
    }
}


module.exports = {
    login
}