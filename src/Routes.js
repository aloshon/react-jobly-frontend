import React from "react";
import { Route, Switch} from "react-router-dom";
import Home from "./Home";
import SignupForm from "./Forms/SignupForm";
import LoginForm from "./Forms/LoginForm";
import CompanyList from "./Company/CompanyList";
import CompanyDetails from "./Company/CompanyDetails";
import JobList from "./Job/JobList";
import ProfileForm from "./Forms/ProfileForm"

const Routes = () => {

    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/signup" >
                <SignupForm />
            </Route>
            <Route exact path="/companies">
                <CompanyList /> 
            </Route>
            <Route exact path="/companies/:handle" >
                <CompanyDetails />
            </Route> 
            <Route exact path="/jobs">
                <JobList />
            </Route>
            <Route exact path="/login" >
                <LoginForm />
            </Route>
            <Route exact path="/profile" >
                <ProfileForm />
            </Route>
            <Route>
                <h1>ERROR 404</h1>
                <p>Hmmm. I can't seem to find what you want...</p>
                <img src=
                "https://icon2.cleanpng.com/20180207/rdq/kisspng-http-404-error-message-clip-art-small-alligator-web-design-vector-material-damage-5a7b2ee406de37.8236082415180223720281.jpg"
                />
            </Route>
        </Switch>
      );
}

export default Routes