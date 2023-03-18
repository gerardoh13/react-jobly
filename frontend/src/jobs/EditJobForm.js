import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

function EditJobForm({ show, setShow, editJob, job, company }) {
  let DEFAULT_FORM = {
    id: "",
    title: "",
    companyName: "",
    salary: "",
    equity: "",
  };
  const [formData, setFormData] = useState(DEFAULT_FORM);

  useEffect(() => {
    if (job) {
      setFormData({
        id: job.id,
        title: job.title,
        companyName: job.companyName || company.name,
        salary: job.salary || "",
        equity: job.equity || "",
      });
    }
  }, [job, company]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;
    let editedJob = {
      title: formData.title,
    };
    if (formData.salary) editedJob.salary = +formData.salary;
    if (formData.equity) editedJob.equity = formData.equity;
    editJob(formData.id, editedJob);
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

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{job ? "Edit Job" : "Add New Job"}</Modal.Title>
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
            <label htmlFor="title">Title (Required):</label>
          </div>
          <div className="form-floating my-2">
            <input
              className="form-control"
              type="text"
              id="company"
              value={formData.companyName}
              placeholder="company"
              readOnly
              disabled
            />
            <label htmlFor="company">Company:</label>
          </div>
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
            <label htmlFor="title">Salary:</label>
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
            <label htmlFor="equity">Equity:</label>
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
            <button className="btn btn-success">
              {job ? "Edit" : "Add"} Job
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditJobForm;
