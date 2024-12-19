import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success:false, message:"Unauthorized-no token provided"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({success:false, message:"Unauthorized-token verification failed"});

        req.userId = decoded.userId;
        next();
    }catch(error){
        console.log("error in verifyToken ", error);
        res.status(401).json({success:false, message:"Unauthorized-token verification failed"});
    }
};