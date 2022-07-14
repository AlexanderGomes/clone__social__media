const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  //validation
  if (!name || !username || !email || !password) {
    res.status(400).json({ message: "fill all fields" });
  }

  //check if user exists
  const findUser = await User.findOne({ email });
  if (findUser) {
    res.status(400).json("user already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //create User
  const user = await User.create({
    name,
    email,
    username,
    password: hashPassword,
  });

  // pass the response
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  //being passed on the body
  const { email, password } = req.body;

  //finding user
  const user = await User.findOne({ email });

  //validation
  if (!user) {
    res.status(400).json("user do not exist");
  }

  //comparing hashed password and sending back information
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});

const getSingleUser = asyncHandler(async (req, res) => {
  try {
    //finding user by id and sending it back
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const followUser = asyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      //finding both users
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      //if the user on the params is not being followed by the user on the body
      //push the user on the body to the list of followers and the user on the params to the followings
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(400).json("you already follow this user");
      }
    } catch (error) {
      res.status(402).json(error.message);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

const unfollowUser = asyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      //finding both users
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      //if the user on the params is not being followed by the user on the body
      //push the user on the body to the list of followers and the user on the params to the followings
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(400).json("you dont follow this user");
      }
    } catch (error) {
      res.status(402).json(error.message);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

const getUsersFollowers = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];

    friends.map((friend) => {
      const { _id, username, name } = friend;
      friendList.push({ _id, username, name });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const getUsersFollowings = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const friends = await Promise.all(
      user.followers.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];

    friends.map((friend) => {
      const { _id, username, name } = friend;
      friendList.push({ _id, username, name });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error.message);
  }

});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT__SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getSingleUser,
  getAllUsers,
  followUser,
  unfollowUser,
  getUsersFollowers,
  getUsersFollowings
};
