var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var server = require('../index.js');

chai.use(chaiHttp);

describe('Users', function(){
  describe('Server running', function(){
    it('should return 200', function(){
      expect(server).to.exist;

      chai.request(server)
        .get('/api')
        .end(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.json;
          expect(res.body.message).to.be.equal('Hi Five Soccer API welcomes you :)');
          done();
        });
    });
  })
  describe('GET /users', function (){
    it('should return all users JSON formatted', function (){
      chai.request(server)
        .get('/api/users')
        .end(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.json;
          console.log('users.js:30 - ', res.body);
          console.log('users.js:31 - ', res.body.length);
          expect(res.body).to.have.length.above(1);
          done();
        });
    });
  });
});