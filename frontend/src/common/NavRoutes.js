import { Routes, Route } from "react-router-dom";
import Login from "../Login";
import Signup from "../Signup";
import JobList from "../jobs/JobList";
import CompanyList from "../companies/CompanyList";
import Profile from "../users/Profile";

function NavRoutes({ login }) {
  return (
    <Routes>
      <Route exact path="/login" element={<Login login={login} />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/jobs" element={<JobList />} />
      <Route exact path="/companies" element={<CompanyList />} />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default NavRoutes;
