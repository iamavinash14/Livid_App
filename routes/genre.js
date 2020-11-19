const validateObjectId= require('../middleware/validateObjectId');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const validate=require('../middleware/validate');
const{Genre,validateGenre}=require('../models/genreModel');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router(); 

//GET METHOD
router.get('/',async (req,res)=>{
    const genres=await Genre.find().sort('name'); 
    res.send(genres);
});

//POST METHOD
router.post('/',[auth,validate(validateGenre)],async (req,res)=>{
    let genre = new Genre({ name: req.body.name});
    await genre.save();
    res.send(genre);
}
) ;

//PUT METHOD
router.put('/:id',[auth,validateObjectId,validate(validateGenre)],async(req,res) =>{
    //Look up the genre
   const genre= await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name },{
        new:true
    })
    if(!genre)return res.status(404).send('genre not found');
//Return the updated genre
   res.send(genre);
});

//DELETE METHOD
router.delete('/:id',[auth,admin],async(req,res)=>{
    //Look up the genre
    const genre= await Genre.findByIdAndRemove(req.params.id)
    if(!genre)return res.status(404).send('genre not found');
    //Return the genre
    res.send(genre);
});
router.get('/:id',validateObjectId,async(req,res)=>{
   //Look up the genre
   const genre= await Genre.findById(req.params.id);
   if(!genre)return res.status(404).send('genre with the given ID was not found');
    res.send(genre);
});

module.exports=router;