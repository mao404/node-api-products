const winston = require('winston');
const config = require('../../config')

//To create the logger for development and production file logger
const transports = []
transports.push(
    new winston.transports.Console()
)

const LoggerInstance = winston.createLogger({
    level: config.log.level,
    format: winston.format.simple(),
    transports
})

module.exports = LoggerInstance