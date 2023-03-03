import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import Pagination from "../common/Pagination";

function JobList() {
  const defaultObj = {
    index: 0,
    hasPreviousPage: false,
  };
  const [jobs, setJobs] = useState(null);
  const [pagination, setPages] = useState(defaultObj);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    let allJobs = await JoblyApi.getJobs();
    if (allJobs.length <= 20) setJobs(allJobs);
    else {
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
        hasPreviousPage: false,
      });
    }
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

  return (
    <div className="card">
      <Pagination
        nextPage={nextPage}
        prevPage={prevPage}
        goToIdx={goToIdx}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.index + 1 === pagination.totalPages}
        hasPreviousPage={pagination.index !== 0}
        idx={pagination.index}
      />
      
    </div>
  );
}

export default JobList;
