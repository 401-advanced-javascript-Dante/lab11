'use strict';


const base64 = require('base-64');
const users = require('./users.js');



module.exports =async (req , res , next) => {


  if(!req.headers.authorization){
    next('Get Out Of Here !');
  }

  let info = req.headers.authorization.split(' ').pop();
  let [user , password] = base64.decode(info).split(':');
  console.log('before basicAuth', user , password);
  users.basicAuth(user , password)
    .then(result => {
      console.log('first then');
      return users.tokenGenerator(result);
    }).then(data => {
      console.log('second then');

      req.token = data;
      next();
    })
    .catch(err => next('falsy Login !!!', err));


};