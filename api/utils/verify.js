const jwt = require("jsonwebtoken")
const createdError = require("./error")

const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createdError(401, "You are not authenticated!"))
    }

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user)=>{
        if(err) return next(createdError(403, "Token is not valid!"))

        req.user=user;
        next();
    })
}

const verifyUser =(req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createdError(403, "you are not authorized!"))
        }
    })
}

const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            return next(createdError(403, "you are not authorized!"))
        }
    })
}

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,
}