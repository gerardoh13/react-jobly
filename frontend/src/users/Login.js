import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ login }) {
  const INITIAL_STATE = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await login(formData);
    setFormData(INITIAL_STATE);
    if (response.valid) {
      navigate("/");
    } else setErrors(response.errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value.trim(),
    }));
  };

  let alerts = errors.map((e, i) => (
    <div className="alert alert-danger " role="alert" key={i}>
      {e}
    </div>
  ));

  return (
    <div className="card col-lg-4 col-md-5 col-sm-6 col-12 my-auto">
      <div className="card-body">
        <h5 className="card-title">Login</h5>
        <form onSubmit={handleSubmit}>
          {errors.length ? alerts : null}
          <div className="form-floating my-4">
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              value={formData.username}
              placeholder="username"
              required
              autoComplete="username"
              onChange={handleChange}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-4">
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="password"
              required
              autoComplete="current-password"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary form-control">Submit</button>
        </form>
        <p className="text-center mt-2">
          New to Jobly?
          <span className="ms-1">
            <Link to="/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
