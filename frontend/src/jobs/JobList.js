import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import Pagination from "../common/Pagination";
import JobCard from "./JobCard";
import JobFilterForm from "./JobFilterForm";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPages] = useState({index: 0});

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async (filters) => {
    let allJobs = await JoblyApi.getJobs(filters);
    console.log(allJobs.length);
    // if (allJobs.length <= 20) setJobs(allJobs);
    // else {
      let pgs = [];
      for (let i = 0; i < allJobs.length; i += 20) {
        const page = allJobs.slice(i, i + 20);
        pgs.push(page);
      }
      setJobs(pgs[0]);
      setPages({
        pages: pgs,
        totalPages: pgs.length,
        index: 0,
      });
    // }
  };

  const nextPage = () => {
    setJobs(pagination.pages[pagination.index + 1]);
    setPages((prev) => ({ ...prev, index: prev.index + 1 }));
  };

  const prevPage = () => {
    setJobs(pagination.pages[pagination.index - 1]);
    setPages((prev) => ({ ...prev, index: prev.index - 1 }));
  };
  const goToIdx = (e) => {
    const idx = Number(e.target.name);
    setJobs(pagination.pages[idx]);
    setPages((prev) => ({ ...prev, index: idx }));
  };
  let cards = jobs.map((job) => (
    <JobCard
      key={job.id}
      companyName={job.companyName}
      equity={job.equity}
      salary={job.salary}
      title={job.title}
    />
  ));

  return (
    <>
      <div className="card mt-5 col-8">
        <JobFilterForm getJobs={getJobs}/>
        {pagination.pages.length > 1 ?<Pagination
          nextPage={nextPage}
          prevPage={prevPage}
          goToIdx={goToIdx}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.index + 1 === pagination.totalPages}
          hasPreviousPage={pagination.index !== 0}
          idx={pagination.index}
        /> : null}
      </div>
      {cards}
    </>
  );
}

export default JobList;
