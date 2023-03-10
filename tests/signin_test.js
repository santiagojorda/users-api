const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const user = require('../src/models/user')
const User = require('../src/models/user')
const expect = chai.expect

chai.use(chaiHttp)

describe('POST - SIGNIN - /usr/signin', () => {

    const userTest01 = {
      username: 'userTest01',
      password: 'userTest01',
      email: 'userTest01@gmail.com'
    }

    const userTest02 = {
      username: 'userTest02',
      password: 'userTest02',
      email: 'userTest02@gmail.com'
    }

    before( (done) => {
      User.deleteMany({ $or: [
        {username: userTest01.username},
        {username: userTest02.username}
      ]})
      .then( () => {
        new User(userTest02)
        .save()
        .then( () => done())
      })
    })
  
    it('usuario creado con exito', (done) => {

      chai.request(app)
        .post('/usr/signin')
        .send(userTest01)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('devuelve error si falta un campo obligatorio', (done) => {
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

    it('devuelve error si se registra usuario que ya existe', (done) => {

      chai.request(app)
        .post('/usr/signin')
        .send(userTest02)
        .end( (err, res) => {
          expect(res).to.have.status(400)
          done()
        })
    })

    after( (done) => {
      User.deleteMany({ $or: [
          {username: userTest01.username},
          {username: userTest02.username}
        ]})
        .then( () => done())
    })

  });