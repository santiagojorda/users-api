
const signinMw = (req, res) => {
    res.json({ message: 'hola' })
    res.end()
}

module.exports = signinMw