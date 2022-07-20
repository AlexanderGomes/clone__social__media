import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Feed.css";
import Suggestion from "../Suggestion/Suggestion";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import { FaUserFriends } from "react-icons/fa";

const Feed = () => {
  const [friends, setFriends] = useState([]);
  const [visible, setViseble] = useState(3);
  const [posts, setPosts] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const GetAllUsers = async () => {
    useEffect(() => {
      axios
        .get("/api/user/all")
        .then((res) => {
          setFriends(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }, [setFriends]);
  };
  GetAllUsers();

  const GetPosts = async () => {
    useEffect(() => {
      axios
        .get(`/api/post/timeline/${user._id}`)
        .then((res) => {
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        }, []);
    }, [setPosts]);
  };
  GetPosts();

  // const showMore = () => {
  //   setViseble((prevValue) => prevValue + 3);
  // };

  // const showLess = () => {
  //   setViseble((prevValue) => prevValue - 3);
  // };
  return (
    <div className="feed__main">
<button className="button__friend" onClick={() => setToggle(true)}><FaUserFriends/> Friend suggestion</button>
      <div className="feed__post">
          {toggle &&
            friends.map((friend) => (
              <div>
                <Suggestion key={friend._id} friend={friend} />
              </div>
            ))}
        {posts.length > 0 ?
              posts.map((post) => (
                <Post className='main' key={post._id}  post={post}/>
              ))
              : (
                <>
                <p className="post__feed">No posts, follow someone to see what they are talking about</p>
                </>
              )
        }
        <div className="suggestion__move">
        <div className="feed__friend">
        </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
