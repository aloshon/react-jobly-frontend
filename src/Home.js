import React, {useContext} from "react";
import UserContext from "./UserContext";

function Home() {
  // Get user from api, if no user logged, 
  // do not display welcome message
  const {user} = useContext(UserContext);

  return (
    <div>
      <h1>Jobly</h1>
      <h3>All the jobs in one, convenient place.</h3>
      {user && <h2>Welcome Back, {user}!</h2>}
    </div>
  );
}

export default Home;