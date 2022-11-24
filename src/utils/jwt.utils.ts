import config from 'config'
import jwt from 'jsonwebtoken'

const privateKey = config.get<string>('privateKey')

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    const token = jwt.sign(object, privateKey, { ...(options && options) });
    return token
    
}
export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, privateKey)
        return {
            valid: true, expired: false, decoded
        }
    } catch(e: any) {
        return { 
            valid: false, 
            expired: e.message === 'jwt expired', 
            decoded: null
        }
    }
}