// packages
const express = require('express')
const path = require('path')
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

//Serve frontend
if(process.env.NODE__ENV === 'production') {
app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}


app.listen(port, async () => {
    await dbConnect()
    console.log('mongodb connected')
    console.log(`server on port ${port}`)
})