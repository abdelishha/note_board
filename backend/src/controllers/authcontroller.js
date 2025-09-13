import auth from "../models/Auth.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function postAuth1(req, res) {
  try {
    const { email, password } = req.body;
    const user = await auth.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{expiresIn:"24h"});
    
    
    res.status(201).json({message:"login successful", 
      token,
      user: {
        id: user._id,  // Fixed from auth._id to user._id
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
}


export async function postAuth(req,res){
 
    try{
      const {username,email,password} = req.body;
      const hashedPassword = await bcrypt.hash(password,10);
      const exists = await auth.findOne({ email });
      if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }
      const newauth = new auth({username,email,password:hashedPassword});
      const savednewauth = await newauth.save();
      if(!savednewauth) res.status(400).json({message:"error creating username or email"})
      res.status(201).json({message:"signup successful"})
    } catch(error){
        console.log("server issue in posting auth ", error)
        res.status(500).json({message:"server issue in posting auth"})
    }
}

const Authmiddle = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // <-- Set userId directly
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default Authmiddle;