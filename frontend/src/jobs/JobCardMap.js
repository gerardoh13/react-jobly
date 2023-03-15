import React from "react";
import JobCard from "./JobCard";

function JobCardMap({ jobs, setdeleteId, company, setShowConfirm }) {
  return (
    <>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          companyName={job.companyName || company.name}
          equity={job.equity}
          salary={job.salary}
          title={job.title}
          setdeleteId={setdeleteId}
          setShow={setShowConfirm}
        />
      ))}
    </>
  );
}

export default JobCardMap;
