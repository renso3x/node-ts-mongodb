import { NextFunction, Request, Response } from "express";

import { issueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    // Remove the Bearer from the token payload
    const accessToken = String(req.headers['authorization']).replace(/^Bearer\s/, "")
    const refreshToken = String(req.headers['x-refresh-token'])

    if (!accessToken) {
        return next()
    }
    const { expired, decoded } = verifyJwt(accessToken)
    
    if (decoded) {
        res.locals.user = decoded
        return next()
    }

    if (expired && refreshToken) {
        const newAccessToken = await issueAccessToken({ refreshToken }) 

        console.log('---')
        console.log(newAccessToken)
        if (newAccessToken) {
            res.setHeader('x-access-token', newAccessToken)
            
            const result = verifyJwt(newAccessToken)
            res.locals.user = result.decoded
            return next()
        }
    }

    return next()

}

export default deserializeUser 