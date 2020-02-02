'use strict';

const {server} = require('../lib/server.js');
// for mock testing ...
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server) ;


// ready to test the routes 
describe('Test' , () => {

  it('404 works' , ()=> {
    return mockRequest.get('/nothing')
      .then(data => {
        expect(data.status).toBe(404);
      });
  });
  
  // it('' , () => {
        
  // });

  // it('' , () => {
        
  // });


});
