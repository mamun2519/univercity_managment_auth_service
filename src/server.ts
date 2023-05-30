import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function database() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('database connect Successfully')
    app.listen(config.port, () => {
      console.log('server run successfully')
    })
  } catch (e) {
    console.log(e)
  }
}

database()
