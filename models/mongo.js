'use strict';


// CRUD methods for MONGO DB  
class Mongo {
  constructor(schema){
    this.schema = schema ;
  }
    
  read(name){
    if(name){
      console.log('trueeee', name);
      return this.schema.find({name});
    }else{
      console.log('falseeeee');

      return this.schema.find({});
    }
  }

  create(value){

    let newValue = new this.schema(value);
    console.log('new save ' , newValue);
    return newValue.save();
  }

  update(_id , value){
    return this.schema.findByIdAndUpdate(_id , value , {new : true});
  }

  delete(_id){
    return this.schema.findOneAndDelete(_id); 
  }
}


module.exports = Mongo ;