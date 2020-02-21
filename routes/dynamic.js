'use strict';


const express = require('express');
const router = express.Router();

// protocol middleware 
const transporterAuth = require('../models/bearer-auth-middleware.js');
const protector = require('../models/acl-MD.js');


// modules 
const categories = require('../models/categories/categories-model.js');



// url: https://webapplog.com/url-parameters-and-routing-in-express-js/
router.param('model' , getModel);

function getModel(req , res , next){

  let  model = req.params.model ;
  switch(model){
  case 'categories':
    console.log('categories');
    req.model = categories ;
    next();
    return;
  // case 'products':
  //   req.model = products;
  //   next();
  //   return ;
  default:
    next();
    return;        
  }
}

/**
 * routes
 * @param string
 * @param function
 * @returns {Response} 
 */
router.get('/api/v1/:model',transporterAuth , protector('read'), getHandler);
router.get('/api/v1/:model/:_id',transporterAuth, protector('read'), getHandlerById);
router.post('/api/v1/:model', transporterAuth, protector('create'), postHandler);
router.put('/api/v1/:model/:_id',transporterAuth ,protector('update'),updateHandler);
router.delete('/api/v1/:model/:_id',transporterAuth ,protector('superuser'),deleteHandler);


function getHandler(req , res , next){
  try{
    req.model.read()
      .then(data => {
        console.log(data);
        res.status(200).json(data);
      }).catch(next);

  }catch(e){
    console.error(e);
  }

}
  
  
function getHandlerById(req , res , next){
  let id = req.params._id ;
  req.model.read(id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}
  
  
function postHandler(req , res , next){
  let value = req.body ;
  req.model.create(value)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(next);
}
  
function updateHandler(req , res , next){
  
  let value = req.body ;
  let id = req.params._id ;
  req.model.update(id , value)
    .then(data => {
      res.status(201).json(data);
    });
}
  
  
function deleteHandler(req , res , next){
  let id = req.params._id ;
  req.model.delete(id)
    .then(data => {
      res.status(200).json(data);
    });
}

module.exports= router ;
  
  