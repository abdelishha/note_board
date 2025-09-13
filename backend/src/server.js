import express from "express"
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from "./config/db.js"
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors'
import path from 'path'
import Authrouter from "./routes/authRoutes.js";


dotenv.config();
const PORT = process.env.PORT || 5200
const app = express()
const __dirname = path.resolve()
// middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin:"http://localhost:5173",
}))
}

app.use(express.json()) // for parsing application/json
app.use(rateLimiter)

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next(); 
// })
app.use("/api/notes",notesRoutes)
app.use("/api/auths",Authrouter)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  // Handle SPA routing (must come AFTER API routes)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}
connectDB().then (() => app.listen(PORT,()=>{
    console.log("server stared running on server ", PORT);
 }));
 // once connectdb then listen that is it do not go direclty to listenin