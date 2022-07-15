import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../../features/auth/authSlice'
import "./Register.css";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, username,password, password2 } = formData;
  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
  
    if(isSuccess || user) {
      navigate('/')
    }
    dispatch(reset)
  
  }, [user,  isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    
    if(password !== password2) {
      toast('Passwords do not match')
    } else {
      const userData = {
        name,
        username,
        email,
        password,
      }
      dispatch(register(userData))
    }
    }

  return (
<>  
     <section className='heading'>
     <h2 className="register__h2">Register</h2>
       <section className='form'>
           <form onSubmit={onSubmit}>
           <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              placeholder='Enter username'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>
            submit
            </button>
          </div>
           </form>
       </section>
     </section>
    </>
  );
};

export default Register;
