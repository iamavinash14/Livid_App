const Joi=require('joi');
const mongoose=require('mongoose');
const config=require('config') //TO SET THE ENVIRONMENT VARIABLE FOR JWT PRIVATE KEY
const jwt=require('jsonwebtoken'); //CLIENT ID TO SERVER
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    },
    isAdmin:Boolean
});
    //GENERATING JWT TOKEN FOR USER AND AUTH APIs.
    userSchema.methods.generateAuthToken= function(){
        const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey')); 
        return token;
    }

const User= mongoose.model('User',userSchema);

//User Validation Function
function validateUser(user){
    const schema={
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()

    };
       return Joi.validate(user,schema);

}
exports.User=User;
exports.validateUser=validateUser;