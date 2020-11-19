const auth=require('../middleware/auth');
const{User,validateUser}=require('../models/userModel');
const bcrypt=require('bcrypt');//TO HASH PASSWORDS
const _=require('lodash'); //TO HIDE PASSWORD FROM SHOWING ON POST USER.
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router(); 
const validate=require('../middleware/validate');

//DISPLAY CURRENT USER DETAILS
router.get('/me',auth,async(req,res)=>{
  const user= await User.findById(req.user._id).select('-password');
  res.send(user);
})

//REGISTER USER
router.post('/',[auth,validate(validateUser)],async (req,res)=>{
    let user= await User.findOne({email:req.body.email});
    if(user)return res.status(400).send('User already registered');
    
    user=new User(_.pick(req.body,['name','email','password']));//ALTERNATE LODASH METHOD TO POST
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    await user.save();
    
    //LODASH METHOD TO DISPLAY AND JWT IN HTTP HEADER
    const token=user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['id','name','email']));
});

module.exports=router;