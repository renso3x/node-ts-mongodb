import { Express } from 'express'
import { createUserHandler } from './controller/user.controller'
import { createUserSchema } from './schema/user.schema'
import validateResource from './middleware/validateResource'

function routes(app: Express) {
    app.get('/healthcheck', (req, res) => {
        res.json({ message: 'OK' })
    })

    app.post(
        '/api/users', 
        validateResource(createUserSchema), 
        createUserHandler
    )
}

export default routes