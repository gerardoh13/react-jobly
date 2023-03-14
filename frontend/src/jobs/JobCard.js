import React, { useState, useContext, useEffect } from "react";
import UserContext from "../users/UserContext";

function JobCard({ companyName, equity, salary, title, id }) {
  const [applied, setApplied] = useState(false);
  const { applyToJob, checkIfApplied } = useContext(UserContext);
  useEffect(() => {
    setApplied(checkIfApplied(id));
  }, [id, checkIfApplied]);

  const apply = async () => {
    if (checkIfApplied(id)) return;
    let appSuccess = await applyToJob(id);
    setApplied(appSuccess.applied === id);
  };

  return (
    <div className="card my-2 col-12 col-sm-7">
      <div className="card-body row">
        <div className="col-10">
          <p>
            <b>{title}</b>, <em>{companyName}</em>
          </p>
          {salary ? <span>Salary: ${salary.toLocaleString()}</span> : null}
          {equity ? <p>Equity: {equity}</p> : null}
        </div>
        <div className="col-2">
          <button
            className="btn btn-danger float-end"
            onClick={apply}
            disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
