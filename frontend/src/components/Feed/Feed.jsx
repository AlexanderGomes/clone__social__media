import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Feed.css'
import Suggestion from '../Suggestion/Suggestion'

const Feed = () => {
    const [friends, setFriends] = useState([])
    const [visible, setViseble] = useState(3)

    //fetching users
    const GetAllUsers = async () => {
      useEffect(() => {
        axios.get('/api/user/all')
        .then(res => {
          setFriends(res.data)
        })
        .catch(error => {
          console.log(error)
        })
      }, [setFriends])
    }
    GetAllUsers();

const showMore = () => {
    setViseble(prevValue => prevValue + 3)
}

const showLess = () => {
    setViseble(prevValue => prevValue - 3)
}
  return (
    <div className='feed__main'>
      {friends.slice(0, visible).map((friend) => (
        <Suggestion key={friend._id}  friend={friend}/>
      ))}
      <button onClick={showMore}>Show more</button>
      <button onClick={showLess}>Show less</button>

    </div>
  )
}

export default Feed