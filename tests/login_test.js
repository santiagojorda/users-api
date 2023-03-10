const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const expect = chai.expect

chai.use(chaiHttp)

describe('POST - LOGIN - /usr/login', () => {
    it('usuario ingresa con exito', (done) => {

        const user = {
            username: 'usertest01',
            password: 'usertest01password'
        }
    

        chai.request(app)
            .post('/usr/login')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })

    })
})