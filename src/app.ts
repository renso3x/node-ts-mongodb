import config from 'config'
import connect from './utils/connect'
import deserializeUser from './middleware/deserializerUser'
import express from 'express'
import logger from './utils/logger'
import routes from './routes'

const port = config.get<string>('port')
const app = express()
app.use(express.json())
app.use(deserializeUser)

app.listen(port, async () => {
    await connect()
    routes(app)
    logger.info("App is running")
})
