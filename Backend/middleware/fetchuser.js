const jwt = require("jsonwebtoken");
const JWT_Secret = "gautammadiratta@12&1";

const fetchuser=(req,res,next)=>{
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error : "please authenticate using a valid token"})
    }
    else{
    const data=jwt.verify(token,JWT_Secret);
    req.user = data.user;
    }

    next()
}

module.exports = fetchuser;