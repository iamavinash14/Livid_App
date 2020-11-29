
const winston=require('winston'); //DEFAULT LOGGER
const express=require('express');
const app=express();
const config= require('config');

require('./startup/logging')();
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

//SET PORT ENVIRONMENT
const port=config.port;
const server=app.listen(port,()=>winston.info(`Listening on port ${port}`));

module.exports=server;