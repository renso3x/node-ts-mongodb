import UserModel, {UserDocument} from './user.model'

import mongoose from "mongoose"

export interface ProductDocument extends mongoose.Document {
    user: UserDocument['_id'];
    title: string;
    description: string;
    price: number;
    image: string;
    createdAt: Date
    updatedAt: Date
}

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
}, {
    timestamps: true
})

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema)

export default ProductModel