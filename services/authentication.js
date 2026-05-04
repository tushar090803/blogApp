const { json } = require('express')
const JWT = require('jsonwebtoken')

function createTokenForUser(user) {
    const payload = {
        _id : user._id,
        email: user.email,
        profile: user.profileImageUrl,
        role: user.role,
        fullName: user.fullName,
    }

    const token = JWT.sign(payload, process.env.SECRET)

    return token
}

function validateToken(token) {
    const payload = JWT.verify(token, process.env.SECRET)

    return payload
}

module.exports = {
    createTokenForUser,
    validateToken
}