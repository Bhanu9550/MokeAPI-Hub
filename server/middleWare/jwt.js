import JWT from "jsonwebtoken";
import 'dotenv/config';


const secret_key = process.env.SECRET_KEY
function createJWT(username){
    return JWT.sign({username}, secret_key, {expiresIn : "3d"})
}

function verifyToken(req, res, next){
    try{
        const cookieToken = req.cookies.token
        if(!cookieToken){
            res.status(401).json({err : "unauthorized access"})
        }
        const isValidUser = JWT.verify(cookieToken, secret_key)
        req.user = isValidUser
        next()
    }catch(err){
        console.log(err.message)
    }
}

export {createJWT, verifyToken}