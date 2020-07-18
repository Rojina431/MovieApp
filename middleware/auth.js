const config=require('config');
const jwt=require('jsonwebtoken');


function auth(req,res,next){
    const token=req.header('x-auth-token');

    //check for token
    if(!token) {
        res.statusCode=400;
        res.json({msg:"No token,authorization denied"});
    } 

    //verify token
    try{
         const decode=jwt.verify(token,config.get('jwtSecret'))
         req.user=decode;
         next();
        }
    catch(e){
        res.status(400).json({msg:'Token is not valid'})
    }    
}

;




module.exports=auth;