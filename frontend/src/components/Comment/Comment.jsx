import React, {useState} from 'react'
import './Comment.css'



const Comment = ({comment}) => {


  return (
    <div className='comment__all'>
    <div className='comment__main'>

<div>{new Date(comment.createdAt).toLocaleString('en-US')}</div>
  <p>{comment.desc}</p>
    </div>
    </div>
  )
}

export default Comment