// packages
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const dbConnect = require('./utils/mongoDb')

// folders
const userRoutes = require('./routes/userRoute')
const postRoutes = require('./routes/postRoute')
const commentRoutes = require('./routes/commentRoutes')

//calling packages
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comments', commentRoutes)




app.listen(port, async () => {
    await dbConnect()
    console.log('mongodb connected')
    console.log(`server on port ${port}`)
})