const express = require("express");
const router = express.Router();
const {createPost, updatePost, getPostById, getPostByUsername, getTimelinePost, deletePost, likeDeslikePost} = require('../controllers/post')


router.post('/', createPost)
router.put('/:id', updatePost)
router.get('/:id', getPostById)
router.get('/profile/:username',getPostByUsername)
router.get('/timeline/:userId', getTimelinePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likeDeslikePost)



module.exports = router;
