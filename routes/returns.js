const express=require('express');
const auth=require('../middleware/auth');
const validate=require('../middleware/validate');
const { Rental } = require('../models/rentalModel');
const router=express.Router(); 
const moment=require('moment');
const { Movie } = require('../models/movieModel');
const Joi=require('joi');


//POST METHOD
router.post('/',[auth,validate(validateReturn)],async (req,res)=>{ 

    const rental= await Rental.findOne({
        'customer._id':req.body.customerId,
        'movie._id':req.body.movieId
    })
    if (!rental)return res.status(404).send('Rental not found.');

    if(rental.dateReturned) return res.status(400).send('Return already processed');

    rental.dateReturned=new Date();
    const rentalDays=moment().diff(rental.dateOut,'days');
    rental.rentalFee=rentalDays * rental.movie.dailyRentalRate;
    await rental.save();

    await Movie.update({_id:rental.movie._id},{
        $inc:{numberInStock:1}
    })
    
    return res.status(200).send(rental);    
});
function validateReturn(req){
    const schema={
        customerId: Joi.ObjectId().required(),
        movieId: Joi.ObjectId().required()
    };
       return Joi.validate(req,schema);

}

module.exports = router;