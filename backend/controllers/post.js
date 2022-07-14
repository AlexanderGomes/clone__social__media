const asyncHandler = require("express-async-handler");
const Post = require('../models/postModel')


const createPost = asyncHandler(async (req, res) => {
   const newPost = new Post(req.body)
   try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
   } catch (error) {
    res.status(400).json(error.message)
   }
})


const updatePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.user.toString() === req.body.user){
            await post.updateOne({$set: req.body});
            res.status(200).json({post, message: 'post has been updated'})
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
})

const deletePost = asyncHandler(async (req, res) => {
    res.send('delete post')
})

const likeDeslikePost = asyncHandler(async (req, res) => {
    res.send('like/deslike post')
})

const getPostByUsername = asyncHandler(async (req, res) => {
    res.send('get post')
})
const getTimelinePost = asyncHandler(async (req, res) => {
    res.send('timeline')
})
const getPostById = asyncHandler(async (req, res) => {
    res.send('get post by id')
})


module.exports = {
    createPost,
    updatePost,
    deletePost,
    likeDeslikePost,
    getPostByUsername,
    getTimelinePost,
    getPostById
}