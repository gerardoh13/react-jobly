import React, { useState, useContext, useEffect } from "react";
import UserContext from "../users/UserContext";

function JobCard({
  companyName,
  equity,
  salary,
  title,
  id,
  setdeleteId,
  setShow,
}) {
  const [applied, setApplied] = useState(false);
  const { applyToJob, checkIfApplied, currUser, unApplyToJob } =
    useContext(UserContext);

  useEffect(() => {
    setApplied(checkIfApplied(id));
  }, [id, checkIfApplied]);

  const apply = async () => {
    if (checkIfApplied(id)) return;
    await applyToJob(id);
    setApplied(true);
  };

  const unApply = async () => {
    if (!checkIfApplied(id)) return;
    await unApplyToJob(id);
    setApplied(false);
  };

  const handleDelete = () => {
    setShow(true);
    setdeleteId(id);
  };

  const userBtn = (
    <button
      className="btn btn-danger float-end"
      onClick={applied ? unApply : apply}
    >
      {applied ? "Unapply" : "Apply"}
    </button>
  );

  const adminBtns = (
    <>
      <button
        className="btn btn-outline-info me-xl-1 mb-xl-0 mb-1"
        onClick={() => console.log("HAI")}
      >
        <i className="bi bi-pencil-fill"></i>
      </button>
      <button className="btn btn-outline-danger" onClick={handleDelete}>
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
        <div className="col-2 text-end">
          {currUser.isAdmin ? adminBtns : userBtn}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
