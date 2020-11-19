
const winston=require('winston'); //DEFAULT LOGGER
const express=require('express');
const app=express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

//SET PORT ENVIRONMENT
const port=process.env.PORT||3000;
const server=app.listen(port,()=>winston.info(`Listening on port ${port}`));

module.exports=server;