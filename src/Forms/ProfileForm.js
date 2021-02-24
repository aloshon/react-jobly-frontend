import React, {useContext, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import useFields from '../Hooks/useFields';
import "./Forms.css";
import UserContext from "../UserContext";
import JoblyApi from "../api";

const ProfileForm = () => {
    const [currUser, setCurrUser] = useState(null);
    // Get logged in user and token
    const {user, token} = useContext(UserContext);
    
    const [formData, handleChange] = useFields({
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let res = await JoblyApi.saveProfile(user, formData);
            console.log(`res: ${res}`)
            alert("Updated!");
        }catch(e){
            console.log(`ERROR UPDATING PROFILE!:${e}`)
            alert(`ERROR UPDATING PROFILE!:${e}`)
        }
    }

    useEffect(() => {
        async function getCurrUser(){
            const u = await JoblyApi.getCurrUser(user);
            // After current user is loaded, 
            // prefill the form with user data
            formData.firstName = u.firstName;
            formData.lastName = u.lastName;
            formData.email = u.email;
            setCurrUser(u);
        }
        getCurrUser();
    }, [user])

    // Check if token is not found, if not then protect certain routes
    // and redirect to login form
    if(!token) {
        return <Redirect to="/login"/>
    }

    // While currUser is null, display loading text
    if(!currUser){
        return <h1>LOADING...</h1>;
    } 

    return (
        <div className="container">
            <h2>Username: {user}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input 
                id="firstname"
                type="text"
                name="firstName" 
                placeholder="firstname" 
                value={formData.firstName}
                onChange={handleChange}/>
                <label htmlFor="lastName">Last Name</label>
                <input 
                id="lastname"
                type="text"
                name="lastName" 
                placeholder="lastname" 
                value={formData.lastName}
                onChange={handleChange}/>
                <label htmlFor="email">Email</label><br/>
                <input 
                id="email"
                type="text"
                name="email" 
                placeholder="email"
                value={formData.email}
                onChange={handleChange}>
                </input>
                <label htmlFor="password">Confirm password to make changes</label>
                <input 
                id="password"
                type="password"
                name="password" 
                placeholder="password" 
                value={formData.password}
                onChange={handleChange}/>
                <input
                value="Save Changes"
                type="submit">
                </input>
            </form>
        </div>
    )
}

export default ProfileForm;