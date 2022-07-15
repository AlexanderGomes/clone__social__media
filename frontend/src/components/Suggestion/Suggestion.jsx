import React from 'react'
import Avatar from '../../images/noAvatar.png'
import './Suggestion.css'




const Suggestion = ({friend}) => {
const avatarImage =(friend.profilePicture ? friend.profilePicture : Avatar)



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
        <button>Follow</button>
        <button>unFollow</button>

    </div>
    </div>
    </div>
  )
}

export default Suggestion