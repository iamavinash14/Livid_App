 const mongoose=require('mongoose');

module.exports=function (req,res,next){

//Validating Object Id
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid ID');

    next();
}