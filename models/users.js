'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Model = require('./user-model.js');
let users = {} ;
const SECRET = 'NoBodyKnow';


// check if the user exist in the DB  
// if not hash his password and save it ;


users.save = async function (data){
  // i thought i need to parse it but am already using express JSON
  let parsedData = data;
  // search in the DB for the user .
  let scanResult = await Model.read(parsedData.name);
  // DB will return an array
  let search;
  if(scanResult){
    search =scanResult[0].name ;
  }

  if(!( search === parsedData.name)){
    // hash the password with bcrypt
    parsedData.password = await bcrypt.hash(parsedData.password , 5);
    // adding the user data to the DB
    await Model.create(parsedData);
    return parsedData ;
  }else{
    return parsedData;
  }
};



// to generate a token by username 
users.tokenGenerator = async function(data){
  let token = await jwt.sign(data.name , SECRET) ;
  return token ;
};


// compare the password with the hashed one
// if true it will return user name , else will reject it 
users.basicAuth = async function(user , pass){
  let fromDB = await Model.read(user);
  let check = await bcrypt.compare(pass , fromDB[0].password);
  if(check){
    return fromDB[0];
  }else{
    return Promise.reject ;
  }
};


// return all data form DB
users.showAll = async function(){
  let result = Model.read() ;
  return result ;
};

module.exports = users ;
