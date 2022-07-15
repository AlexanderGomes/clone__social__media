const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')


const {
  addComment,
  deleteComment,
  getComment,
  updateComment
} = require("../controllers/comment");

router.post("/", protect,addComment);
router.delete("/:postId/:commentId",  protect,deleteComment);
router.get("/:postId",  protect,getComment);
router.put("/:id",  protect,updateComment);




module.exports = router;
