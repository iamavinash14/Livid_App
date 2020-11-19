//ALTERNATE METHOD TO EXPRESS-ASYNC-ERROR

module.exports=function (handler){
    return async(req,res,next)=>{
        try{
            await handler(req,res);
        }
        catch(ex){
            next(ex);
        }
    }
}