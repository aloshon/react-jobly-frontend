import React from "react";
import {Link} from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({handle, name, description, logoUrl}) => {
    return(
        <Link exact to={`/companies/${handle}`} style={{ textDecoration: 'none' }}>
            <div className="company-card">
                <span className="company-card-details">
                    <h3>{name}</h3>
                    <p>{description}</p>
                </span>
                <small><img src={logoUrl} alt={logoUrl} /></small>
            </div>
        </Link>
    )
}

export default CompanyCard;