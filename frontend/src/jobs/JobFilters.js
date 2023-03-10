import React from "react";

function JobFilters({ handleChange, formData }) {
  return (
    <>
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
          min={0}
          onChange={handleChange}
          value={formData.minSalary}
          style={{ width: "100px" }}
        />
      </li>
    </>
  );
}

export default JobFilters;
