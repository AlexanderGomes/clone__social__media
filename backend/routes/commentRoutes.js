const express = require("express");
const router = express.Router();

const {
  addComment,
  deleteComment,
  getComment,
} = require("../controllers/comment");

router.post("/", addComment);
router.delete("/:postId/:commentId", deleteComment);
router.get("/:postId", getComment);

module.exports = router;
