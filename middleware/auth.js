const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function (req,res,next){
 
//VALIDATE JWT FOR ADMIN ACCESS TO POST
 const token=req.header('x-auth-token');
 if(!token) return res.status(401).send('Acess Denied, No token provided. ') //401 UNAUTHORISED ACESS- CLIENT DOESN'T HAVE VALID TOKEN

 try{
    const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
    req.user=decoded;
    next();
}
 catch(ex){
 res.status(400).send('Invalid token.');
 }
}