import axios from "axios";
import Router from "next/router";
const Logout = () => {
  const handleLogout = async () => {
    await axios({
      url: "http://localhost:3000/login/logout",
      method: "get",
      withCredentials: true
    })
      .then(res => {
        window.localStorage.removeItem("loggedInState");
        Router.push("/common/login");
      })
      .catch(e => console.log("error occred:", e.message));
  };
  return (
    <div className="logout">
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Logout;
