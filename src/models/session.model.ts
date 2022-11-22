import UserModel, {UserDocument} from './user.model'

import mongoose from "mongoose"

export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id'];
    valid: boolean;
    userAgent: string;
}

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel},
    valid: { type: Boolean, default: true },
    userAgent: { type: String }

}, {
    timestamps: true
})

const SessionModel = mongoose.model("User", sessionSchema)

export default SessionModel