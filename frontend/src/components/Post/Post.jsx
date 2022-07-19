import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Post.css";
import Avatar from "../../images/noAvatar.png";
import Comment from "../Comment/Comment";
import Delivery from "../../images/delivery.png";
import heart from "../../images/heart.png";
import Link from "react-router-dom";
import { AiOutlineComment } from "react-icons/ai";
import CommentForm from "../Comment/CommentForm";

const Post = ({ post }) => {
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);


  console.log(comments);
  const avatarImage = user.profilePicture ? user.profilePicture : Delivery;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/${post.user}`);
      setUser(res.data);
      if (!res.length) {
        return <p>no comments</p>;
      }
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/api/comments/${post._id}`);
      setComments(res.data);
    };
    fetchComment();
  }, [setComments]);

  return (
    <div className="whole">
      <div className="post__main">
        <div className="post__wrapper">
          <div className="post__user">
            <img className="avatar__img" src={avatarImage} alt="" />
            <h3>{user.name}</h3>
          </div>
          <h3>{post.text}</h3>
          <div className="img__div">
            <img className="post__img" src={Delivery} alt="" />
          </div>
        </div>
        <div className="post__functions">
          <img className="post__like" src={heart} alt="" />
          <div className="post__comment">
            <AiOutlineComment size={"30px"} onClick={() => setToggle(true)} />

            {toggle && (
              (comments.length > 0 ?
              comments.map((comment) => (
                <Comment className='main' key={comment._id}  comment={comment}/>
              ))
              : (
                <>
                <p>No comments</p>
                </>
              )
              )
            )}
          </div>
        </div>
        <div className="main">
              <CommentForm post={post}/> 
        </div>
      </div>
    </div>
  );
};

export default Post;
