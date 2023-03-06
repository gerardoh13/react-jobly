import React from "react";
import "./JobCard.css";

function JobCard({ companyName, equity, id, salary, title }) {
  return (
    <div className="card my-2 col-8">
      <div className="card-body">
        <p><b>{title}</b></p>
        <p>{companyName}</p>
        {salary ? <p>Salary: {salary}</p> : null}
        {equity ? <p>Equity: {equity}</p>: null}
        <button className="btn btn-danger float-end">Apply</button>
      </div>
    </div>
  );
}

export default JobCard;
