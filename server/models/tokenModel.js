import Mongoose from "mongoose";

const { Schema, model } = Mongoose

const token = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
})

export default model('Token', token);