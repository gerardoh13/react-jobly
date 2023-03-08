import React from "react";

function JobCard({ companyName, equity, id, salary, title }) {

  return (
    <div className="card my-2 col-12 col-sm-7">
      <div className="card-body">
        <p>
          <b>{title}</b>, <em>{companyName}</em>
        </p>
        {salary ? <span>Salary: ${salary.toLocaleString()}</span> : null}
        {equity ? <p>Equity: {equity}</p> : null}
        <button className="btn btn-danger float-end">Apply</button>
      </div>
    </div>
  );
}

export default JobCard;
