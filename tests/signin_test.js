const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const HTTP = require('../src/utils/http_codes')
const User = require('../src/models/user')
const expect = chai.expect

const {userTest01, userTest02} = require('./signin_users_mock')

chai.use(chaiHttp)

const cleanDBTestingUsers = async () => {
    await User.deleteMany({ $or: [
      {username: userTest01.username},
      {username: userTest02.username}
    ]})
}

describe('POST - SIGNIN - /usr/signin', () => {

    before( async () => {
      await cleanDBTestingUsers()
      await new User(userTest02).save()
    })
  
    it('usuario creado con exito', (done) => {
      chai.request(app)
        .post('/usr/signin')
        .send(userTest01)
        .end((err, res) => {
          if(err) console.log(err)
          expect(res).to.have.status(HTTP.REQUEST.CREATED);
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
          if(err) console.log(err)
          expect(res).to.have.status(HTTP.SERVER.BAD_REQUEST);
          done();
        });
    });

    it('devuelve error si se registra usuario que ya existe', (done) => {
      chai.request(app)
        .post('/usr/signin')
        .send(userTest02)
        .end( (err, res) => {
          if(err) console.log(err)
          expect(res).to.have.status(HTTP.SERVER.BAD_REQUEST)
          done()
        })
    })

    after( async () => {
      await cleanDBTestingUsers()
    })

  });