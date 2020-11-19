const {Customer,validateCustomer}=require('../models/customerModel');//Object Destructuring
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router(); 
const validate=require('../middleware/validate');

//GET METHOD
router.get('/',async (req,res)=>{
    const customers=await Customer.find().sort('name'); 
    res.send(customers);
});
//POST METHOD
router.post('/',validate(validateCustomer),async (req,res)=>{
    let customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    await customer.save();
    res.send(customer);
})
//PUT METHOD
router.put('/:id',validate(validateCustomer),async(req,res) =>{
    //Look up the customer
   const customer= await Customer.findByIdAndUpdate(req.params.id,
    {
   name: req.body.name,
   phone: req.body.phone,
   isGold: req.body.isGold
   },{ new:true}
   )
//Return the updated customer
   res.send(customer);
});
//DELETE METHOD
router.delete('/:id',async(req,res)=>{
    //Look up the customer
    const customer= await Customer.findByIdAndRemove(req.params.id)
    if(!customer)return res.status(404).send('customer not found');
    //Return the customer
    res.send(customer);
});
router.get('/:id',async(req,res)=>{
    //Look up the customer
   const customer= await Customer.findById(req.params.id);
   if(!customer)return res.status(404).send('customer not found');
    res.send(customer);
});
module.exports=router;