const express = require("express");
const router = express.Router();
const {createPost, updatePost, getPostById, getPostByUsername, getTimelinePost, deletePost, likeDeslikePost} = require('../controllers/post')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect,createPost)
router.put('/:id',  protect,updatePost)
router.get('/:id', protect,getPostById)
router.get('/profile/:username',  protect,getPostByUsername)
router.get('/timeline/:user',   protect,getTimelinePost)
router.delete('/:id',   protect,deletePost)
router.put('/like/:id',  protect,likeDeslikePost)



module.exports = router;
