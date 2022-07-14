const asyncHandler = require("express-async-handler");
const Post = require('../models/postModel')


const createPost = asyncHandler(async (req, res) => {
    res.send('create post')
})
const updatePost = asyncHandler(async (req, res) => {
    res.send('update post')
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