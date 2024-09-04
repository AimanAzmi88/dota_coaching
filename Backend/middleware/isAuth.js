import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        return res.status(401).json({message: 'Token is required'});
    }
    const token = bearerToken.split(" ")[1];
    if(!token){
        return res.status(401).json({message: 'Token is not valid'});
    }

    jwt.verify(token, 'secret', (err, user) => {
        if(err){
            return res.status(403).json({
                message: 'Token is not valid'});
        }
        req.user = user.id;
        req.username= user.username;
        next();
    });
 };
 
 export default isAuth;