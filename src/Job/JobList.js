import React, { useState, useEffect, useContext} from "react";
import JoblyApi from "../api";
import useFields from "../Hooks/useFields";
import JobCard from "./JobCard";
import UserContext from "../UserContext";
import {Redirect} from "react-router-dom";
import "./JobList.css";

function JobList() {

    const [jobs, setJobs] = useState(null);
    // Get token to check if a user is logged in
    const {token} = useContext(UserContext);
  
    const [formData, handleChange] = useFields({
        title: ''
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        setJobs(null);
        getJobs(formData.title);
    }

    useEffect(function getJobsOnLoad(){
      getJobs();
    }, []);

    async function getJobs(title){ 
        let jobs = await JoblyApi.getAllJobs(title);
        setJobs(jobs);
    }
  
    /* render: either loading text or list of jobs. */
    
    if (jobs) {
        // Check if token is not found, if not then protect certain routes
        // and redirect to login form
        if(!token) {
            return <Redirect to="/login"/>
        }

      return (
        <div className="joblist">
            <div className="joblist-form">
                <form onSubmit={handleSubmit}>
                    <input 
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Enter search term.."
                    onChange={handleChange}/>
                    <button className="joblist-form-button">Search</button>
                </form>
            </div>
    
          {jobs.map(j => (
            <JobCard key={j.id} id={j.id} title={j.title} salary={j.salary} 
            equity={j.equity} companyName={j.companyName} />
          ))}
        </div> 
      );
    }

    return <h1>LOADING...</h1>;
  
  }
  
  export default JobList;