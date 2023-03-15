import React, { useState, useContext, useEffect } from "react";
import UserContext from "../users/UserContext";

function JobCard({ companyName, equity, salary, title, id, setdeleteId, setShow }) {
  const [applied, setApplied] = useState(false);
  const { applyToJob, checkIfApplied, currUser } = useContext(UserContext);

  useEffect(() => {
    setApplied(checkIfApplied(id));
  }, [id, checkIfApplied]);

  const apply = async () => {
    if (checkIfApplied(id)) return;
    let appSuccess = await applyToJob(id);
    setApplied(appSuccess.applied === id);
  };

  const handleDelete = () => {
    setShow(true)
    setdeleteId(id)
  }

  const userBtn = (
    <button
      className="btn btn-danger float-end"
      onClick={apply}
      disabled={applied}
    >
      {applied ? "Applied" : "Apply"}
    </button>
  );

  const adminBtns = (
    <>
      <button className="btn btn-info me-1" onClick={apply}>
        <i className="bi bi-pencil-fill"></i>
      </button>
      <button className="btn btn-danger " onClick={handleDelete}>
        <i className="bi bi-trash"></i>
      </button>
    </>
  );
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
        <div className="col-2">{currUser.isAdmin ? adminBtns : userBtn}</div>
      </div>
    </div>
  );
}

export default JobCard;
