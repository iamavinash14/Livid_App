const config=require('config');

module.exports=function(){

//VALIDATING CONFIG SETTINGS
if(!config.get('jwtPrivateKey')){
    throw new Error('FATAL ERROR:jwtPrivateKey is not defined.');
}
}