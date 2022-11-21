import config from 'config'
import connect from './utils/connect'
import express from 'express'
import logger from './utils/logger'

const port = config.get<string>('port')
const app = express()

app.listen(port, async () => {
    await connect()
    logger.info("App is running")
})
