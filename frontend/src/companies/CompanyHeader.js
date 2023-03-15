import React from "react";

function CompanyHeader({ company, setShowForm }) {
  return (
    <div className="card color-light mb-3">
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
        <button
          className="btn btn-danger float-end"
          onClick={() => setShowForm(true)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default CompanyHeader;
