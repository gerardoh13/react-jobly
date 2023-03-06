import React, { useState } from "react";

function JobFilterForm({ getJobs }) {
  const [formData, setFormData] = useState({
    minSalary: 0,
    hasEquity: false,
    title: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let filters = {};
    for (let key in formData) {
        console.log(formData[key])
      if (formData[key]) filters[key] = formData[key];
    }
    // console.log(filters);
    getJobs(filters)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value.trim(),
    }));
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-9">
        <div className="form-floating my-4">
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="title"
          />
          <label htmlFor="searchTerm">Search by title</label>
        </div>
      </div>
      <div className="col-2">
        <button className="btn btn-primary btn-lg mt-4">Search</button>
      </div>

      {/* <label htmlFor="minSalary">Minimum Salary: </label>
      <input type="number" id="minSalary" name="minSalary" />
      <label htmlFor="hasEquity">Has Equity</label>
      <input type="checkbox" id="hasEquity" name="hasEquity" /> */}
    </form>
  );
}

export default JobFilterForm;
