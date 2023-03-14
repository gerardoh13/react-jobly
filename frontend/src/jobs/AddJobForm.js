import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import Modal from "react-bootstrap/Modal";

function AddJobForm({ show, setShow, addJob }) {
  let DEFAULT_FORM = {
    title: "",
    salary: "",
    handle: "",
    equity: "",
  };
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [handles, setHandles] = useState([]);

  useEffect(() => {
    async function getHandles() {
      let handlesRes = await JoblyApi.getHandles();
      setHandles(handlesRes);
    }
    getHandles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.handle) return;
    let newJob = {
      title: formData.title,
      companyHandle: formData.handle,
    };
    if (formData.salary) newJob.salary = +formData.salary;
    if (formData.equity) newJob.equity = formData.equity;
    addJob(newJob);
    resetForm();
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
    setShow(false);
  };

  const options = handles.map((handle) => (
    <option key={handle} value={handle}>
      {handle}
    </option>
  ));

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Add New Job</Modal.Title>
          <button
            className="btn-close"
            aria-label="Close"
            onClick={resetForm}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-floating my-2">
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                value={formData.title}
                placeholder="title"
                required
                onChange={handleChange}
              />
              <label htmlFor="title">Title (Required)</label>
            </div>
            <select
              className="form-select mt-3"
              name="handle"
              required
              value={formData.handle}
              onChange={handleChange}
            >
              <option value="">Company Handle (Required)</option>
              {options}
            </select>
            <div className="form-floating my-3">
              <input
                className="form-control"
                type="number"
                name="salary"
                id="salary"
                min="0"
                value={formData.salary}
                placeholder="salary"
                onChange={handleChange}
              />
              <label htmlFor="title">Salary</label>
            </div>
            <div className="form-floating my-3">
              <input
                className="form-control"
                type="number"
                name="equity"
                id="equity"
                min="0"
                max="1"
                step="0.001"
                value={formData.equity}
                placeholder="equity"
                onChange={handleChange}
              />
              <label htmlFor="equity">Equity</label>
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
              <button className="btn btn-primary">Save changes</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddJobForm;
