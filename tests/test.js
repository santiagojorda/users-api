const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const expect = chai.expect

chai.use(chaiHttp)
const url= 'http://localhost:4000/usr/signin';


describe('API', () => {
    describe('GET /usr/signin', () => {
      it('debería devolver un mensaje de saludo', (done) => {
        chai.request(app)
          .get('/usr/signin')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('hola');
            done();
          });
      });
    });
  });