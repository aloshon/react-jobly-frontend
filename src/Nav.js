import React, { useContext } from "react";
import {NavLink} from "react-router-dom";
import "./Nav.css";
import UserContext from "./UserContext";

function Nav({logout}) {
  const {user} = useContext(UserContext);
  if(user){
    return (
      <div>
        <nav className="navbar">
          <NavLink exact to="/" className="navbar-home">Jobly</NavLink>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/"><div onClick={logout}>Logout {user}</div></NavLink>
        </nav>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <NavLink exact to="/" className="navbar-home">Jobly</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </nav>
    </div>
  );

}

export default Nav;