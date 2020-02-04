'use strict';


const base64 = require('base-64');
const users = require('./users.js');


// middleware for Auth 
module.exports =async (req , res , next) => {
  
  if(!req.headers.authorization){
    next('Get Out Of Here !');
  }
  let info = req.headers.authorization.split(' ').pop();
  let [user , password] = base64.decode(info).split(':');

  // basic auth will check and compare stored password  
  users.basicAuth(user , password)
    .then(result => {
      // generate a token
      return users.tokenGenerator(result);
    }).then(data => {
      // stick the token to req object
      req.token = data;
      next();
    })
    .catch(err => next('falsy Login !!!', err));


};