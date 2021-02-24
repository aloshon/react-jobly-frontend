import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api";
import useFields from "../Hooks/useFields";
import CompanyCard from "./CompanyCard";
import UserContext from "../UserContext";
import {Redirect} from "react-router-dom";
import "./CompanyList.css";

function CompanyList() {
    const [companies, setCompanies] = useState(null);
    // Get token to check if a user is logged in
    const {token} = useContext(UserContext);
  
    const [formData, handleChange, resetFormData] = useFields({
        name: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCompanies(null);
        getCompanies(formData.name);
        resetFormData();
    }

    useEffect(function getCompaniesOnLoad(){
      getCompanies();
    }, []);

    async function getCompanies(name){ 
        let companies = await JoblyApi.getAllCompanies(name);
        setCompanies(companies);
    }
  
    /* render: either loading text or list of companies. */
    
    if (companies) {
      // Check if token is not found, if not then protect certain routes
      // and redirect to login form
      if(!token) {
        return <Redirect to="/login"/>
      }

      return (
        <div className="companylist">
          <div className="companylist-form">
            <form onSubmit={handleSubmit}>
              <input 
              id="name"
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter search term.."
              onChange={handleChange}/>
              <button className="companylist-form-button">Search</button>
            </form>
          </div>
    
          {companies.map(c => (
            <CompanyCard key={c.handle} handle={c.handle} name={c.name} 
            description={c.description} logoUrl={c.logoUrl} />
          ))}
        </div> 
      );
    }

    return <h1>LOADING...</h1>;
  
  }
  
  export default CompanyList;
  