const asyncHandler = require("express-async-handler");
const Post = require('../models/postModel')
const User = require('../models/userModel')


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
        if(post.user.toString() === req.body.user) {
            await post.updateOne({$set: req.body});
            res.status(200).json({post, message: 'post has been updated'})
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
})

const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.user.toString() === req.body.user) {
            await post.deleteOne()
            res.status(200).json({message: 'post deleted', post})
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
})

const likeDeslikePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post.likes.includes(req.body.userId)) {
          await post.updateOne({ $push: { likes: req.body.userId } });
          res.status(200).json("The post has been liked");
        } else {
          await post.updateOne({ $pull: { likes: req.body.userId } });
          res.status(200).json("The post has been disliked");
        }
      } catch (err) {
        res.status(500).json(err);
      }
})

const getPostByUsername = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
})

const getTimelinePost = asyncHandler(async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.user);
        const userPosts = await Post.find({ user: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ user: friendId });
          })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
      } catch (err) {
        res.status(500).json(err);
      }
})

const getPostById = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json(err);
      }
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