const dotenv = require('dotenv');

const envFound = dotenv.config()
if(!envFound){
    throw new Error("Couldn't find .env file")
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

//Configuration of the api
module.exports = {
    port: process.env.PORT,
    api: {
        prefix: '/api/v1'
    },
    log: {
        level: process.env.LOG_LEVEL
    },
    swagger: {
        path: '/documentation'
    },
    databaseURL: process.env.DATABASE_URL,
    auth: {
        secret: process.env.AUTH_SECRET,
        ttl: process.env.AUTH_TIME
    }
    
}