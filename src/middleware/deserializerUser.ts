import { NextFunction, Request, Response } from "express";

import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    // Remove the Bearer from the token payload
    const accessToken = String(req.headers['authorization']).replace(/^Bearer\s/, "")

    if (!accessToken) {
        return next()
    }
    const { expired, decoded } = verifyJwt(accessToken)
    
    if (decoded) {
        res.locals.user = decoded
        return next()
    }

    return next()

}

export default deserializeUser 