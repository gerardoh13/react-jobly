import React from "react";
import { useNavigate } from "react-router-dom";
function CompanyCard({ name, description, handle, logoUrl }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(handle);
  };
  return (
    <div className="card my-2 col-12 col-sm-7 pointer" onClick={handleClick}>
      <div className="card-body">
        <p>
          <b>{name}</b>
          {logoUrl ? <img className="float-end smLogo" src={logoUrl} alt="company logo" /> : null}
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default CompanyCard;
