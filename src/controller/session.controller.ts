import { Request, Response } from 'express'

import config from 'config'
import { createSession } from '../service/session.service'
import { pick } from 'lodash'
import { signJwt } from '../utils/jwt.utils'
import { validatePassword } from '../service/user.service'

export async function createUserSessionHandler(req: Request, res: Response) {
    // Valid the user password
    const user = await validatePassword(req.body)
    if (!user) {
        return res.status(401).send("Invalid email or password")
    }
    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "")
    // create an access Token
    const userPayload = pick(user, ['_id', 'email'])
    const accessToken = signJwt(
        { ...userPayload, session: session._id },
        { expiresIn: config.get<string>("accessTokenTTL") } // expires in 15min
    )
    // create a refresh token
    const refreshToken = signJwt(
        { ...userPayload, session: session._id },
        { expiresIn: config.get<string>("refreshTokenTTL") } // expires in 1yr
    )
    // return access and refreshTokens
    return res.send({ accessToken, refreshToken })
}