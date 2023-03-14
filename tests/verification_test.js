const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const User = require('../src/models/user')
const expect = chai.expect
const HTTP = require('../src/utils/http_codes')

chai.use(chaiHttp)


describe('GET - VERIFICATION - /usr/verify', () =>{

    const userVerify01 = {
        username: 'userVerifyTest01',
        password: 'userVerifyTest01',
        email: 'userverifytest01@gmail.com',
        verificationToken: 'tokenUserVerifyTest01',
        isVerificated: false
    }

    before( async () => {
        await User.deleteOne({username: userVerify01.username})
        await new User(userVerify01).save()
    })

    it( 'usuario no verificado, se verifica correctamente', (done) => {
        const user = userVerify01
        chai.request(app)
            .get(`/usr/verify?userEmail=${user.email}&verificationToken=${user.verificationToken}`)
            .end( (err, res) => {
                if(err)
                    console.log(err)
                expect(res.body.message).to.be.equals(`${user.email} has been verificated successfully`)
                expect(res).to.have.status(HTTP.REQUEST.SUCCESSFULL)
                done()
            })
    })

    // after(async () => {
    //     await User.deleteOne({username: userVerify01.username})
    // })
})