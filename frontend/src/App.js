import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import JoblyApi from "./api";
import JobList from "./jobs/JobList";
import CompanyList from "./companies/CompanyList";

function App() {

  const login = async (data) => {
    try {
      let token = await JoblyApi.login(data);
      // console.log(token)
      return {valid: true}
    } catch (errors) {
      return {valid: false, errors}
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login login={login} />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/jobs" element={<JobList />} />
          <Route exact path="/companies" element={<CompanyList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
