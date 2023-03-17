import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import JoblyApi from "./api";
import NavRoutes from "./common/NavRoutes";
import { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import UserContext from "./users/UserContext";
import { useLocalStorage } from "./hooks";
import Spinner from "./common/Spinner";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token");
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(() => {
    async function getCurrUser() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        let { username } = decodeToken(token);
        JoblyApi.token = token;
        let user = await JoblyApi.getCurrUser(username);
        setCurrUser(user);
        setApplicationIds(new Set(user.applications));
      } catch (err) {
        console.log(err);
        setCurrUser(null);
      }
      setLoading(false);
    }
    setLoading(true);
    getCurrUser();
  }, [token]);

  const login = async (data) => {
    try {
      let userToken = await JoblyApi.login(data);
      setToken(userToken);
      return { valid: true };
    } catch (errors) {
      return { valid: false, errors };
    }
  };

  const logout = async () => {
    setCurrUser(null);
    setToken(null);
  };

  const applyToJob = async (id) => {
    if (!currUser) return;
    try {
      await JoblyApi.applyToJob(currUser.username, id);
      setApplicationIds(new Set([...applicationIds, id]));
    } catch (e) {
      console.log(e);
    }
  };

  const unApplyToJob = async (id) => {
    if (!currUser) return;
    try {
      await JoblyApi.unApplyToJob(currUser.username, id);
      setApplicationIds((prev) => new Set([...prev].filter((i) => i !== id)));
    } catch (e) {
      console.log(e);
    }
  };

  const checkIfApplied = (id) => {
    return applicationIds.has(id);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{
            currUser,
            applicationIds,
            setCurrUser,
            applyToJob,
            checkIfApplied,
            unApplyToJob,
          }}
        >
          <Navbar logout={logout} />
          {loading ? <Spinner /> : <NavRoutes login={login} />}
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
