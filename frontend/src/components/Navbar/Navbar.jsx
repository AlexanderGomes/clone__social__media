import React, { useEffect, useState } from "react";

import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";


const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };


  return (
    <div className="nav__main">
      <div className="nav__logo">
        <h4 className="nav__logo__text">A2G Social</h4>
      </div>
      <div className="nav__links">
        <ul className="nav__links__ul">
          {user ? (
            <div>
              <button className="btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
