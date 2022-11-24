import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";

import config from 'config'
import { findUser } from "./user.service";
import { get } from "lodash";

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent })

    return session.toJSON()
}

export async function getSession(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update)
}

export async function issueAccessToken({ refreshToken }: { refreshToken: string }) {
    const { decoded } = verifyJwt(refreshToken)

    if (!decoded || !get(decoded, 'session')) return false

    const session = await SessionModel.findById(get(decoded, 'session'))

    if (!session || !session.valid) return false

    const user = await findUser({ id: session.user })

    if (!user) return false

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: parseInt(config.get<string>("accessTokenTTL"), 10) * 60 } // expires in 15min
    )
    
    return accessToken
}