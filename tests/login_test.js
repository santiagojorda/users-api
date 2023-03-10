const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const expect = chai.expect

const User = require('../src/models/user')

chai.use(chaiHttp)

describe('POST - LOGIN - /usr/login', () => {

    const userTest01 = {
        username: 'userLoginTest01',
        password: 'userLoginTest01',
        email: 'userLoginTest01@gmail.com'
    }

    const userTest02 = {
        username: 'userLoginTest02',
        password: 'userLoginTest02',
        email: 'userLoginTest02@gmail.com'
    }

    before( (done) => {
        User.deleteMany({ $or: [
            {username: userTest01.username},
            {username: userTest02.username}
          ]})
        .then( () => {
            new User(userTest01).save()
                .then( () => done())
        })
    })

    it('usuario existente ingresa con exito', (done) => {
        chai.request(app)
            .post('/usr/login')
            .send(userTest01)
            .end((err, res) => {
                if(err)
                    console.log(err)
                expect(res).to.have.status(200)
                done()
            })
    })

    it('devuelve error si se intenta ingresar un usuario que no existe', (done) => {
        chai.request(app)
            .post('/usr/login')
            .send(userTest02)
            .end((err, res) => {
                if(err)
                    console.log(err)
                expect(res).to.have.status(401)
                done()
            })
    })

    it('devuelve error si se intenta ingresar con campos incompletos', (done) => {
        userTest02.password = null
        chai.request(app)
            .post('/usr/login')
            .send(userTest02)
            .end((err, res) => {
                if(err)
                    console.log(err)
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
})