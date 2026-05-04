const { validateToken } = require("../services/authentication")
const Blog = require('../model/blog')

function checkForAuthenticationCookie(cookieName) {
    return async (req, res, next) => {
        const token = req.cookies[cookieName]

        if (!token) {
            return next()
        }

        try {
            const userPayload = validateToken(token)
            req.user = userPayload

            
        } catch (error) {
            
        }
        return next()
    }
}

module.exports = {
    checkForAuthenticationCookie
}