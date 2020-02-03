'use strict';


const base64 = require('base-64');
const users = require('./users.js');



module.exports = (req , res , next) => {

  if(!req.headers.authorization){
    next('Get Out Of Here !');
    return;
  }

  let info = req.headers.authorization.split(' ').pop();
  let [user , password] = base64.decode(info).split(':');
  console.log('before basicAuth', user , password);
  users.basicAuth(user , password)
    .then(result => {
      req.token = users.tokenGenerator(result);
      next();
    })
    .catch(err => next('falsy Login !!!'));


};