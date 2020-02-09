'use strict';


const base64 = require('base-64');
const users = require('./users.js');


// middleware for Auth 
module.exports =async (req , res , next) => {
  console.log('authorization',req.headers.authorization);
  
  if(!req.headers.authorization){
    next('Get Out Of Here !');
  }
  let info = req.headers.authorization.split(' ').pop();
  console.log('decooooding',base64.decode(info));
  let [user , password] = base64.decode(info).split(':');

  // basic auth will check and compare stored password  
  users.basicAuth(user , password)
    .then(result => {
      console.log('result mw auth',result);
      // generate a token
      return users.tokenGenerator(result);
    }).then(data => {
      // stick the token to req object
      console.log('token generated', data);
      req.token = data;
      next();
    })
    .catch(err => next('falsy Login !!!', err));


};