import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Post.css";
import Avatar from "../../images/noAvatar.png";
import Comment from "../Comment/Comment";
import heart from "../../images/heart.png";
import { AiOutlineComment } from "react-icons/ai";
import CommentForm from "../Comment/CommentForm";
import { TiDeleteOutline } from "react-icons/ti";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [users, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const avatarImage = users.profilePicture ? users.profilePicture : Avatar;

  useEffect(() => {
    setIsLiked(post.likes.includes(users._id));
  }, [users._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put("/api/post/like/" + post._id, { userId: users._id });
    } catch (err) {
      console.log(err.message);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/${post.user}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.user]);

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/api/comments/${post._id}`);
      setComments(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchComment();
  }, [setComments]);

 

const DeletePost = async () => {
  try {
      await axios.delete('/api/post/' + post._id, {user: user._id}) 
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className="whole">
      <div className="post__main">
        <div className="post__wrapper">
          <div className="post__user">
            <img className="avatar__img" src={avatarImage} alt="" />
            <h3 className="user__name">{users.name}</h3>
          </div>
          <h4 className="post__text">{post.text}</h4>
          <div className="img__div">
            <img className="post__img" src={post.img} alt="" />
          </div>
        </div>
        <div className="post__functions">
          <span className="post__lik">{like}</span>
          <img
            onClick={likeHandler}
            className="post__like"
            src={heart}
            alt=""
          />
          <div className="post__comment">
            <AiOutlineComment size={"30px"} onClick={() => setToggle(true)} />

            {toggle &&
              (comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    className="main"
                    key={comment._id}
                    comment={comment}
                  />
                ))
              ) : (
                <>
                  <p>No comments</p>
                </>
              ))}
          </div>
        </div>
        <div className="main">
          <CommentForm post={post} />
        </div>
      </div>
    </div>
  );
};

export default Post;
