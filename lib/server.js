'use strict' ;


// 3d party dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// custom routes
// const dynamicRouter = require('../routes/dynamic.js');

const user = require('../models/users.js');

// applications constants 
const app = express() ;

// 3d party middleware 
app.use(express.json());

//middleware apps
app.use(timeStamp);
app.use(logger); 
app.use(errorHandler);
const myAuth = require('../models/auth-middleware.js');

// 3d party dependencies 
app.use(cors());
app.use(morgan('dev'));


// adding time stamp for each request
function timeStamp(req, res , next){
  let newTime = new Date();
  let requestTime = newTime.toUTCString();
  req.requestTime = requestTime ;
  next();
}

// console.log data from request object for each request 
function logger(req, res, next) {
  console.log('request path:', req.path, ' method:' , req.method, ' request time:' , req.requestTime);
  next();
}

// middleware 500 error function
function errorHandler(err , req , res , next){
  res.status(500);
  res.statusMessage = 'OBJECT DESTROYED ! (500)';
  res.json({error : err});
}

// middleware 404 error function
function notFoundHandler(req , res , next){
  res.status(404);
  res.statusMessage = 'WE NEED A MEDIC HERE !! (404)';
  res.json({error : 'NOT FOUND !!!'});
}



// sign up route that takes name and pass then save them at the DB .
app.post('/signup' , signUp);
function signUp(req , res){

  return user.save(req.body)
    .then(data => {
      // console.log('hiiiiiiiiiiiiiiiii', data);
      return user.tokenGenerator(data);
    })
    .then(data => {
      res.status(200).send(`Areose Kid !  ${data}`);
    });
}


// sign in route that takes name and pass and check if exist in DB through middleware myAuth()
// if exist it will generate a token for it and return it with the req object
app.post('/signin' , myAuth, signIn);
function signIn (req , res){
  res.status(200).send(req.token);
}


// router to show all the DB objects (users)
app.get('/showall' , showMyUsers);
async function showMyUsers (req , res){
  let all = await user.showAll();
  console.log('in show router', all);
  res.status(200).json(all);
}


app.get('*' , notFoundHandler);

module.exports = {
  server : app ,
  start : port => {
    let PORT = port || process.env.PORT || 3000 ;
    // prove of life 
    app.listen(PORT , () => {
      console.log(`Let's Rock !!! ${PORT}`);
    });
  },
};