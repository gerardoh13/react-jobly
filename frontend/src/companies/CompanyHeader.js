import React, { useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import JoblyApi from "../api";
import { useNavigate } from "react-router-dom";

function CompanyHeader({ company, admin }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const deleteCompany = async () => {
    await JoblyApi.deleteCompany(company.handle);
    close();
    navigate("/companies");
  };

  const close = () => {
    setShowConfirm(false);
  };
  return (
    <>
      <ConfirmModal show={showConfirm} confirm={deleteCompany} close={close} />
      <div className="card color-light mb-3">
        <div className="card-body">
          <div>
            <b className="fs-3">{company.name}</b>
            {company.logoUrl ? (
              <img
                className="float-end smLogo"
                src={company.logoUrl}
                alt="company logo"
              />
            ) : null}
          </div>
          <p className="card-text">{company.description}</p>
          <br />
          {admin ? (
            <div className="text-end">
              <button
                className="btn btn-info me-1"
                onClick={() => console.log("HAI")}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowConfirm(true)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default CompanyHeader;
