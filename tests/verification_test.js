const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app')
const expect = chai.expect

const User = require('../src/models/user')
chai.use(chaiHttp)

const HTTP_SUCCESSFULL = 200

describe('GET - VERIFICATION - /usr/verify', () =>{

    const userVerify01 = {
        username: 'userVerifyTest01',
        password: 'userVerifyTest01',
        email: 'userVerifyTest01@gmail.com',
        verificationToken: 'tokenUserVerifyTest01',
        isVerificated: false
    }

    before( async () => {
        await User.deleteMany({ $or: [
            {username: userVerify01.username},
        ]})
        await new User(userVerify01).save()
    })

    it( 'usuario no verificado, se verifica correctamente' ,(done) => {
        const user = userVerify01
        chai.request(app)
            .get(`/usr/verify?userEmail=${user.email}&token=${user.verificationToken}`)
            .end( (err, res) => {
                if(err)
                    console.log(err)
                expect(res.body.message).to.be.equals(`${user.email} has been verificated successfully`)
                expect(res).to.have.status(HTTP_SUCCESSFULL)
                done()
            })
    })

})