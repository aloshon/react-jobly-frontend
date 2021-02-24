import React, { useContext, useEffect, useState } from "react";
import "./JobCard.css";
import UserContext from "../UserContext";

const CompJobCard = ({id, title, salary, equity, companyName}) => {
    const {apply, appliedJobs} = useContext(UserContext);
    const [applied, setApplied] = useState();
    console.log(appliedJobs);

    useEffect(() => {
        setApplied(appliedJobs.has(id));
    }, [id, appliedJobs]);

    // Handle the click event for apply button
    // If applying was a success, change button to applied
    async function handleSubmit(e){
        e.preventDefault();
        if(appliedJobs.has(id)){
            alert("Already applied to this job!")
            return
        }
        if(apply(id) === true){
            setApplied(true)
        };
    }

    // Company Name is only displayed here on the /jobs route

    return (
        <div className="job-card">
            <span className="job-details">
                <h3><b>Job Title:</b> {title}</h3>
                <h4>Company: {companyName}</h4>
                <p>Salary: ${salary || 0}</p>
                <p>Equity: {equity}</p>
            </span>
            {applied ? <button disabled={true}>APPLIED</button> 
            : <button onClick={handleSubmit}>APPLY</button>}
        </div>
    )
}

export default CompJobCard;