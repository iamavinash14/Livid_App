const Joi=require('joi');
const{User}=require('../models/userModel');
const bcrypt=require('bcrypt');//TO HASH PASSWORDS
const _=require('lodash'); //TO HIDE PASSWORD FROM SHOWING ON POST USER.
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router(); 
const validate=require('../middleware/validate');


//USER LOGIN
router.post('/',validate(validateLogin),async (req,res)=>{
    let user= await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    //VALIDATING PLAIN TEXT PWD WITH HASHED PWD
   const validPassword=await bcrypt.compare(req.body.password,user.password);
   if(!validPassword) return res.status(400).send('Invalid email or password');
   
   //REFRENCING AUTH TOKEN FROM userModel AND DISPLAYING
    const token =user.generateAuthToken();
    res.send(token);

});

function validateLogin(req){
    const schema={
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()

    };
       return Joi.validate(req,schema);

}

module.exports=router;
