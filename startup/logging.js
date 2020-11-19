const winston = require("winston");
//require('winston-mongodb');
require('express-async-errors');

module.exports = function () {

  //HANDLE UNCAUGHT EXCEPTION IN THE NODE PROCESS
  winston.handleExceptions(
    new winston.transports.Console({colorize:true, prettyPrint:true}),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  )

  //HANDLE PROMISE REJECTION
  process.on('unhandledRejection', (ex) => {
    throw (ex);
  })

  //CREATING LOGFILE
  //winston.add(winston.transports.File({ filename: 'logger.log' }));
  //winston.add(winston.transports.MongoDB, {
   // db: 'mongodb://localhost/livid',
    //level: 'info'
  //});
}