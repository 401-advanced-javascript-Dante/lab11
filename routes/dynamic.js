'use strict';

// 3d party dependencies
const express = require('express');
const router = express.Router();


//require models here for example:
// const categories = require('../models/categories/categories-model.js');



// dynamic routes function 
function getModel(req , res , next){

  let  model = req.params.model ;
  switch(model){
  // case 'test':
  //   req.model = categories ;
  //   next();
  //   return;
  // example
  // case 'products':
  //   req.model = products;
  //   next();
  //   return ;
  default:
    next();
    return;        
  }
}

// pass the model to request params 
router.param('model' , getModel);
//

// handlers 
router.get('/api/v1/:model',getHandler);
router.get('/api/v1/:model/:_id',getHandlerById);
router.post('/api/v1/:model',postHandler);
router.put('/api/v1/:model/:_id',updateHandler);
router.delete('/api/v1/:model/:_id',deleteHandler);


// for get request 
function getHandler(req , res , next){

  req.model.get()
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}
  
// get request with an id
function getHandlerById(req , res , next){
  let id = req.params._id ;
  req.model.get(id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}
  
// post request take the value from the body
function postHandler(req , res , next){
  let value = req.body ;
  req.model.create(value)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(next);
}
 

// put request take an id and the new value
function updateHandler(req , res , next){

  let value = req.body ;
  let id = req.params._id ;
  req.model.update(id , value)
    .then(data => {
      res.status(201).json(data);
    });
}
  
// delete request send as post also
function deleteHandler(req , res , next){
  let id = req.params._id ;
  req.model.delete(id)
    .then(data => {
      res.status(200).json(data);
    });
}

module.exports= router ;
  
  