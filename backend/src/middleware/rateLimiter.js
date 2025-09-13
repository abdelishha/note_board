import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try{
      const {success} = await ratelimit.limit("the limit")
      if (!success) return res.status(429).json({message:"too many request"})
      next()
    }  catch(error){
        console.log("eror in rate limit",error)
        next(error)
    }


   
}
export default rateLimiter;