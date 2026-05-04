const express = require('express')
const router = express.Router()
const User = require('../model/user')

// SIGNIN PAGE
router.get('/signin', (req, res) => {
    res.render('signin')
})

// SIGNUP PAGE
router.get('/signup', (req, res) => {
    res.render('signup')
})

// SIGNIN LOGIC
router.post('/signin', async (req, res) => {
    const { email, password } = req.body

    try {
        const token = await User.matchPassword(email, password)

        console.log("token", token)

        return res.cookie('token', token).redirect('/')
    } catch (error) {
        return res.redirect('/user/signin')
    }
})

// SIGNUP LOGIC
router.post('/signup', async (req, res) => {
    const body = req.body;

    try {
        // ✅ correct query + await
        const existingUser = await User.findOne({
            fullName: body.fullName
        })

        // ✅ proper check
        if (existingUser) {
            return res.send("User already exists")
        }

        await User.create({
            fullName: body.fullName,
            email: body.email,
            password: body.password
        })

        return res.redirect('/')
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
})

// LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie("token").redirect('/')
})

module.exports = router