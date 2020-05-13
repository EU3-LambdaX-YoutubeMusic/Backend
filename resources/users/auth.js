const jwt = require('jsonwebtoken')

const Auth = {
    toAuthJSON(user){
        return{
            id: user._id,
            email: user.email,
            token : this.generateToken(user)
        }
    },

    generateToken(user){
        const options = {
            expiresIn : '48h',
        }
        const payload = {
            id: user._id
        }
    const token = jwt.sign(payload, process.env.SECRET_KEY, options)
        return token
    }

}

module.exports = { Auth };