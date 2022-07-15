import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Feed.css'
import Suggestion from '../Suggestion/Suggestion'
import { useSelector} from "react-redux";

const Feed = () => {
    const [friends, setFriends] = useState([])
    const [visible, setViseble] = useState(3)
    const [post, setPost] = useState([])

    const { user } = useSelector((state) => state.auth);
    //fetching users
    const GetAllUsers = async () => {
      useEffect(() => {
        axios.get('/api/user/all')
        .then(res => {
          setFriends(res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt)
          }))
        })
        .catch(error => {
          console.log(error)
        })
      }, [setFriends])
    }
    GetAllUsers();

   const GetPosts = async () => {
    useEffect(() => {
      axios.get(`/api/post/timeline/${user._id}`)
      .then(res => {
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
    }, [setPost])
   }
   GetPosts()
  

const showMore = () => {
    setViseble(prevValue => prevValue + 3)
}

const showLess = () => {
    setViseble(prevValue => prevValue - 3)
}
  return (
    <div className='feed__main'>
        <h3 className='feed__h1'>People you may know</h3>
      {friends.slice(0, visible).map((friend) => (
        <Suggestion key={friend._id}  friend={friend}/>
      ))}
      <button onClick={showMore}>Show more</button>
      <button onClick={showLess}>Show less</button>

    </div>
  )
}

export default Feed