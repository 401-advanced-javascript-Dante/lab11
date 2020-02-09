'use strict';


require('dotenv').config();
const superagent = require('superagent');
const users = require('./users.js');

const tokenUrl = 'https://github.com/login/oauth/access_token' ;
const githubApi = 'https://api.github.com/user' ;

const client_id = 'c7b647fd88cc12ee3754';
const client_secret = process.env.client_secret;
const redirect_uri = 'http://localhost:3000/oauth';
const state = 'Resident_Evil';




async function getToken(code){

  let gitHubResponse = await superagent.post(tokenUrl).send({
    code: code ,
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri,
    state: state,
  });

  let access_token = gitHubResponse.body.access_token;
  return access_token ;
}

async function getData(access_token){
  let data = await superagent.get(githubApi)
    .set('user-agent' , 'express-app')
    .set('Authorization' , `token ${access_token}`);

  return data.body ;
}

async function saveAndGet(data){
  let userData = {
    name : data.login ,
    password : 'is-that-all-stranger?',
  };

  let generatedToken = await users.tokenGenerator(userData);
  let saved = await users.checkAndSave(userData);
  
  return [saved , generatedToken] ;
}


module.exports= async function theDealer(req , res , next){
  try{
    let code = req.query.code ;
    console.log('github Code:', code);

    let githubToken = await getToken(code) ;
    console.log('github token:', githubToken);

    let githubData = await getData(githubToken) ;
    console.log('github data:', githubData);

    let modifiedUserData = await saveAndGet(githubData);
    console.log('hashed and token:', modifiedUserData);

    let token = modifiedUserData[1] ;
    let user = modifiedUserData[0] ;

    req.token = token ;
    req.user = user ;
    next();


  }catch(error){
    console.error(error);

  }
};