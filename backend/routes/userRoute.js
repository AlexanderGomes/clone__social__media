const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  getUsersFollowers,
  getUsersFollowings,
  followUser,
  unfollowUser,
} = require("../controllers/user");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.get("/followers/:id", getUsersFollowings);
router.get("/followings/:id", getUsersFollowers);
router.get("/:id", getSingleUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

module.exports = router;
