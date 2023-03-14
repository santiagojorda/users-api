const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const User = require('../src/models/user')
const expect = chai.expect
const HTTP = require('../src/utils/http_codes')

chai.use(chaiHttp)

const {userTest01} = require('./verification_users_mock')


describe('GET - VERIFICATION - /usr/verify', () =>{

    before( async () => {
        await User.deleteOne({username: userTest01.username})
        await new User(userTest01).save()
    })

    it( 'usuario no verificado, se verifica correctamente', (done) => {
        const user = userTest01
        chai.request(app)
            .get(`/usr/verify?userEmail=${user.email}&verificationToken=${user.verificationToken}`)
            .end( (err, res) => {
                if(err)
                    console.log(err)
                expect(res.body.message).to.be.equals(`${user.email} has been verificated successfully`)
                expect(res).to.have.status(HTTP.RESPONSE.SUCCESSFULL)
                done()
            })
    })

    after(async () => {
        await User.deleteOne({username: userTest01.username})
    })
})