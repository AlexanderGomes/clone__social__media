import React from "react";
import "./Navbar.css";
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="nav__main">
      <div className="nav__logo">
        <h4 className="nav__logo__text">A2G Social</h4>
      </div>
      <div className="nav__links">
        <ul className="nav__links__ul">
        <Link to={'/register'}>
          <li>Register </li>
        </Link>
        <Link to={'/login'}>
          <li>Login</li> 
        </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
