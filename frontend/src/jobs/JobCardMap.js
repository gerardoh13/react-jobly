import React from "react";
import JobCard from "./JobCard";

function JobCardMap({
  jobs,
  setdeleteId,
  company,
  setShowConfirm,
  profile,
  setJobToEdit,
  setShowForm,
}) {
  return (
    <>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          companyName={job.companyName || company.name}
          job={job}
          setdeleteId={setdeleteId}
          setJobToEdit={setJobToEdit}
          setShowForm={setShowForm}
          setShowConfirm={setShowConfirm}
          profile={profile}
        />
      ))}
    </>
  );
}

export default JobCardMap;
