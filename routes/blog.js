const express = require('express')
const router = express.Router()
const User = require('../model/user')
const Blog = require('../model/blog')

// SHOW ADD BLOG PAGE
router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user
    }) 
})

// CREATE BLOG
router.post('/add-new', async (req, res) => {
    try {
        const user = req.user
        const bod = req.body   // ✅ consistent naming

        // ❗ safety check (important)
        if (!user) {
            return res.redirect('/user/signin')
        }
        console.log(bod.body)
        await Blog.create({
            title: bod.title,
            body: bod.body,
            owner:user.fullName,
            createdBy: user._id
        })

        return res.redirect('/')
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
})

module.exports = router