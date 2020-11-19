//LOGGING ERROR ON REQUEST PROCESSING MIDDLEWARE
//IGNORE EVERYTHING OUTSIDE EXPRESS
const winston=require('winston');

module.exports=function(err,req,res,next ){
    winston.log('error',err.message, err);
    
//LOGGING LEVELS 
    //error
    //warn
    //info
    //verbose
    //debug
    //silly
    res.status(500).send('Something failed');
}
