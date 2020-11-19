const{Rental,validateRental}=require('../models/rentalModel');
const{Movie}=require('../models/movieModel');
const{Customer}=require('../models/customerModel');
const mongoose=require('mongoose');
const Fawn=require('fawn');
const express=require('express');
const router=express.Router(); 
const validate=require('../middleware/validate');

Fawn.init(mongoose);

//GET METHOD
router.get('/',async (req,res)=>{
    const rental=await Rental.find().sort('-dateOut'); 
    res.send(rental);
});
//POST METHOD
router.post('/',validate(validateRental),async (req,res)=>{ 
    const customer=await Customer.findById(req.body.customerId);
    if(!customer)return res.status(400).send('Invalid customer');

    const movie=await Movie.findById(req.body.movieId);
    if(!movie)return res.status(400).send('Invalid movie');

    if(movie.numberInStock==0)return res.status(400).send('Movie not in stock');
    let rental = new Rental({
        customer:{ 
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title: movie.title,
             dailyRentalRate:movie.dailyRentalRate
        }
    });
    try{
        new Fawn.Task()
        .save('rentals',rental) 
        .update('movies',{_id:movie._id},{
            $inc:{numberInStock:-1}
        })
        .run();
        res.send(rental);   
    }
    catch(ex){
        res.status(500).send('Something failed');
    }
});

//PUT METHOD
router.put('/:id',validate(validateRental),async(req,res) =>{
    //Look up the movie
   const movie= await Rental.findByIdAndUpdate(req.params.id,
    {title:req.body.title },{genre:req.body.genre.name},
    {numberInStock:req.body.numberInStock},{dailyRentalRate: req.body.dailyRentalRate},{
        new:true
    })
    if(!movie)return res.status(404).send('Movie not found');
//Return the updated movie
   res.send(movie);
});

//DELETE METHOD
router.delete('/:id',async(req,res)=>{
    //Look up the movie
    const movie= await Rental.findByIdAndRemove(req.params.id)
    if(!movie)return res.status(404).send('Movie not found');
    //Return the movie
    res.send(movie);
});

router.get('/:id',async(req,res)=>{
    //Look up the movie
   const movie= await Rental.findById(req.params.id);
   if(!movie)return res.status(404).send('Movie not found');
    res.send(movie);
});

module.exports=router;