import mongoose from "mongoose"

const Authshema = new mongoose.Schema({
    username: { 
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Email regex
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
},{collection:"auths"})
 
const auth = mongoose.model("auth",Authshema)

export default auth
