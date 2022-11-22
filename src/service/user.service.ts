import UserModel, { UserDocument } from '../models/user.model';

import { DocumentDefinition } from 'mongoose'

// Data Transfer Object
export async function createUser(input: DocumentDefinition<Omit <UserDocument, "createdAt" | "updatedAt" | "comparePassword">>) {
    try {
        return await UserModel.create(input)
    } catch(e: any) {
        throw new Error(e)
    }
}