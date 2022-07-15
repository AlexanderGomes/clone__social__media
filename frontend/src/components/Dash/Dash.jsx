import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Feed from "../Feed/Feed";
import axios from 'axios'
import './Dash.css'

const Dash = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    
  }, [user, navigate, dispatch]);
  
 
  return (
    <div>
  <Feed />
    </div>
  )
}

export default Dash