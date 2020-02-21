'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Model = require('./user-model.js');
let users = {} ;
const SECRET = 'NoBodyKnow';


// check if the user exist in the DB  
// if not hash his password and save it ;


users.checkAndSave = async function (data){
  // i thought i need to parse it but am already using express JSON
  let parsedData = data;
  console.log(data);
  // search in the DB for the user .
  let scanResult = await Model.read(parsedData.name);
  console.log(scanResult);

  // DB will return an array
  let search;
  if(scanResult[0]){
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
  console.log('tokenGenerator');
  try{
    let token = await jwt.sign({user: `${data.name}`}, SECRET , {expiresIn: '15m'}) ;
    console.log('tokenGenerator', token);
    return token ;
  }catch(err){
    console.log('errr');
    console.error(err);
    return Promise.reject(err);
  }
};


// compare the password with the hashed one
// if true it will return user name , else will reject it 
users.basicAuth = async function(user , pass){
  let fromDB = await Model.read(user);
  console.log('basicAuth read', fromDB);
  let check = await bcrypt.compare(pass , fromDB[0].password);
  if(check){
    console.log('check => true');
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


// bearer authorization method that verifies the token
users.tokenValidator= async function(token){
  try {
    console.log('tokenV try' ,typeof token);
  

    let data = await jwt.verify(token , SECRET);
    console.log('TV data', data);
    let searchResult = await Model.read(data.user);
    console.log('TV search result ', searchResult);

    if(searchResult[0]){
      console.log('if true');
      return searchResult[0];
    }else{
      console.log('if false');
      return 'ターゲットを見つけることができません';
    }

  }catch(err){
    return Promise.reject(err); 
  }
};


module.exports = users ;
