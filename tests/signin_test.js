const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const expect = chai.expect

const User = require('../src/models/user')

chai.use(chaiHttp)

const usersTest = [{
    username: 'userTest01',
    password: 'userTest01',
    email: 'userTest01@gmail.com'
  },
  {
    username: 'userTest02',
    password: 'userTest02',
    email: 'userTest02@gmail.com'
  }
]

const cleanDBTestingUsers = async () => {
    await User.deleteMany({ $or: [
      {username: usersTest[0].username},
      {username: usersTest[1].username}
    ]})
}

describe('POST - SIGNIN - /usr/signin', () => {

    before( async () => {
      await cleanDBTestingUsers()
      await new User(usersTest[1]).save()
    })
  
    it('usuario creado con exito', (done) => {
      chai.request(app)
        .post('/usr/signin')
        .send(usersTest[0])
        .end((err, res) => {
          if(err) console.log(err)
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
          if(err) console.log(err)
          expect(res).to.have.status(400);
          done();
        });
    });

    it('devuelve error si se registra usuario que ya existe', (done) => {
      chai.request(app)
        .post('/usr/signin')
        .send(usersTest[1])
        .end( (err, res) => {
          if(err) console.log(err)
          expect(res).to.have.status(400)
          done()
        })
    })

    after( async () => {
      await cleanDBTestingUsers()
    })

  });