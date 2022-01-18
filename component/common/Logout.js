import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
const Logout = () => {
  const [loggedInState, setLoggedInState] = useState("logOut");

  const handleLogout = async () => {
    await axios({
      url: "http://localhost:3000/login/logout",
      method: "get",
      withCredentials: true
    })
      .then(res => {
        window.localStorage.setItem("loggedInState", loggedInState);
        Router.push("/common/login");
      })
      .catch(e => console.log("error occred:", e.message));
  };
  useEffect(() => {}, [loggedInState]);
  return (
    <div className="logout">
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Logout;
