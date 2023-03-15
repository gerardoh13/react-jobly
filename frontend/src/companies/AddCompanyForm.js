import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api";
import Modal from "react-bootstrap/Modal";
import Alerts from "../common/Alerts";
import UserContext from "../users/UserContext";

function AddCompanyForm({ show, setShow, addCompany }) {
  let DEFAULT_FORM = {
    name: "",
    description: "",
    numEmployees: "",
    logoUrl: "",
  };
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [handles, setHandles] = useState(new Set([]));
  const [errors, setErrors] = useState([]);
  const { currUser } = useContext(UserContext);

  useEffect(() => {
    async function getHandles() {
      if (currUser.isAdmin) {
        let handlesRes = await JoblyApi.getHandles();
        setHandles(new Set(handlesRes));
      }
    }
    getHandles();
  }, [currUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;
    const handle = formatHandle(formData.name);
    if (handles.has(handle)) {
      setErrors([`${formData.name} already exists`]);
      return;
    }
    let newCompany = {
      name: formData.name,
      description: formData.description,
      handle: handle,
    };
    if (formData.numEmployees) newCompany.numEmployees = +formData.numEmployees;
    if (formData.logoUrl) newCompany.logoUrl = formData.logoUrl;
    // console.log(newCompany);
    addCompany(newCompany);
    resetForm();
  };

  const formatHandle = (name) => {
    return name.toLowerCase().replace(" ", "-");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value.trimStart().replace(/\s+/g, " "),
    }));
  };

  const resetForm = () => {
    setFormData(DEFAULT_FORM);
    setErrors([]);
    setShow(false);
  };

  return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Add New Company</Modal.Title>
          <button
            className="btn-close"
            aria-label="Close"
            onClick={resetForm}
          ></button>
        </Modal.Header>
        <Modal.Body>
          {errors.length ? <Alerts msgs={errors} /> : null}
          <form onSubmit={handleSubmit}>
            <div className="form-floating my-2">
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                placeholder="name"
                required
                onChange={handleChange}
              />
              <label htmlFor="name">Name (Required)</label>
            </div>
            <div className="form-floating my-2">
              <input
                className="form-control"
                type="text"
                name="description"
                id="description"
                value={formData.description}
                placeholder="description"
                required
                onChange={handleChange}
              />
              <label htmlFor="description">Description (Required)</label>
            </div>
            <div className="form-floating my-3">
              <input
                className="form-control"
                type="number"
                name="numEmployees"
                id="numEmployees"
                min="0"
                value={formData.numEmployees}
                placeholder="numEmployees"
                onChange={handleChange}
              />
              <label htmlFor="title">Employee Count (Optional)</label>
            </div>
            <div className="form-floating my-3">
              <input
                className="form-control"
                type="url"
                name="logoUrl"
                id="logoUrl"
                value={formData.logoUrl}
                placeholder="logoUrl"
                onChange={handleChange}
              />
              <label htmlFor="logoUrl">Logo URL (Optional)</label>
            </div>
            <div className="float-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                data-bs-dismiss="modal"
                onClick={resetForm}
              >
                Close
              </button>
              <button className="btn btn-success">Add Company</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
  );
}

export default AddCompanyForm;
