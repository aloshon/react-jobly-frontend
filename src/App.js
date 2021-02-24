import React, {useState, useEffect} from "react";
import './App.css';
import { Switch } from "react-router-dom";
import Routes from "./Routes";
import Nav from "./Nav";
import UserContext from "./UserContext";
import jwt from "jsonwebtoken";
import JoblyApi from "./api";
import useLocalStorage from "./Hooks/useLocalStorage";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage("token", null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  useEffect(function getUserFromToken() {
    async function getUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class.
          JoblyApi.token = token;
          let currUser = await JoblyApi.getCurrUser(username);
          setUser(currUser.username);
          setAppliedJobs(new Set(currUser.applications))
        } catch (e) {
          console.error(e);
          // If any errors getting token, log out user
          setUser(null);
        }
      }
    }

    getUser();
  }, [token]);

  //Handles logout in Nav
  function logout() {
    setUser(null);
    setToken(null);
  }

  // Try to set token and sign up user, if error occurs,
  // display it in console and return false
  // Only when true will the page redirect and user is signed in
  async function signup(data) {
    try {
      let token = await JoblyApi.getSignup(data);
      setToken(token);

      return true;
    } catch (e) {
      console.error(`Error Signing In: ${e}`);
      throw (`ERROR SIGNING IN!: ${e}`);
    }
  }

  // Try to set token, if error occurs, display it in console and return false
  // Only when true will the page redirect and user is logged in
  async function login(data) {
    try {
      let token = await JoblyApi.getLogin(data);
      setToken(token);
      localStorage.setItem("token", token);
      return true;
    } catch (e) {
      console.error(`Error Logging In: ${e}`);
      throw (`ERROR LOGGING IN!: ${e}`);
    }
  }

  // Check is user applied for job, if not add job id to appliedJobs
  async function apply(id){
    try{
        if(appliedJobs.has(id)) throw "Already applied to this job!";
        await JoblyApi.applyToJob(user, id);
        setAppliedJobs(new Set([...appliedJobs, id]));
        return true

    } catch(e){
        console.error(`ERROR APPLYING TO JOB!: ${e}`)
        alert(`ERROR APPLYING TO JOB!: ${e}`);
    }
}

  return (
    <UserContext.Provider value={{user, token, signup, login, apply, appliedJobs}}>
      <div className="App">
        <Nav logout={logout} />
        <Switch>
          <Routes/>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
