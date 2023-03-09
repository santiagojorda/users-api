const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const expect = chai.expect

chai.use(chaiHttp)

describe('API', () => {
    describe('POST /usr/signin', () => {
      it('usuario creado con exito', (done) => {
        const newUser = {
          username: 'usertest01',
          password: 'usertest01password',
          email: 'usertest01@gmail.com'
        }

        chai.request(app)
          .post('/usr/signin')
          .send({username: newUser.username, password: newUser.password, email: newUser.email})
          .end((err, res) => {
            if (err) return done(err)
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('username', newUser.username)
            done();
          });
      });

      it('devuelve un error si falta un campo obligatorio', (done) => {
        chai.request(app)
          .post('/usr/signin')
          .send({
            password: 'testpassword'
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });
  });