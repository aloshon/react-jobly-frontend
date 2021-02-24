import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import useFields from '../Hooks/useFields';
import "./Forms.css";
import UserContext from "../UserContext";

const LoginForm = () => {
    const history = useHistory();
    const {login} = useContext(UserContext);
    const [formData, handleChange] = useFields({
        username: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let res = await login(formData);
            if(res === true){
                history.push('/');
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
                value="Login"
                type="submit">
                </input>
            </form>
        </div>
    )
}

export default LoginForm;