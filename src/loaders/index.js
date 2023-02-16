const ExpressServer = require('./server/expressServer')
const mongooseLoader = require('./mongoose')
const config = require('../config')
const logger = require('./logger')


module.exports = async () => {

    await mongooseLoader()
    logger.info('Database loaded and connected')
    // Initializate the constructor expressServer
    const server = new ExpressServer()
    logger.info('Express Loaded')

    server.start()
    logger.info(`#############################
      Server listening on port ${config.port}
      #############################`)

}