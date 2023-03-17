import { Routes, Route } from "react-router-dom";
import Login from "../users/Login";
import Signup from "../users/Signup";
import JobList from "../jobs/JobList";
import CompanyList from "../companies/CompanyList";
import Profile from "../users/Profile";
import Home from "./Home";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
function NavRoutes({ login }) {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route element={<PublicRoutes />}>
        <Route exact path="/login" element={<Login login={login} />} />
        <Route exact path="/signup" element={<Signup />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/companies/:handle" element={<JobList companyJobs />} />
        <Route exact path="/companies" element={<CompanyList />} />
        <Route exact path="/jobs" element={<JobList />} />
      </Route>
    </Routes>
  );
}

export default NavRoutes;
