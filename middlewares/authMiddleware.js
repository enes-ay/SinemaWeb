import JWT from "jsonwebtoken";
import User from "../model/UserModel.js";

const authenticateToken = async (req,res,next) => {
try {
    const token= req.cookies.jwt;

    if(token){
        JWT.verify(token, process.env.JWT_KEY, (err)=>{
            if(err){
                console.log(err.message);
                res.redirect("/login");
            }
            else{
                next();
            }
        });
    }
    else{
        res.redirect("/login");
    }
   
} catch (error) {
    return res.status(401).json({
            
        succeded:false,
        error:'yetki yok',

    });
}
   
  
};

const checkUser= async (req,res,next) => {
    const token= req.cookies.jwt;

     if (token){
        JWT.verify(token, process.env.JWT_KEY, async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user= null;
                next();
            }
            else{
                const user= await User.findById(decodedToken.userId)
                res.locals.user=user;
                next();
            }
        });
     }
     else{
            res.locals.user=null;
            next();
     }
}

export {authenticateToken,checkUser};