const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

const addComment = asyncHandler(async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


const deleteComment = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: { comments: req.params.commentId },
      },
      { new: true }
    );

    if (!post) {
      return res.status(400).send("Post not found");
    }
    
     
    await Comment.findByIdAndDelete(req.params.commentId);

    res.send("comment deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});


const updateComment = asyncHandler(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if(comment.userId.toString() === req.body.userId) {
        await comment.updateOne({$set: req.body}, {new: true});
        res.status(200).json({comment, message: 'post has been updated'})
    }
} catch (error) {
    res.status(400).json(error.message)
}
})


const getComment = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  addComment,
  deleteComment,
  getComment,
  updateComment
};
