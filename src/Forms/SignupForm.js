import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import useFields from '../Hooks/useFields';
import "./Forms.css";
import UserContext from "../UserContext";

const SignupForm = () => {
    const history = useHistory();
    const {signup} = useContext(UserContext);
    console.log(signup)
    const [formData, handleChange] = useFields({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let res = await signup(formData);
            console.log(`res: ${res}`)
            if(res === true){
                history.push('/companies');
            }
        }catch(e){
            console.log(`ERROR:${e}`)
            alert(e)
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input 
                id="username"
                type="text"
                name="username" 
                placeholder="username" 
                value={formData.username} 
                onChange={handleChange}/>
                <input 
                id="password"
                type="password"
                name="password" 
                placeholder="password" 
                value={formData.password}
                onChange={handleChange}/>
                <input 
                id="firstname"
                type="text"
                name="firstName" 
                placeholder="firstname" 
                value={formData.firstname}
                onChange={handleChange}/>
                <input 
                id="lastname"
                type="text"
                name="lastName" 
                placeholder="lastname" 
                value={formData.lastname}
                onChange={handleChange}/>
                <input 
                id="email"
                type="text"
                name="email" 
                placeholder="email"
                value={formData.email}
                onChange={handleChange}>
                </input>
                <input
                value="Sign Up!"
                type="submit">
                </input>
            </form>
        </div>
    )
}

export default SignupForm;