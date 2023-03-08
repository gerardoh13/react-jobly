import React from "react";

function CompanyCard({ name, description, handle, logoUrl, numEmployees }) {
  return (
    <div className="card my-2 col-12 col-sm-7">
      <div className="card-body">
        <p>
          <b>{name}</b>
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default CompanyCard;
