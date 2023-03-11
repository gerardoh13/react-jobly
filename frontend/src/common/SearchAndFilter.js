import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import JobFilters from "../jobs/JobFilters";
import CompanyFilters from "../companies/CompanyFilters";

function SearchAndFilter({ search }) {
  let location = useLocation();
  let currLocation = location.pathname;
  let NO_FILTERS =
    currLocation === "/jobs"
      ? {
          minSalary: "",
          hasEquity: false,
          title: "",
        }
      : {
          minEmployees: "",
          maxEmployees: "",
          name: "",
        };
  const [formData, setFormData] = useState(NO_FILTERS);
  const handleSubmit = (e) => {
    e.preventDefault();
    let filters = {};
    for (let key in formData) {
      if (formData[key]) filters[key] = formData[key];
    }
    search(filters);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "hasEquity") {
      setFormData((data) => ({
        ...data,
        hasEquity: !formData.hasEquity,
      }));
    } else {
      setFormData((data) => ({
        ...data,
        [name]: value.trim(),
      }));
    }
  };

  const resetFilters = () => {
    setFormData(NO_FILTERS);
    search();
  };

  return (
    <div className="input-group mb-3">
      <button
        className="btn btn-info dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filters
      </button>
      <ul className="dropdown-menu text-center px-2">
        {currLocation === "/jobs" ? (
          <JobFilters handleChange={handleChange} formData={formData} />
        ) : (
          <CompanyFilters handleChange={handleChange} formData={formData} />
        )}
        <li>
          <button
            className="btn btn-secondary form-control"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </li>
      </ul>
      <input
        type="text"
        className="form-control"
        name={currLocation === "/jobs" ? "title" : "name"}
        placeholder={
          currLocation === "/jobs"
            ? "Search by job title..."
            : "Search by company name..."
        }
        onChange={handleChange}
        value={currLocation === "/jobs" ? formData.title : formData.name}
      />
      <button className="btn btn-primary" type="button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}

export default SearchAndFilter;
