'use strict';


const schema = require('./categories-schema.js');
const Mongo = require('../mongo.js');


class Categories extends Mongo {
  constructor(){
    super(schema);
  }
}

module.exports = new Categories() ;