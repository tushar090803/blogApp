require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require('./middlewares/authentication')
const blogRoute = require('./routes/blog')
const Blog = require("./model/blog.js")   // ✅ FIXED name

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log("Error", err))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.get('/', async (req, res) => {
    try {
        console.log("user", req.user)

        if (!req.user) {
            return res.render('signin');
        }

        const blogs = await Blog.find({})
        

        return res.render('home', {  
            user: req.user,
            blogs: blogs   
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
})

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(process.env.PORT, () => console.log(`App is listening at port localhost:${process.env.PORT}`))