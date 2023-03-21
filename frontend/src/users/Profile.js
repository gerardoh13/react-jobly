import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import JoblyApi from "../api";
import JobCardMap from "../jobs/JobCardMap";
import Alerts from "../common/Alerts";

function Profile() {
  const { currUser, setCurrUser, applicationIds } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    username: currUser.username,
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    password: "",
  });
  useEffect(() => {
    getApplications();
  }, [applicationIds]);

  const getApplications = async () => {
    let appRes = await JoblyApi.getApplications(currUser.username);
    setApplications(appRes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetAlerts();
    let credentials = await checkPassword();
    if (credentials.valid) {
      let updatedData = formatData();
      let updatedUser = await JoblyApi.updateUser(
        formData.username,
        updatedData
      );
      setCurrUser(updatedUser);
      setMsgs(["Profile Successfully Updated"]);
    } else {
      setErrors(credentials.errors);
    }
  };

  const resetAlerts = () => {
    setErrors([]);
    setMsgs([]);
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

  let cardClass = applications.length
    ? "col-11 col-sm-7 col-lg-6 mt-5 m-auto"
    : "col-11 col-sm-6 col-md-5 col-lg-4 mt-5";
  return (
    <div className={applications.length ? "row profileDiv" : "content"}>
      <div className={cardClass}>
        <h2 className="text-light text-center">My Profile</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Edit Profile</h5>
            <form onSubmit={handleSubmit}>
              {msgs.length ? <Alerts msgs={msgs} type={"success"} /> : null}
              {errors.length ? <Alerts msgs={errors} /> : null}
              <div className="form-floating my-3">
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  value={formData.username}
                  placeholder="username"
                  autoComplete="username"
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
                  autoComplete="current-password"
                  onChange={handleChange}
                />
                <label htmlFor="password">
                  Confirm password to make changes
                </label>
              </div>
              <button className="btn btn-primary form-control">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>

      {applications.length ? (
        <div className="col-12 col-sm-7 col-lg-6 mt-5 m-auto">
          <h2 className="text-light text-center">Applications</h2>
          <JobCardMap jobs={applications} profile />
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
