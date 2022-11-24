import { Request, Response } from 'express'
import { createSession, getSession } from '../service/session.service'

import config from 'config'
import { parse } from 'path'
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
        { expiresIn: parseInt(config.get<string>("accessTokenTTL"), 10) * 60 } // expires in 15min
    )
    // create a refresh token
    const refreshToken = signJwt(
        { ...userPayload, session: session._id },
        { expiresIn: parseInt(config.get<string>("refreshTokenTTL"), 10) * 60} // expires in 1yr
    )
    // return access and refreshTokens
    return res.send({ accessToken, refreshToken })
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id
    const sessions = await getSession({ user: userId, valid: true })
    
    return res.send({ sessions })
}