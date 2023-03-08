import React from "react";

function CompanyFilters({ handleChange, formData }) {
  return (
    <>

      <li>
        <label className="my-3 me-2" htmlFor="minEmployees">
          Min Employees:
        </label>
        <input
          type="number"
          id="minEmployees"
          name="minEmployees"
          value={formData.minEmployees}
          onChange={handleChange}
          style={{ width: "100px" }}
        />
      </li>
      <li>
        <label className="my-3 me-2" htmlFor="maxEmployees">
          Max Employees:
        </label>
        <input
          type="number"
          id="maxEmployees"
          name="maxEmployees"
          value={formData.maxEmployees}
          onChange={handleChange}
          style={{ width: "100px" }}
        />
      </li>
    </>
  );
}

export default CompanyFilters;
