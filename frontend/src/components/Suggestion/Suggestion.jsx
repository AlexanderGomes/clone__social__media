import  {useEffect} from 'react'
import Avatar from '../../images/noAvatar.png'
import './Suggestion.css'
import { useSelector} from "react-redux";
import axios from 'axios';




const Suggestion = ({friend}) => {
const avatarImage =(friend.profilePicture ? friend.profilePicture : Avatar)
const { user } = useSelector((state) => state.auth);


const Follow = () => {
  try {
    axios.put(`/api/user/${friend._id}/follow`, {userId: user._id})
  } catch (error) {
    console.lof(error.message)
  }
}

const unFollow = () => {
  try {
    axios.put(`/api/user/${friend._id}/unfollow`, {userId: user._id})
  } catch (error) {
    console.lof(error.message)
  }
}


  return (
    <div className='suggestion__main'>
    <div>
    <img className='suggestion__img' src={avatarImage} alt="" />
    </div>
    <div className='suggestion__all'>
    <div className='suggestion__name'>
     <h4>{friend.name}</h4>
    </div>
    <div>
        <button onClick={Follow}>Follow</button>
        <button onClick={unFollow}>unFollow</button>

    </div>
    </div>
    </div>
  )
}

export default Suggestion