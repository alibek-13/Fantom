import Mongoose from "mongoose";

const { Schema, model } = Mongoose

const Role = new Schema({
    value: { type: String, unique: true, default: "USER" },
})

export default model('Role', Role);  
