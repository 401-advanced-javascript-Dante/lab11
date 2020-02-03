'use strict';

// const userSchema = require('./users-schema.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Model = require('./user-model.js');
let users = {} ;
const SECRET = 'NoBodyKnow';


users.save = async function (data){
  let parsedData = data;
  // console.log('save fffffffffffff');
  console.log('**************************************' ,typeof parsedData);
  let search = parsedData.name ;
  // console.log(parsedData.name);
  // console.log('****************************', await Model.read(search))
  if(!(await Model.read(search) === parsedData)){
    parsedData.password = await bcrypt.hash(parsedData.password , 5);
    console.log('before return' ,parsedData);
    await Model.create(parsedData);
    console.log('create db object');
    return parsedData ;
  }
};


users.tokenGenerator = async function(data){
  let token = await jwt.sign(data.name , SECRET) ;
  console.log('tokkken', token);
  return token ;
};

users.basicAuth = async function(user , pass){
  let fromDB = Model.read(user);
  console.log('hi basic Auth', fromDB);
  let check = await bcrypt.compare(pass , fromDB.password);
  if(check){
    return fromDB;
  }else{
    return Promise.reject ;
  }
};

users.showAll = async function(){
  let result = Model.read() ;
  console.log('showall: ', result);
  return result ;
};

module.exports = users ;

// users.save({name : 'dante' , password: 'dknkjf'});