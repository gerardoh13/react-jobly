import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import JoblyApi from "../api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: currUser.username,
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let credentials = await checkPassword();
    console.log(credentials.valid);
    if (credentials.valid) {
      let updatedData = formatData();
      let updatedUser = await JoblyApi.updateUser(
        formData.username,
        updatedData
      );
      setCurrUser(updatedUser);
      navigate("/");
    } else {
      setErrors(credentials.errors);
    }
  };

  const formatData = () => {
    let formatted = {};
    for (let key in formData) {
      if (key === "email") {
        formatted[key] = formData[key].toLowerCase();
      } else formatted[key] = formData[key].trimEnd();
    }
    delete formatted.username;
    return formatted;
  };

  const checkPassword = async () => {
    let credentials = {
      username: formData.username,
      password: formData.password,
    };
    try {
      await JoblyApi.login(credentials);
      return { valid: true };
    } catch (errors) {
      return { valid: false, errors };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]:
        name !== "password"
          ? value.trimStart().replace(/\s+/g, " ")
          : value.trim(),
    }));
  };

  let alerts = errors.map((e, i) => (
    <div className="alert alert-danger " role="alert" key={i}>
      {e}
    </div>
  ));

  return (
    <div className="card col-lg-4 col-md-5 col-sm-6 col-12 mt-5">
      <div className="card-body">
        <h5 className="card-title">Profile</h5>
        <form onSubmit={handleSubmit}>
          {errors.length ? alerts : null}
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="text"
              id="username"
              value={formData.username}
              placeholder="username"
              disabled
              readOnly
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              placeholder="firstname"
              required
              onChange={handleChange}
            />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              placeholder="lastname"
              required
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
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
            <label htmlFor="password">Confirm password to make changes</label>
          </div>
          {/* <div className="form-floating mb-3">
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
          </div> */}
          <button className="btn btn-primary form-control">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
