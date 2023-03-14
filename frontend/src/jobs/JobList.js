import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api";
import Pagination from "../common/Pagination";
import SearchAndFilter from "../common/SearchAndFilter";
import JobCard from "./JobCard";
import { useParams } from "react-router-dom";
import UserContext from "../users/UserContext";
import AddJobForm from "./AddJobForm";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPages] = useState({ index: 0 });
  const [company, setCompany] = useState(null);
  const [show, setShow] = useState(false);
  const { currUser } = useContext(UserContext);
  const { handle } = useParams();

  useEffect(() => {
    getJobs();
  }, [handle]);

  const getJobs = async (filters) => {
    let allJobs;
    try {
      if (!handle) {
        allJobs = await JoblyApi.getJobs(filters);
      } else {
        let companyRes = await JoblyApi.getCompany(handle);
        setCompany(companyRes);
        allJobs = companyRes.jobs;
      }
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
    } catch (e) {
      console.log(e);
    }
  };

  const addJob = async (data) => {
    await JoblyApi.addJob(data)
    getJobs()
  }

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
  const cards = jobs.map((job) => (
    <JobCard
      key={job.id}
      id={job.id}
      companyName={job.companyName || company.name}
      equity={job.equity}
      salary={job.salary}
      title={job.title}
    />
  ));

  const pageNavigation =
    pagination.totalPages > 1 ? (
      <Pagination
        nextPage={nextPage}
        prevPage={prevPage}
        goToIdx={goToIdx}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.index + 1 === pagination.totalPages}
        hasPreviousPage={pagination.index !== 0}
        idx={pagination.index}
      />
    ) : null;

  let header = company ? (
    <div className="card color-light">
      <div className="card-body">
        <p>
          <b className="fs-3">{company.name}</b>
          {company.logoUrl ? (
            <img
              className="float-end smLogo"
              src={company.logoUrl}
              alt="company logo"
            />
          ) : null}
        </p>
        <p className="card-text">{company.description}</p>
      </div>
    </div>
  ) : null;

  return (
    <>
      <AddJobForm show={show} setShow={setShow} addJob={addJob} />
      <div className="mt-5 col-sm-7 col-12">
        {handle ? header : <SearchAndFilter search={getJobs} />}
      </div>
      <div className="mb-3 col-sm-7 col-12 row">
        {currUser.isAdmin ? (
          <div className="col-sm-12 col-md-3 mb-sm-2">
            <button className="btn btn-success" onClick={() => setShow(true)}>
              Add Job
            </button>
          </div>
        ) : null}
        <div className="col">
          <div className={currUser.isAdmin ? "float-end" : ""}>
            {pageNavigation}
          </div>
        </div>
      </div>
      {cards}
      <div className="mt-3 mb-4">{pageNavigation}</div>
    </>
  );
}

export default JobList;
