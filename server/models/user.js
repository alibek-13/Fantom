import Mongoose from "mongoose";

const { Schema, model } = Mongoose

const User = new Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  roles: [{ type: String, ref: 'Role' }]
})
export default model('User', User)  
