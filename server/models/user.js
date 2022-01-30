import Mongoose from "mongoose";

const { Schema, model } = Mongoose

const User = new Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  userName: { type: String, required: false },
  companys: { type: String, required: false },

})
export default model('User', User)  
