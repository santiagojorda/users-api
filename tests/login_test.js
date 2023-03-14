const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const expect = chai.expect
const HTTP = require('../src/utils/http_codes')
const User = require('../src/models/user')

const {userTest01, userTest02, userTest03} = require('./login_users_mock')

chai.use(chaiHttp)

describe('POST - LOGIN - /usr/login', () => {
    before( async () => {
        await User.deleteMany({ $or: [
            {username: userTest01.username},
            {username: userTest02.username},
            {username: userTest03.username}
        ]})
        await new User(userTest01).save()
        await new User(userTest03).save()
    })

    it('usuario existente y validado ingresa con exito', (done) => {
        chai.request(app)
            .post('/usr/login')
            .send(userTest01)
            .end((err, res) => {
                if(err)
                    console.log(err)
                expect(res.body.message).to.be.equals(`${userTest01.username} has successfully logged in`)
                expect(res).to.have.status(HTTP.REQUEST.SUCCESSFULL)
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
                expect(res.body.error).to.be.equals(`username or password are incorrect`)
                expect(res).to.have.status(HTTP.SERVER.UNAUTHORIZED)
                done()
            })
    })

    it('devuelve error si se intenta ingresar con campos incompletos', (done) => {
        const user = userTest02
        user.password = null
        chai.request(app)
            .post('/usr/login')
            .send(user)
            .end((err, res) => {
                if(err)
                    console.log(err)
                expect(res.body.error).to.be.equals(`username and password are required`)
                expect(res).to.have.status(HTTP.SERVER.BAD_REQUEST)
                done()
            })
    })

    it('devuelve error si se intenta ingresar un usuario no esta validado', (done) => {
        chai.request(app)
            .post('/usr/login')
            .send(userTest03)
            .end((err, res) => {
                if(err)
                    console.log(err)
                expect(res.body.error).to.be.equals(`the user has not been validated`)
                expect(res).to.have.status(HTTP.SERVER.ACCESS_FORBIDDEN)
                done()
            })
    })

    after( async () => {
        await User.deleteMany({ $or: [
            {username: userTest01.username},
            {username: userTest02.username},
            {username: userTest03.username}
          ]})
      })
})