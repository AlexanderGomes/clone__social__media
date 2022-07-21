import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useSelector } from "react-redux";

const Data = ({p}) => {
    // const [following, setFollowing] = useState(p.followings.length)
console.log(p)

  return (
    <div>
    <h1>{p.name}</h1>
    </div>
  )
}

export default Data