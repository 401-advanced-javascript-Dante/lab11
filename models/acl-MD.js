'use strict';


module.exports = (license => {

  return (req , res , next) => {

    try{
      if(!req.userName){
        res.send('User Info Not Exist !!!');
        next();
        console.log('after next ??');
        return;

      }
      let userLicense = req.userName.license ;
        
      if(userLicense.includes(license)){
        next();
        console.log('after next ??');
        return;
      }else{
        next('SORRY !! You Are Not Invited !!');
      }
    }catch(err){
      next(err);
      return;
    }

  };
});