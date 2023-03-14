import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    let formatted = formatData();
    console.log(formatted);
    setFormData(INITIAL_STATE);
  };

  const formatData = () => {
    let formatted = {};
    for (let key in formData) {
      if (key === "email") {
        formatted[key] = formData[key].toLowerCase();
      } else formatted[key] = formData[key].trimEnd();
    }
    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimCheck = name === "fName" || name === "lName";
    setFormData((data) => ({
      ...data,
      [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value.trim(),
    }));
  };

  return (
    <div className="card col-lg-4 col-md-5 col-sm-6 col-11 mt-5">
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
              minLength="6"
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
              minLength="5"
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
              minLength="5"
              onChange={handleChange}
            />
            <label htmlFor="confirmPwd">Confirm Password</label>
          </div>
          <button className="btn btn-primary form-control">Submit</button>
        </form>
        <p className="text-center mt-2">
          Have an account?
          <span className="ms-1">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
