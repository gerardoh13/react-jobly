import React, { useContext } from "react";
import UserContext from "../users/UserContext";

function Home() {
  let { currUser } = useContext(UserContext);
  return (
    <div className="marginT10 text-center text-light">
      <h1>Jobly</h1>
      <p>Where the best companies find the right candidates </p>
      <p>{currUser ? `Welcome Back, ${currUser.firstName}!` : null}</p>
    </div>
  );
}
export default Home;
