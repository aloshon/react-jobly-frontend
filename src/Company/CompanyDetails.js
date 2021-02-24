import React, {useState, useEffect, useContext} from "react";
import { useParams, Redirect } from "react-router-dom";
import JoblyApi from "../api";
import UserContext from "../UserContext";
import JobCard from "../Job/JobCard";
import "./CompanyDetails.css"

const CompanyDetails = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);
    // Check if a user is logged in
    const {token} = useContext(UserContext);

    useEffect(() => {
        async function getCompany(){
            const comp = await JoblyApi.getCompany(handle);
            setCompany(comp)
        }
        getCompany();
    }, [handle]);

    // Check if token is not found, if not then protect certain routes
    // and redirect to login form
    if(!token) {
        return <Redirect to="/login"/>
    }

    if(!company){
        return <h1>LOADING...</h1>;
    } 

    return(
        <div>
            <main className="company-details">
                <h1>{company.name}</h1>
                <h4>{company.description}</h4>
            </main>
            <h2>Job Openings:</h2>
            <div className="JobList">
                {company.jobs.map(j => (
                    <JobCard
                        key={j.id}
                        id={j.id}
                        title={j.title}
                        salary={j.salary}
                        equity={j.equity}
                        />))}
            </div>
        </div>
    )
}

export default CompanyDetails;