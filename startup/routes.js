const genre=require('../routes/genre');
const customers=require('../routes/customers');
const movies=require('../routes/movie');
const rentals=require('../routes/rental');
const users=require('../routes/users');
const auth=require('../routes/auth');
const returns=require('../routes/returns');
const error=require('../middleware/error');
const express=require('express');

module.exports=function(app){

//MIDDLEWARE
app.use(express.json());
app.use('/api/genres',genre);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/returns',returns);
app.use(error); //error middleware
}