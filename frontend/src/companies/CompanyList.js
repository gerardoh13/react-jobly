import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api";
import Pagination from "../common/Pagination";
import CompanyCard from "./CompanyCard";
import SearchAndFilter from "../common/SearchAndFilter";
import UserContext from "../users/UserContext";
import AddCompanyForm from "./AddCompanyForm";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [pagination, setPages] = useState({ index: 0 });
  const { currUser } = useContext(UserContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async (filters) => {
    let allCompanies = await JoblyApi.getCompanies(filters);
    let pgs = [];
    for (let i = 0; i < allCompanies.length; i += 20) {
      const page = allCompanies.slice(i, i + 20);
      pgs.push(page);
    }
    setCompanies(pgs[0]);
    setPages({
      pages: pgs,
      totalPages: pgs.length,
      index: 0,
    });
  };

  const addCompany = async (data) => {
    await JoblyApi.addCompany(data);
    getCompanies();
  };
  const nextPage = () => {
    setCompanies(pagination.pages[pagination.index + 1]);
    setPages((prev) => ({ ...prev, index: prev.index + 1 }));
  };

  const prevPage = () => {
    setCompanies(pagination.pages[pagination.index - 1]);
    setPages((prev) => ({ ...prev, index: prev.index - 1 }));
  };
  const goToIdx = (e) => {
    const idx = Number(e.target.name);
    setCompanies(pagination.pages[idx]);
    setPages((prev) => ({ ...prev, index: idx }));
  };
  let cards = companies.map((company) => (
    <CompanyCard
      key={company.handle}
      name={company.name}
      description={company.description}
      handle={company.handle}
      logoUrl={company.logoUrl}
    />
  ));

  let pageNavigation =
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

  return (
    <>
      <AddCompanyForm show={show} setShow={setShow} addCompany={addCompany} />
      <div className="mt-5 col-sm-7 col-12">
        <SearchAndFilter search={getCompanies} />
      </div>
      <div className="mb-3 col-sm-7 col-12 row">
        {currUser.isAdmin ? (
          <div className="col-sm-12 col-md-3 mb-sm-2">
            <button className="btn btn-success" onClick={() => setShow(true)}>
              Add Company
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

export default CompanyList;
