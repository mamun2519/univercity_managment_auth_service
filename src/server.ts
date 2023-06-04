import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'

async function database() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connect Successfully')
    app.listen(config.port, () => {
      logger.info('server run successfully')
    })
  } catch (e) {
    errorLogger.error(e)
  }
}

database()
