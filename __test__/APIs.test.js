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

  it('/showall route get works' , ()=> {
    return mockRequest.get('/showall')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });



  // it('/signup router post works' , ()=> {
  //   let newVal = { name: 'DanTe' , password: '12345'};
  //   return mockRequest.post('/signup')
  //     .send(newVal)
  //     .then(data => {
  //       console.log(data.body)
  //       expect(data.status).toBe(200);
  //     });
  // });


  // it('/signin router post give 500 if no auth exist' , ()=> {
  //   let newVal = { name: 'DanTe' , password: '12345'};
  //   return mockRequest.post('/signin')
  //     .send(newVal)
  //     .then(data => {
  //       console.log(data.body);
  //       expect(data.status).toBe(500);
  //     });
  // });


});
