import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from './controller/product.controller'
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from './schema/product.schema'
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from './controller/session.controller'

import { Express } from 'express'
import { createSessionSchema } from './schema/session.schema'
import { createUserHandler } from './controller/user.controller'
import { createUserSchema } from './schema/user.schema'
import requireUser from './middleware/requireUser'
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

    app.post(
        '/api/sessions', 
        validateResource(createSessionSchema), 
        createUserSessionHandler
    )

    app.get('/api/sessions', requireUser, getUserSessionHandler)
    app.delete('/api/sessions', requireUser, deleteUserSessionHandler)

    app.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler)
    app.get('/api/products/:productId', [requireUser, validateResource(getProductSchema)], getProductHandler)
    app.put('/api/products/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler)
    app.delete('/api/products/:productId', [requireUser, validateResource(deleteProductSchema)], deleteProductHandler)
}

export default routes