import express from "express"
import { postAuth1, postAuth } from "../controllers/authcontroller.js";

const Authrouter = express.Router();

Authrouter.post("/login",postAuth1)
Authrouter.post("/signup",postAuth)

export default Authrouter