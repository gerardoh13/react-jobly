import React, { useState, useContext, useEffect } from "react";
import UserContext from "../users/UserContext";

function JobCard({
  companyName,
  job,
  setdeleteId,
  setShowConfirm,
  profile,
  setJobToEdit,
  setShowForm,
}) {
  const [applied, setApplied] = useState(false);
  const { applyToJob, checkIfApplied, currUser, unApplyToJob } =
    useContext(UserContext);

  useEffect(() => {
    setApplied(checkIfApplied(job.id));
  }, [job.id, checkIfApplied]);

  const apply = async () => {
    if (checkIfApplied(job.id)) return;
    await applyToJob(job.id);
    setApplied(true);
  };

  const unApply = async () => {
    if (!checkIfApplied(job.id)) return;
    await unApplyToJob(job.id);
    setApplied(false);
  };

  const handleDelete = () => {
    setdeleteId(job.id);
    setShowConfirm(true);
  };

  const handleEdit = () => {
    setJobToEdit(job);
    setShowForm(true);
  };

  let userBtnClass = `btn float-end ${applied ? "btn-danger" : "btn-success"}`;
  const userBtn = (
    <button className={userBtnClass} onClick={applied ? unApply : apply}>
      {applied ? "Unapply" : "Apply"}
    </button>
  );

  const adminBtns = (
    <>
      <button
        className="btn btn-outline-info me-md-1 mb-md-0 mb-1"
        onClick={handleEdit}
      >
        <i className="bi bi-pencil-fill"></i>
      </button>
      <button className="btn btn-outline-danger" onClick={handleDelete}>
        <i className="bi bi-trash"></i>
      </button>
    </>
  );

  let cardClass = profile ? "card mb-2 col-12" : "card my-2 col-12 col-sm-7";
  return (
    <div className={cardClass}>
      <div className="card-body row">
        <div className="col-9">
          <p>
            <b>{job.title}</b>
            <br />
            <em>{companyName}</em>
          </p>
          {job.salary ? (
            <>
              <span>Salary: ${job.salary.toLocaleString()}</span>
              <br />
            </>
          ) : null}
          {job.equity ? (
            <>
              <span>Equity: {job.equity}</span>
            </>
          ) : null}
        </div>
        <div className="col-3 btnBottomEnd text-end">
          {currUser.isAdmin ? adminBtns : userBtn}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
