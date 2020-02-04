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
  let scanResult = await Model.read(parsedData.name);
  let search =scanResult[0].name ;
  // console.log( 'scan result',scanResult);
  // console.log('scan name',scanResult[0].name);
  // console.log(parsedData.name);
  // console.log('*******************rrr*********', await Model.read(search));
  if(!( search === parsedData.name)){
    parsedData.password = await bcrypt.hash(parsedData.password , 5);
    console.log('before return' ,parsedData);
    await Model.create(parsedData);
    console.log('create db object');
    return parsedData ;
  }else{
    return parsedData;
  }
};


users.tokenGenerator = async function(data){
  let token = await jwt.sign(data.name , SECRET) ;
  console.log('tokkken', token);
  return token ;
};

users.basicAuth = async function(user , pass){


  console.log('basic auth user',user);
  console.log('basic auth user',typeof user);
  let fromDB = await Model.read(user);
  console.log('hi basic Auth', fromDB);
  let check = await bcrypt.compare(pass , fromDB[0].password);
  console.log('check' , check);
  if(check){
    return fromDB[0];
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