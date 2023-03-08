import React, { useState } from "react";

function JobFilterForm({ getJobs }) {
  const NO_FILTERS = {
    minSalary: 0,
    hasEquity: false,
    title: "",
  };
  const [formData, setFormData] = useState(NO_FILTERS);

  const handleSubmit = (e) => {
    e.preventDefault();
    let filters = {};
    for (let key in formData) {
      if (formData[key]) filters[key] = formData[key];
    }
    getJobs(filters);
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
        <ul className="dropdown-menu text-center">
          <li>
            <div className="form-check form-switch">
              <input
                className="form-check-input ms-2"
                type="checkbox"
                role="switch"
                id="hasEquity"
                name="hasEquity"
                checked={formData.hasEquity}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="hasEquity">
                Has Equity
              </label>
            </div>
          </li>
          <li>
            <label className="my-3 me-2" htmlFor="minSalary">
              Minimum Salary:
            </label>
            <input
              type="number"
              id="minSalary"
              name="minSalary"
              onChange={handleChange}
              style={{ width: "100px" }}
            />
          </li>
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
          name="title"
          placeholder="Search by job title..."
          onChange={handleChange}
          value={formData.title}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
  );
}

export default JobFilterForm;
