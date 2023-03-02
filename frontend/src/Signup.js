import React, { useState } from "react";

function Signup() {
  const INITIAL_STATE = {
    username: "",
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPwd: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData(INITIAL_STATE);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value.trim(),
    }));
  };

  return (
    <div className="card col-lg-4 col-md-5 col-sm-6 col-12 mt-5">
      <div className="card-body">
        <h5 className="card-title">Sign up</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              value={formData.username}
              placeholder="username"
              required
              onChange={handleChange}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="text"
              name="fName"
              id="fName"
              value={formData.fName}
              placeholder="firstname"
              required
              onChange={handleChange}
            />
            <label htmlFor="fName">First Name</label>
          </div>
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="text"
              name="lName"
              id="lName"
              value={formData.lName}
              placeholder="lastname"
              required
              onChange={handleChange}
            />
            <label htmlFor="lName">Last Name</label>
          </div>
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              placeholder="email"
              required
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="password"
              required
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              name="confirmPwd"
              id="confirmPwd"
              value={formData.confirmPwd}
              placeholder="confirm password"
              required
              onChange={handleChange}
            />
            <label htmlFor="confirmPwd">Confirm Password</label>
          </div>
          <button className="btn btn-primary form-control">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
