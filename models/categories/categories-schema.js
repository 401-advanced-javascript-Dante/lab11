'use strict' ;


const mongoose = require('mongoose');

const categories = mongoose.Schema({
  name: {type : Array , require : true },
});


module.exports = mongoose.model('categories', categories);